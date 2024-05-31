
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import routes from '../routes/routes'
dotenv.config()

const app = express()
app.use(express.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}))
app.use(cors())
app.use("/api", routes)
app.use("/private", express.static("/src/private"))


const PORT = process.env.PORT || 3333


app.listen(PORT, () => {
    console.log(`Server is running - http://localhost:${PORT} - database - :${process.env.DATABASE_URL}`)
})