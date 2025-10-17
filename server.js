import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { initializeDatabase } from './db/db.connections.js'
import jobRouter from './routes/jobRoute.js'


const app = express()
app.use(express.json())

const allowedOrigins = ['http://localhost:5173', 'https://job-postings.vercel.app']

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200
}))

await initializeDatabase()


app.get("/", (req, res) => {
    res.send("Server is running successfully!")
})

app.use("/v1/jobs", jobRouter)


const PORT = 3000
app.listen(PORT, (req, res) => {
    console.log(`Server connected on http://localhost:${PORT}`)
})