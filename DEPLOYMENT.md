# Deployment Guide

## Fix: Connection Refused Error

The `ECONNREFUSED 127.0.0.1:27017` error means MongoDB is trying to connect to localhost.

**Solution**: Set the `MONGODB_URI` environment variable in your deployment platform.

## Required Environment Variables

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_random_secret_string
JWT_EXPIRES_IN=7d
NODE_ENV=production
FRONTEND_URL=https://your-frontend.com
```

## Get MongoDB Atlas Connection String

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Copy connection string from "Connect" → "Connect your application"

Format: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

## Deploy on Render

**Build Command**: `npm install && npm run build`  
**Start Command**: `npm run start:prod`

Add the environment variables in Render dashboard, then redeploy.
