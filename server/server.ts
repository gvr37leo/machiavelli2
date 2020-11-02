import express from 'express'
import { Server } from './src/serverlogic'



var app = express()


app.use(express.static('../client'))

app.listen(8000, () => {
    console.log('listening on 8000')
})

var server = new Server()






