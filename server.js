const express =require('express')
const app = express();
require('./routes/files');



const connectDB=require('./config/db');
connectDB();


app.use('/api/files',require('./routes/files'));
app.use('/files')
app.listen(process.env.PORT,()=>{
    console.log("listening on port 3000")
})
 