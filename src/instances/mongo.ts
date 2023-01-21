const mongoose = require('mongoose')
import dotenv from 'dotenv'
dotenv.config()

mongoose.set('strictQuery', true)

export const mongoConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("CONECTADO")
    } catch(err){
        console.log("Erro: ", err)
    }
}