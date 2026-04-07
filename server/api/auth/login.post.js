export default defineEventHandler( async (event) => {
   const body = await readBody(event);

   const { name, email } = body

   if(!name){
    throw createError({
      statusCode: 400
    })
   }

   await setUserSession(event, {
    user:{
      name, email
    }
   })
  return { message: "Login successful" }; 
})