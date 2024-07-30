import mongoose from 'mongoose';

class MongoDBConnection {
  private static instance: MongoDBConnection;
  private uri: string;
  private options: mongoose.ConnectOptions;

  private constructor(uri: string, options: mongoose.ConnectOptions) {
    this.uri = uri;
    this.options = options;
    this.connect();
  }

  public static getInstance(uri: string, options: mongoose.ConnectOptions): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection(uri, options);
    }
    return MongoDBConnection.instance;
  }

  private async connect() {
    try {
      await mongoose.connect(this.uri, this.options);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  public async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('MongoDB disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }
}

export default MongoDBConnection;
