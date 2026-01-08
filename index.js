require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const axios = require("axios");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  next();
});

const PORT = 3000;

function verifyGitHubSignature(req, res, next) {
  const signature = req.headers["x-hub-signature-256"];

  if (!signature) {
    return res.status(401).send("No signature provided");
  }

  if (!process.env.GITHUB_SECRET) {
    return res.status(500).send("Server configuration error");
  }

  const hmac = crypto.createHmac("sha256", process.env.GITHUB_SECRET);
  const digest =
    "sha256=" + hmac.update(JSON.stringify(req.body)).digest("hex");

  if (signature !== digest) {
    return res.status(401).send("Invalid signature");
  }

  next();
}

async function sendTelegramMessage(text) {
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text,
      parse_mode: "Markdown",
    });
  } catch (error) {
    console.error(
      "Error sending Telegram message:",
      error.response?.data || error.message
    );
  }
}

const githubWebhookHandler = (req, res) => {
  const event = req.headers["x-github-event"];

  if (event === "ping") {
    return res.status(200).send("PONG");
  }

  if (event !== "push") {
    return res.status(200).send("Ignored event");
  }

  const payload = req.body;

  const repo = payload.repository.name;
  const branch = payload.ref.split("/").pop();
  const pusher = payload.pusher.name;
  const commits = payload.commits.map((c) => `- ${c.message}`).join("\n");  

  const message = `
🚀 *New Push Detected*
📦 Repo: ${repo}
🌿 Branch: ${branch}
👤 Pusher: ${pusher}

📝 Commits:
${commits}
  `;

  sendTelegramMessage(message);
  res.status(200).send("OK");
};

app.post("/github/webhook", verifyGitHubSignature, githubWebhookHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
