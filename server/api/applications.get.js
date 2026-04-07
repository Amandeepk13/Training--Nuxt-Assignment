import { Applications } from "../models/Applications";

export default defineEventHandler(async() => {
  
  try{
    const apps = await Applications.find()
    return apps;
    }
     catch(err){
      throw createError({
        statusCode: 500,
        statusMessage: "can't fetch"
      })
      }  
})