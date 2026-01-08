/**
 * GitHub webhook routes
 */

const express = require("express");
const router = express.Router();
const { verifyGitHubSignature } = require("../middleware/githubAuth");
const { handleGitHubWebhook } = require("../services/githubWebhookService");

/**
 * POST /github/webhook
 * Receives GitHub webhook events
 */
router.post("/github/webhook", verifyGitHubSignature, handleGitHubWebhook);

module.exports = router;
