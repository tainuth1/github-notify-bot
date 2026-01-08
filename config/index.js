/**
 * Configuration module
 * Validates and exports environment variables
 */

require("dotenv").config();

const requiredEnvVars = [
  "BOT_TOKEN",
  "CHAT_ID",
  "GITHUB_SECRET",
];

function validateEnv() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
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
