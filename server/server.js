require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/auth-router.js');
const contactRouter = require('./routes/contact-router.js');
const serviceRouter = require('./routes/service-router.js');
const adminRouter = require('./routes/admin-router.js');

const connectDb = require('./utils/db.js');
const errorMiddleware = require("./middleware/error-middleware.js");

var corsOptions = {
    origin: 'http://localhost:5173',
    method:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}
app.use(cors(corsOptions));
   
//This is a middleware is important to exchange data in json and also should be return before routes

app.use(express.json());

// uri='mongodb+srv://saishrane11:saishrane11@cluster0.ao29kvh.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=Cluster0'
app.use('/api/auth',authRouter);
app.use('/api/form',contactRouter);
app.use('/api/data',serviceRouter);
app.use('/api/admin',adminRouter);


const PORT=5001 || 3000;

app.use(errorMiddleware);
connectDb().then(
    app.listen(PORT,()=>{
        console.log(`server is listening on port ${PORT}`)
    })
)






