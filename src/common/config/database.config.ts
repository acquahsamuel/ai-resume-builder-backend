import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoUri = (): string => {
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
  uri: process.env.MONGODB_URI || getMongoUri(),
};