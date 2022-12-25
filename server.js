import { app } from './app.js'
import { connectDB } from './config/database.js'

const PORT = process.env.PORT || 4000


//server started
app.listen( PORT, () => console.log(`server is running on ${PORT}`))

// database connect 
connectDB();
