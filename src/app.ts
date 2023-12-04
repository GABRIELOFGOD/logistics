import express from 'express'
import dotenv from 'dotenv'
import { driverRouter, goodsRouter, userRouter, vehicleRouter } from './routes'
import { userDB } from './config'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3300

userDB(process.env.MONGODB_URI)

app.use(express.json())

// =============== USING ROUTER PATHS ================= //
app.use('/user', userRouter)
app.use('/driver', driverRouter)
app.use('/goods', goodsRouter)
app.use('/vehicle', vehicleRouter)

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})