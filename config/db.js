const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let uri = process.env.MONGODB_URI;

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = await mongoose
      .connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
const mongodb = async (req, res, next) => {
  await connect();
  next();
};
module.exports = {
  connect,
  mongodb,
};
