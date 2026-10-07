import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function cleanTestData() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('MONGODB_URI not found in environment.');
      process.exit(1);
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('Connected to:', mongoose.connection.name);

    const usersCol = mongoose.connection.db.collection('users');

    const beforeUsers = await usersCol.find({}).toArray();
    console.log(`Current total users before cleanup: ${beforeUsers.length}`);

    // Query for automated test accounts
    const testQuery = {
      $or: [
        { email: { $regex: /test\.creator/i } },
        { email: { $regex: /example\.com/i } },
        { name: 'Jordan Lee' }
      ]
    };

    const testUsers = await usersCol.find(testQuery).toArray();
    console.log(`Found ${testUsers.length} test accounts to remove:`);
    testUsers.forEach(u => console.log(` - ${u.name} (${u.email})`));

    const deleteResult = await usersCol.deleteMany(testQuery);
    console.log(`Successfully deleted ${deleteResult.deletedCount} test accounts from MongoDB Atlas.`);

    const afterUsers = await usersCol.find({}).toArray();
    console.log(`\nRemaining real accounts (${afterUsers.length}):`);
    afterUsers.forEach(u => console.log(` - ${u.name} <${u.email}> [${u.role}]`));

    console.log('\nAtlas database cleanup completed successfully.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error cleaning test data:', err);
    process.exit(1);
  }
}

cleanTestData();
