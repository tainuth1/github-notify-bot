/**
 * Configuration module
 * Validates and exports environment variables
 */

require("dotenv").config();

const requiredEnvVars = ["BOT_TOKEN", "CHAT_ID", "GITHUB_SECRET"];

function validateEnv() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    const isRailway = !!process.env.RAILWAY_ENVIRONMENT;
    const isProduction = process.env.NODE_ENV === "production";

    let errorMessage = `Missing required environment variables: ${missing.join(
      ", "
    )}\n\n`;

    if (isRailway || isProduction) {
      errorMessage += `⚠️  Please set these environment variables in your hosting platform:\n`;
      errorMessage += `   - Go to your Railway/Render/etc. dashboard\n`;
      errorMessage += `   - Navigate to your service → Variables\n`;
      errorMessage += `   - Add the missing variables listed above\n`;
      errorMessage += `   - Redeploy your service\n`;
    } else {
      errorMessage += `⚠️  Please create a .env file with these variables.\n`;
      errorMessage += `   See .env.example for reference.\n`;
    }

    throw new Error(errorMessage);
  }
}

// Validate environment variables on module load
validateEnv();

module.exports = {
  port: process.env.PORT || 3000,
  botToken: process.env.BOT_TOKEN,
  chatId: process.env.CHAT_ID,
  githubSecret: process.env.GITHUB_SECRET,
  nodeEnv: process.env.NODE_ENV || "development",
};
