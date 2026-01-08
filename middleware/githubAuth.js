/**
 * GitHub webhook signature verification middleware
 */

const crypto = require("crypto");
const config = require("../config");

/**
 * Verifies GitHub webhook signature using HMAC SHA-256
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function verifyGitHubSignature(req, res, next) {
  const signature = req.headers["x-hub-signature-256"];

  if (!signature) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Missing signature header",
    });
  }

  if (!config.githubSecret) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Server configuration error",
    });
  }

  try {
    const hmac = crypto.createHmac("sha256", config.githubSecret);
    const payload = JSON.stringify(req.body);
    const digest = `sha256=${hmac.update(payload).digest("hex")}`;

    // Use crypto.timingSafeEqual to prevent timing attacks
    const signatureBuffer = Buffer.from(signature);
    const digestBuffer = Buffer.from(digest);

    if (
      signatureBuffer.length !== digestBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, digestBuffer)
    ) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid signature",
      });
    }

    next();
  } catch (error) {
    console.error("Signature verification error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Signature verification failed",
    });
  }
}

module.exports = {
  verifyGitHubSignature,
};
