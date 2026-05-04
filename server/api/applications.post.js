import { Applications } from "../models/Applications";

export default defineEventHandler(async(event)=>{
  const body = await readBody(event)

  const { name, type, description} = body;


  const exists = await Applications.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') }})
  
  if(exists){
    throw createError({
      statusCode: 400,
      statusMessage: "Repo already present"
    })
  }

  const newApplication = new Applications({
      name, type , description
  })

  await newApplication.save();
})