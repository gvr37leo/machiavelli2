import express from 'express'
import { Server } from './src/serverlogic'



var app = express()


app.use(express.static('./'))

app.listen(8000, () => {
    console.log('listening')
})

var server = new Server()






