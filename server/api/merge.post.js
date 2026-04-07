import { Applications } from "../models/Applications";

export default  defineEventHandler( async(event) => {

   const session = await getUserSession(event)
   const user = session.user.name

   if(!user){
     throw createError({
      statusCode: 401
     })
   }
    const body = await readBody(event);

    const { applicationName} = body;

    const app = await Applications.findOne({name: applicationName});

  
    if(app.merged){

      if(app.mergedBy === user){
        app.merged = false;
        app.mergedBy = null;
        app.mergedAt = null;
        app.status = 'Available';
        await app.save();

        return { message : "Done merging"}
      }

      throw createError({
        statusCode: 400,
        data: {
          mergedBy : app.mergedBy
        }
      })
    }

    app.merged = true;
    app.mergedBy = user;
    app.status = `Merging in process by ${user}`;
    app.mergedAt = new Date();

    await app.save();

})