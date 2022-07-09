import mongoose from "mongoose";

const conn = mongoose.connect(
  "mongodb+srv://adminapnamart:pswdapnamart@ecommerceapi.2w1dbcy.mongodb.net/apnamartdb"
);
export default conn;
