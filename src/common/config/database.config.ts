import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const mongooseConfig: MongooseModuleOptions = {
  uri: process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/cleansheet_resume',
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
};

export default mongooseConfig;