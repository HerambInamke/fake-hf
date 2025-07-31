# 🚀 Deployment Guide

This guide will help you deploy your PixelTruth AI Deepfake Detection app to Netlify (client) and Render (server).

## 📋 Prerequisites

- GitHub account
- Netlify account (free)
- Render account (free)
- NVIDIA API key (for the server)

## 🌐 Client Deployment (Netlify)

### Step 1: Prepare the Client
1. The client is already configured with:
   - `netlify.toml` - Netlify configuration
   - Environment variables support
   - Build optimization

### Step 2: Deploy to Netlify
1. **Connect to GitHub:**
   - Go to [Netlify](https://netlify.com)
   - Sign up/Login with GitHub
   - Click "New site from Git"

2. **Select Repository:**
   - Choose your repository: `PixelTruth--AI-deepfake-image-detector`
   - Select the branch: `master`

3. **Configure Build Settings:**
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `build`

4. **Environment Variables:**
   - Go to Site settings → Environment variables
   - Add: `REACT_APP_API_URL` = `https://your-render-app.onrender.com`

5. **Deploy:**
   - Click "Deploy site"
   - Wait for build to complete

## 🔧 Server Deployment (Render)

### Step 1: Prepare the Server
1. The server is already configured with:
   - `render.yaml` - Render configuration
   - `Procfile` - Process management
   - Environment variable support

### Step 2: Deploy to Render
1. **Connect to GitHub:**
   - Go to [Render](https://render.com)
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"

2. **Select Repository:**
   - Choose your repository: `PixelTruth--AI-deepfake-image-detector`
   - Select the branch: `master`

3. **Configure Service:**
   - **Name:** `pixeltruth-server`
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Environment Variables:**
   - Add: `API_KEY` = Your NVIDIA API key
   - Add: `NODE_ENV` = `production`

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete

## 🔗 Connect Client to Server

### After both deployments:
1. **Get your Render URL:** `https://your-app-name.onrender.com`
2. **Update Netlify environment variable:**
   - Go to Netlify dashboard
   - Site settings → Environment variables
   - Update `REACT_APP_API_URL` to your Render URL
3. **Trigger a new deployment** in Netlify

## 🔧 Environment Variables

### Client (.env):
```env
REACT_APP_API_URL=https://your-render-app.onrender.com
```

### Server (Render Dashboard):
```env
API_KEY=your_nvidia_api_key_here
NODE_ENV=production
```

## 🚨 Important Notes

1. **API Key:** You need a valid NVIDIA API key for the server to work
2. **CORS:** The server is configured to accept requests from any origin
3. **File Uploads:** Render has a 100MB limit for file uploads
4. **Cold Starts:** Render may have cold starts on the free tier

## 🔍 Troubleshooting

### Client Issues:
- Check if `REACT_APP_API_URL` is set correctly
- Verify the API endpoint is accessible
- Check browser console for errors

### Server Issues:
- Check Render logs for errors
- Verify API key is set correctly
- Check if all dependencies are installed

## 📞 Support

If you encounter issues:
1. Check the deployment logs
2. Verify environment variables
3. Test the API endpoint directly
4. Check CORS configuration

---

**Happy Deploying! 🎉** 