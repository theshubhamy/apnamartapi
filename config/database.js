import mongoose from "mongoose";
mongoose.set('strictQuery', false);
const conn = mongoose.connect(
  "mongodb+srv://test:test@mojfnkf.2w1dbcy.mongodb.net/apnamartdb"
);
export default conn;
