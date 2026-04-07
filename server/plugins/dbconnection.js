import mongoose from "mongoose";

export default defineNitroPlugin(async() => {
  const config = useRuntimeConfig()
  try{
    await mongoose.connect(`${config.dburl}/${config.dbname}`)
    console.log("MongoDB connected")
  } catch(err) {
    console.log(err);
  }
});