import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoUri = (): string => {
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

// Connection options for production
export const mongooseConfig: MongooseModuleOptions = {
  uri: getMongoUri(),
};