import { Admin } from "../../models/adminSchema"

export default defineEventHandler( async (event) => {
   const body = await readBody(event);

   const { name, email, picture } = body

   if(!name){
    throw createError({
      statusCode: 400
    })
   }

   const isAdmin = await Admin.findOne( { email });
   const role = isAdmin ? 'admin' : 'user';

   await setUserSession(event, {
    user:{
      name, email, picture, role
    }
   })
  
  return { role }; 
})