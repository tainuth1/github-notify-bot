# Free Hosting Options for Your Webhook Service

Here are the best **free hosting platforms** for your Node.js webhook service:

## 🏆 Top Recommendations

### 1. **Railway** (Best Overall) ⭐ RECOMMENDED

- ✅ **Free Tier**: $5/month credit (usually enough for small projects)
- ✅ Always-on service (no sleep)
- ✅ Easy deployment from GitHub
- ✅ **Automatic redeployments** - Deploys automatically on every GitHub push
- ✅ Automatic HTTPS
- ✅ Environment variables support
- 🔗 [railway.app](https://railway.app)

**Setup**: Connect GitHub repo → Deploy → Add environment variables

---

### 2. **Render** (Good Alternative)

- ✅ **Free Tier**: 750 hours/month
- ⚠️ **Sleeps after 15 min inactivity** (wakes on request)
- ✅ Automatic HTTPS
- ✅ Easy GitHub integration
- 🔗 [render.com](https://render.com)

**Note**: First request after sleep may be slow (~30 seconds)

---

### 3. **Fly.io** (Great Performance)

- ✅ **Free Tier**: 3 shared VMs
- ✅ Always-on (no sleep)
- ✅ Global edge deployment
- ✅ Fast cold starts
- 🔗 [fly.io](https://fly.io)

---

### 4. **Cyclic** (Simple & Fast)

- ✅ **Free Tier**: Unlimited
- ✅ Always-on
- ✅ Automatic HTTPS
- ✅ GitHub integration
- 🔗 [cyclic.sh](https://cyclic.sh)

---

### 5. **Koyeb** (Serverless)

- ✅ **Free Tier**: 2 services
- ✅ Always-on
- ✅ Global edge network
- 🔗 [koyeb.com](https://www.koyeb.com)

---

## 📋 Quick Comparison

| Platform    | Free Tier  | Sleep? | Setup Difficulty | Best For    |
| ----------- | ---------- | ------ | ---------------- | ----------- |
| **Railway** | $5 credit  | ❌ No  | ⭐ Easy          | Production  |
| **Render**  | 750 hrs    | ⚠️ Yes | ⭐ Easy          | Development |
| **Fly.io**  | 3 VMs      | ❌ No  | ⭐⭐ Medium      | Performance |
| **Cyclic**  | Unlimited  | ❌ No  | ⭐ Easy          | Simplicity  |
| **Koyeb**   | 2 services | ❌ No  | ⭐ Easy          | Global      |

---

## 🚀 Recommended: Railway Setup

1. **Sign up** at [railway.app](https://railway.app) (use GitHub login)
2. **New Project** → Deploy from GitHub
3. **Select your repository**
4. **Add Environment Variables** (⚠️ **CRITICAL STEP**):
   - Click on your service in Railway dashboard
   - Go to **Variables** tab
   - Click **+ New Variable** and add each of these:
     - `BOT_TOKEN` = your Telegram bot token
     - `CHAT_ID` = your Telegram chat ID
     - `GITHUB_SECRET` = your GitHub webhook secret
   - **Note:** `PORT` is set automatically by Railway (don't add it)
5. **Redeploy** - Railway will automatically redeploy after adding variables, or click **Redeploy** manually

### 🔗 How to Get Your Railway URL Endpoint

1. **In Railway Dashboard:**

   - Click on your service
   - Go to the **Settings** tab
   - Scroll down to **Networking** section
   - You'll see **Public Domain** - this is your Railway URL
   - It looks like: `https://your-app-name.up.railway.app`

2. **Alternative Method:**

   - Click on your service
   - Look at the top of the page - Railway shows your domain there
   - Or check the **Deployments** tab - the URL is shown in deployment logs

3. **Your Webhook Endpoint:**
   - Full webhook URL: `https://your-app-name.up.railway.app/github/webhook`
   - Health check URL: `https://your-app-name.up.railway.app/health`

**Update GitHub Webhook URL** to: `https://your-app-name.up.railway.app/github/webhook`

### ⚠️ Important: Environment Variables

**Railway does NOT use `.env` files!** You must set environment variables in the Railway dashboard:

- Go to your service → **Variables** tab
- Add each variable manually
- Values are encrypted and secure
- Changes trigger automatic redeployment

### 🔄 Automatic Redeployments

**Yes! Railway automatically redeploys when you push code to GitHub.**

- ✅ **Enabled by default** - No configuration needed
- ✅ **Deploys on every push** to your connected branch (usually `main` or `master`)
- ✅ **Zero downtime** - Railway uses rolling deployments
- ✅ **Deployment logs** - View build and deployment status in Railway dashboard

**How it works:**

1. Push code to GitHub → Railway detects the change
2. Railway automatically starts a new build
3. New deployment replaces the old one seamlessly
4. Your webhook service is updated without interruption

**Note:** You can disable auto-deploy in Railway settings if needed, or configure it to deploy only from specific branches.

---

## ⚙️ Platform-Specific Notes

### For Render:

- Set **Start Command**: `npm start`
- Set **Environment**: `Node`
- Set **Health Check Path**: `/health`

### For Fly.io:

- Use the provided `fly.toml` (if created)
- Run: `flyctl launch`

### For Railway:

- Auto-detects `package.json`
- Sets `PORT` automatically
- **Auto-redeploys on every GitHub push** ✅
- No configuration needed!

---

## 🔧 Pre-Deployment Checklist

- [ ] All environment variables are set in hosting platform
- [ ] `package.json` has `"start": "node index.js"` script ✅
- [ ] `.env` file is in `.gitignore` ✅
- [ ] GitHub webhook URL updated to new hosting URL
- [ ] Test webhook after deployment

---

## 💡 Pro Tips

1. **Always use HTTPS** - All platforms provide this automatically
2. **Monitor usage** - Check your free tier limits
3. **Set up alerts** - Some platforms notify you when approaching limits
4. **Backup your `.env`** - Keep a secure copy of your environment variables

---

## 🆘 Need Help?

- Railway: [docs.railway.app](https://docs.railway.app)
- Render: [render.com/docs](https://render.com/docs)
- Fly.io: [fly.io/docs](https://fly.io/docs)
