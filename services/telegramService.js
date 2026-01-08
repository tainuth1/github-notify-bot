/**
 * Telegram service
 * Handles sending messages to Telegram
 */

const axios = require("axios");
const config = require("../config");

const TELEGRAM_API_BASE_URL = "https://api.telegram.org";

/**
 * Sends a message to Telegram
 * @param {string} text - Message text to send
 * @throws {Error} If message sending fails
 */
async function sendTelegramMessage(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid message text");
  }

  const url = `${TELEGRAM_API_BASE_URL}/bot${config.botToken}/sendMessage`;

  try {
    const response = await axios.post(
      url,
      {
        chat_id: config.chatId,
        text,
        parse_mode: "Markdown",
      },
      {
        timeout: 10000, // 10 second timeout
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.description || error.message || "Unknown error";

    console.error("Telegram API Error:", {
      status: error.response?.status,
      message: errorMessage,
      data: error.response?.data,
    });

    throw new Error(`Failed to send Telegram message: ${errorMessage}`);
  }
}

module.exports = {
  sendTelegramMessage,
};
