import express from 'express'
import mongoose from 'mongoose';
import detyraRoute from './routes/detyraRoutes.js'
import userRoute from './routes/userRoutes.js'
import 'dotenv/config'

const app = express()

mongoose.connect("mongodb://localhost:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  app.use(express.json())
  app.use('/detyrat',detyraRoute)
  app.use('/userat',userRoute)

app.listen(process.env.PORTA, () => {
    console.log(`Serveri po degjon ne http://localhost:${process.env.PORTA}`)
})

app.get('/', (req, res) => {
    res.json({mesazhi:"homepage"})
});


