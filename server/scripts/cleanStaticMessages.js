import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function cleanStaticMessages() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('MONGODB_URI not found in environment.');
      process.exit(1);
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('Connected to database:', mongoose.connection.name);

    const convCol = mongoose.connection.db.collection('conversations');

    const beforeConvs = await convCol.find({}).toArray();
    console.log(`Found ${beforeConvs.length} conversations in MongoDB Atlas.`);

    for (const c of beforeConvs) {
      console.log(` - Conv ${c.id}: had ${c.messages?.length || 0} messages. Clearing static messages.`);
    }

    const updateResult = await convCol.updateMany(
      {},
      {
        $set: {
          messages: [],
          last_message: '',
          last_message_time: '',
          unread_count_brand: 0,
          unread_count_creator: 0
        }
      }
    );

    console.log(`Successfully updated ${updateResult.modifiedCount} conversations. All static dummy messages cleared.`);

    await mongoose.disconnect();
    console.log('MongoDB Atlas update complete.');
    process.exit(0);
  } catch (err) {
    console.error('Error cleaning static messages:', err);
    process.exit(1);
  }
}

cleanStaticMessages();
