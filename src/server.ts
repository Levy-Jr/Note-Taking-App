import express, {Request, Response} from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { mongoConnect } from './instances/mongo' 
import mustache from 'mustache-express'
import apiRoutes from './routes/apiRoutes'
import homeRoutes from './routes/index'

dotenv.config()

mongoConnect()

const server = express()

server.set('view engine', 'mustache')
server.set('views', path.join(__dirname, 'views'))
server.engine('mustache', mustache())

server.use(express.static(path.join(__dirname, '../public')))

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.use(homeRoutes)
server.use('/notes', apiRoutes)

server.use((req: Request, res: Response)=>{
    res.status(404).json({err: "Página não encontrada!"})
})

server.listen(process.env.PORT)