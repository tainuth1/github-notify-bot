/**
 * GitHub webhook handler service
 * Processes GitHub webhook events
 */

const telegramService = require("../services/telegramService");

/**
 * Formats a push event into a Telegram message
 * @param {Object} payload - GitHub webhook payload
 * @returns {string} Formatted message
 */
function formatPushMessage(payload) {
  const { repository, ref, pusher, commits, compare, head_commit, sender } =
    payload;

  if (!repository || !ref || !pusher || !commits) {
    throw new Error("Invalid payload structure");
  }

  const repo = repository.name || "Unknown";
  const repoFullName = repository.full_name || repo;
  const repoUrl = repository.html_url || "";
  const branch = ref.split("/").pop() || "Unknown";
  const pusherName = pusher.name || sender?.login || "Unknown";
  const commitCount = commits.length;

  // Collect all changed files
  const addedFiles = [];
  const removedFiles = [];
  const modifiedFiles = [];

  commits.forEach((commit) => {
    if (commit.added) addedFiles.push(...commit.added);
    if (commit.removed) removedFiles.push(...commit.removed);
    if (commit.modified) modifiedFiles.push(...commit.modified);
  });

  // Remove duplicates
  const uniqueAdded = [...new Set(addedFiles)];
  const uniqueRemoved = [...new Set(removedFiles)];
  const uniqueModified = [...new Set(modifiedFiles)];

  // Format commits with links
  const commitMessages = commits
    .map((commit, index) => {
      const message = commit.message || "No message";
      const shortMessage = message.split("\n")[0];
      const shortSha = commit.id?.substring(0, 7) || "";
      const commitUrl = commit.url || "";

      if (commitUrl) {
        return `${index + 1}. [${shortSha}](${commitUrl}) ${shortMessage}`;
      }
      return `${index + 1}. ${shortSha} ${shortMessage}`;
    })
    .join("\n");

  // Build files changed section
  let filesChanged = "";
  if (uniqueAdded.length > 0) {
    filesChanged += `\n➕ *Added:* ${uniqueAdded.length} file(s)`;
    if (uniqueAdded.length <= 5) {
      filesChanged += `\n\`${uniqueAdded.join("`, `")}\``;
    }
  }
  if (uniqueModified.length > 0) {
    filesChanged += `\n📝 *Modified:* ${uniqueModified.length} file(s)`;
    if (uniqueModified.length <= 5) {
      filesChanged += `\n\`${uniqueModified.join("`, `")}\``;
    }
  }
  if (uniqueRemoved.length > 0) {
    filesChanged += `\n❌ *Removed:* ${uniqueRemoved.length} file(s)`;
    if (uniqueRemoved.length <= 5) {
      filesChanged += `\n\`${uniqueRemoved.join("`, `")}\``;
    }
  }

  // Build message
  let message = `🚀 *New Push Detected*\n\n`;
  message += `📦 *Repository:* [${repoFullName}](${repoUrl})\n`;
  message += `🌿 *Branch:* \`${branch}\`\n`;
  message += `👤 *Pusher:* ${pusherName}\n`;
  message += `📊 *Commits:* ${commitCount}\n`;

  if (compare) {
    message += `🔗 [View Changes](${compare})\n`;
  }

  message += `\n📝 *Commits:*\n${commitMessages}`;

  if (filesChanged) {
    message += `\n\n📁 *Files Changed:*${filesChanged}`;
  }

  if (head_commit?.url) {
    message += `\n\n🔍 [View Latest Commit](${head_commit.url})`;
  }

  return message;
}

/**
 * Handles GitHub webhook events
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function handleGitHubWebhook(req, res) {
  try {
    const event = req.headers["x-github-event"];

    // Handle ping event (webhook setup/test)
    if (event === "ping") {
      return res.status(200).json({
        status: "success",
        message: "Webhook is active",
      });
    }

    // Only process push events
    if (event !== "push") {
      return res.status(200).json({
        status: "ignored",
        message: `Event type '${event}' is not handled`,
      });
    }

    const payload = req.body;

    // Validate payload structure
    if (!payload.repository || !payload.ref || !payload.commits) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid payload structure",
      });
    }

    // Format and send message
    const message = formatPushMessage(payload);
    await telegramService.sendTelegramMessage(message);

    res.status(200).json({
      status: "success",
      message: "Notification sent",
    });
  } catch (error) {
    console.error("Webhook handler error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Failed to process webhook",
    });
  }
}

module.exports = {
  handleGitHubWebhook,
};
