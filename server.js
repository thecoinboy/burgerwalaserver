import { app } from './app.js'
import { connectDB } from './config/database.js'
import Razorpay from 'razorpay'

const PORT = process.env.PORT || ""


//server started
app.listen( PORT, () => console.log(`server is running on ${PORT}`))

// database connect 
connectDB();
