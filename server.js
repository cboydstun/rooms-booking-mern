//import dependencies
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'

//initalize express app
const app = express()

//initalize middleware
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :response-time'))
dotenv.config()

//initalize a port
const SERVER_PORT = process.env.PORT || 5002;

//connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(console.log("Connected to MongoDB")).catch((err)=>{console.log(err)})

//import routes
import roomsRoutes from './routes/roomsRoute.js'
import userRoute from './routes/userRoute.js'
import bookingsRoute from './routes/bookingsRoute.js'

//initalize routes
app.use('/api/rooms',roomsRoutes)
app.use('/api/users' , userRoute)
app.use('/api/bookings' , bookingsRoute)

//Heroku Deployment
if(process.env.NODE_ENV === "production"){ 
    app.use('/' , express.static('client/build')) 
    app.get('*' , (req , res)=>{ res.sendFile(path.resolve(__dirname, 'client/build/index.html'))})
}else{
    app.get('/', (req, res)=>{
        //basic greeting from operational API
        res.send("The API is running...")
    })
}
    
//app listening
app.listen(SERVER_PORT, ()=>{console.log(`Server running at ${SERVER_PORT}`)})