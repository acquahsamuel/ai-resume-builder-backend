# Deployment Guide

## Environment Variables

This application requires the following environment variables to be set for production deployment.

### Required Environment Variables

#### Database Configuration
- **MONGODB_URI** (Required for production): Full MongoDB connection string
  - Example for MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
  - Example for local: `mongodb://username:password@host:port/database`

Or use individual database connection variables:
- **DB_HOST**: MongoDB host (default: localhost)
- **DB_PORT**: MongoDB port (default: 27017)
- **DB_DATABASE**: Database name (default: cleansheet_resume)
- **DB_USERNAME**: MongoDB username (optional)
- **DB_PASSWORD**: MongoDB password (optional)

#### Server Configuration
- **PORT**: Server port (default: 3000)
- **NODE_ENV**: Environment (development, production, test)

#### JWT Configuration
- **JWT_SECRET**: Secret key for JWT token signing
- **JWT_EXPIRES_IN**: JWT expiration time (e.g., "1d", "7d")

#### Frontend Configuration
- **FRONTEND_URL**: Allowed frontend URL for CORS

### Recommended: MongoDB Atlas Setup

For production deployments, we recommend using MongoDB Atlas:

1. **Create a MongoDB Atlas account** at https://www.mongodb.com/cloud/atlas
2. **Create a new cluster** (free tier is available)
3. **Create a database user** with read/write permissions
4. **Whitelist your deployment IP** (use 0.0.0.0/0 for Render.com)
5. **Get the connection string** from "Connect" → "Connect your application"
6. **Format**: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`

## Deployment Platforms

### Render.com

1. **Set Environment Variables**:
   - Go to your Render service → Environment
   - Add the following variables:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_secure_random_string
     JWT_EXPIRES_IN=7d
     NODE_ENV=production
     PORT=10000
     FRONTEND_URL=https://your-frontend-domain.com
     ```

2. **Build Command**: `npm install && npm run build`
3. **Start Command**: `npm run start:prod`

### Heroku

1. **Set Environment Variables**:
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_atlas_connection_string"
   heroku config:set JWT_SECRET="your_secure_random_string"
   heroku config:set NODE_ENV="production"
   ```

2. **Deploy**: The app will auto-deploy on push to main branch

### Railway

1. **Connect GitHub repository**
2. **Set Environment Variables** in the Railway dashboard
3. **Deploy**: Railway auto-detects NestJS and deploys

### AWS/DigitalOcean/etc.

Set the environment variables in your deployment platform's configuration and ensure MongoDB is accessible.

## Troubleshooting

### Connection Refused Error
If you see `ECONNREFUSED 127.0.0.1:27017`:
- This means MongoDB is trying to connect to localhost
- **Solution**: Set the `MONGODB_URI` environment variable to your remote MongoDB instance (e.g., MongoDB Atlas)

### Connection Timeout
- Verify your MongoDB cluster is running
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0 if using Render/Heroku)
- Verify username and password are correct

### Authentication Failed
- Double-check your MongoDB credentials
- Ensure the database user has read/write permissions
- Verify the connection string format is correct

## Health Check

After deployment, verify the API is running:
```bash
curl https://your-api-url.com
```

Expected response: "Hello World!" or your root endpoint response.
