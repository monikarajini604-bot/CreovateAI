import mongoose from 'mongoose';

mongoose.set('bufferCommands', false);

export let isConnected = false;

// Real-time connection lifecycle listeners to avoid stale connected state
mongoose.connection.on('connected', () => {
  isConnected = true;
});

mongoose.connection.on('error', (err) => {
  isConnected = false;
  console.warn(`[MongoDB Connection Warning] ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
});

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/creovate_ai';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    isConnected = true;
    return true;
  } catch (err) {
    console.warn(`[MongoDB Notice] MongoDB connection warning (${err.message}). Using in-memory persistence layer.`);
    isConnected = false;
    return false;
  }
}
