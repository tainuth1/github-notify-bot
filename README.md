# GitHub Webhook to Telegram Bot

A professional Node.js service that receives GitHub webhook events and sends push notifications to Telegram.

## Features

- ✅ Secure webhook signature verification using HMAC SHA-256
- ✅ Handles GitHub push events
- ✅ Sends formatted notifications to Telegram
- ✅ Comprehensive error handling
- ✅ Environment variable validation
- ✅ Graceful shutdown handling
- ✅ Health check endpoint
- ✅ Professional code structure

## Prerequisites

- Node.js >= 14.0.0
- npm or yarn
- A Telegram Bot Token (get one from [@BotFather](https://t.me/botfather))
- A Telegram Chat ID (get one from [@userinfobot](https://t.me/userinfobot))
- A GitHub repository with webhook access

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd github-bot-notify
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

4. Configure your `.env` file:

```env
BOT_TOKEN=your_telegram_bot_token_here
CHAT_ID=your_telegram_chat_id_here
GITHUB_SECRET=your_github_webhook_secret_here
PORT=3000
NODE_ENV=development
```

## Configuration

### Getting Telegram Bot Token

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` and follow the instructions
3. Copy the bot token you receive

### Getting Telegram Chat ID

1. Open Telegram and search for [@userinfobot](https://t.me/userinfobot)
2. Start a conversation and it will send you your chat ID
3. Copy the chat ID number

### Setting up GitHub Webhook

1. Go to your GitHub repository
2. Navigate to **Settings** → **Webhooks** → **Add webhook**
3. Configure the webhook:
   - **Payload URL**: `https://your-domain.com/github/webhook` (or use ngrok for local testing)
   - **Content type**: `application/json`
   - **Secret**: Use the same value as `GITHUB_SECRET` in your `.env` file
   - **SSL verification**: Enable (recommended)
   - **Events**: Select "Just the push event"
4. Click **Add webhook**

### Local Development with ngrok

For local development, use [ngrok](https://ngrok.com/) to expose your local server:

```bash
# Install ngrok (if not already installed)
# Then run:
ngrok http 3000

# Use the HTTPS URL provided by ngrok as your GitHub webhook URL
```

## Usage

### Start the server:

```bash
npm start
```

Or for development mode:

```bash
npm run dev
```

The server will start on port 3000 (or the port specified in your `.env` file).

### Health Check

Check if the server is running:

```bash
curl http://localhost:3000/health
```

## Project Structure

```
github-bot-notify/
├── config/
│   └── index.js          # Configuration and environment validation
├── middleware/
│   ├── githubAuth.js     # GitHub webhook signature verification
│   └── errorHandler.js   # Error handling middleware
├── services/
│   ├── githubWebhookService.js  # GitHub webhook processing logic
│   └── telegramService.js       # Telegram API integration
├── routes/
│   └── webhook.js        # Webhook routes
├── index.js              # Application entry point
├── package.json          # Dependencies and scripts
├── .env.example          # Environment variables template
└── README.md             # This file
```

## API Endpoints

### POST /github/webhook

Receives GitHub webhook events. Requires valid GitHub signature.

**Headers:**

- `X-GitHub-Event`: Event type (e.g., "push", "ping")
- `X-Hub-Signature-256`: HMAC SHA-256 signature

**Response:**

- `200 OK`: Webhook processed successfully
- `401 Unauthorized`: Invalid or missing signature
- `400 Bad Request`: Invalid payload structure
- `500 Internal Server Error`: Server error

### GET /health

Health check endpoint.

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2026-01-08T12:00:00.000Z",
  "uptime": 123.456
}
```

## Security

- Webhook signatures are verified using `crypto.timingSafeEqual` to prevent timing attacks
- Environment variables are validated on startup
- Request payload size is limited to 10MB
- Error messages are sanitized in production mode

## Error Handling

The application includes comprehensive error handling:

- Invalid webhook signatures return 401 Unauthorized
- Missing environment variables cause startup failure
- Telegram API errors are logged and handled gracefully
- All errors are logged with appropriate detail levels

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC

## Deployment

### Free Hosting Options

This project can be deployed to various free hosting platforms. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick Recommendations:**

- 🏆 **Railway** - Best overall, always-on, $5/month free credit
- **Render** - Easy setup, sleeps after inactivity
- **Fly.io** - Great performance, always-on
- **Cyclic** - Simple, unlimited free tier

### Quick Deploy to Railway

1. Sign up at [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repository
4. Add environment variables (`BOT_TOKEN`, `CHAT_ID`, `GITHUB_SECRET`)
5. **Get your Railway URL:**
   - In Railway dashboard → Your Service → **Settings** → **Networking**
   - Copy the **Public Domain** (e.g., `https://your-app.up.railway.app`)
6. Update GitHub webhook URL to: `https://your-app.up.railway.app/github/webhook`

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Support

For issues and questions, please open an issue on the GitHub repository.
