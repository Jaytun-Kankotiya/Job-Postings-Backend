import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { initializeDatabase } from './db/db.connections.js'
import jobRouter from './routes/jobRoute.js'


const app = express()
app.use(express.json())

const allowedOrigins = ['http://localhost:5173', 'https://job-postings.vercel.app/']

app.use(cors({
    origin: function(origin, callback) {
        if(!origin) return callback(null, true)
        if(allowedOrigins.includes(origin)) return callback(null, true)
        callback(new Error("Not allowed by CORs"))
    },
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