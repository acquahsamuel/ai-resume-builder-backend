import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoUri = (): string => {
  // Prioritize MONGODB_URI for production (e.g., MongoDB Atlas connection string)
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || '27017';
  const database = process.env.DB_DATABASE || 'cleansheet_resume';
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;

  if (username && password) {
    return `mongodb://${username}:${password}@${host}:${port}/${database}`;
  }
  return `mongodb://${host}:${port}/${database}`;
};

export const mongooseConfig: MongooseModuleOptions = {
  uri: getMongoUri(),
  retryWrites: true,
  w: 'majority',
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  maxPoolSize: 10,
  minPoolSize: 5,
  retryAttempts: 10,
  retryDelay: 3000,
};