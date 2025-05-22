import express from 'express'
import mongoose from 'mongoose';
import detyraRoute from './routes/detyraRoutes.js'
import userRoute from './routes/userRoutes.js'
import 'dotenv/config'

const app = express()

mongoose.connect(process.env.DATABAZA)

  app.use(express.json())
  app.use('/api/v1.1/detyrat',detyraRoute)
  app.use('/api/v1.1/userat',userRoute)

app.listen(process.env.PORTA, () => {
    console.log(`Serveri po degjon ne http://localhost:${process.env.PORTA}`)
})

app.get('/', (req, res) => {
    res.json({mesazhi:"homepage"})
});


