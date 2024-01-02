import colors from "colors";
import mongoose from "mongoose";

//create a mongodb connection

const mongoDBConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);

    console.log(`mongoDB Connection Done !`.bgBlue.black);
  } catch (error) {
    console.log(`${error.message}`.bgRed.white);
  }
};

//export
export default mongoDBConnect;
