import mongoose, { Connection } from 'mongoose';

type GlobalMongoose = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

declare global {
  var mongooseClient: GlobalMongoose | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'MongoDB URI is not defined - please set MONGODB_URI environment variable'
  );
}

const options: mongoose.ConnectOptions = {
  bufferCommands: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

async function connectDB(): Promise<Connection> {
  try {
    // Check if we have a connection to the database or if it's currently connecting
    if (global.mongooseClient?.conn) {
      console.log('Using existing MongoDB connection');
      return global.mongooseClient.conn;
    }

    // If no connection exists, create a new one
    if (!global.mongooseClient) {
      global.mongooseClient = {
        conn: null,
        promise: null,
      };
    }

    // If there's no existing promise to connect, create a new one
    if (!global.mongooseClient.promise) {
      global.mongooseClient.promise = mongoose.connect(MONGODB_URI, options)
        .then((mongoose) => {
          console.log('New MongoDB connection established');
          return mongoose.connection;
        });
    }

    // Wait for the connection to be established
    const conn = await global.mongooseClient.promise;
    global.mongooseClient.conn = conn;

    // Handle connection errors
    conn.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      global.mongooseClient = undefined; // Reset the connection on error
    });

    // Handle when the connection is disconnected
    conn.on('disconnected', () => {
      console.warn('MongoDB disconnected');
      global.mongooseClient = undefined; // Reset the connection
    });

    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Reset the connection state
    global.mongooseClient = undefined;
    throw error;
  }
}

export default connectDB;