import express from 'express'
const app = express()
const port = 3000
import * as dotenv from 'dotenv';
dotenv.config();
app.use(express.json())
import { connection } from './db/connection.js';
connection()
import noteModel from './db/models/notes.model.js'

import { Server } from 'socket.io';



app.get('/', (req, res) => res.send('Hello World!'))
const server = app.listen(port, () => console.log(`app listening on port ${port}!`))

const io = new Server(server, {
    cors: "*"
})



//NOTE - when frontEnd connect to the server http://localhost:3000/
io.on('connection', (socket) => {
    console.log('welcome from sockets', socket.id);


    socket.on('addNote', async (data) => {
        await noteModel.insertMany(data)
        let allNotes = await noteModel.find()
        socket.emit('allNotes', allNotes)
    })

    socket.on('load', async () => {
        let allNotes = await noteModel.find()
        socket.emit('allNotes', allNotes)
    })

    socket.on('deleteNote', async (id) => {
        await noteModel.findByIdAndDelete(id)
        let allNotes = await noteModel.find()
        socket.emit('allNotes', allNotes)
    })


    socket.on('updateNote', async (data) => {
        const { id } = data
        await noteModel.findByIdAndUpdate(id, data.note)
        let allNotes = await noteModel.find()
        socket.emit('allNotes', allNotes)
    })
})