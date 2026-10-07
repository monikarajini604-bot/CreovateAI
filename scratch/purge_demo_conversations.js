import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

async function purge() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  console.log('Connected! Checking conversations collection...');

  const db = mongoose.connection.db;
  const convCol = db.collection('conversations');
  const existing = await convCol.find({}).toArray();
  console.log(`Found ${existing.length} existing conversation(s):`, existing.map(c => ({ id: c.id, brand: c.brand_name, creator: c.creator_name, msgCount: (c.messages || []).length })));

  const result = await convCol.deleteMany({});
  console.log(`Deleted ${result.deletedCount} demo conversation(s) from MongoDB Atlas.`);

  await mongoose.disconnect();
  console.log('Done!');
}

purge().catch(err => {
  console.error('Error purging conversations:', err);
  process.exit(1);
});
