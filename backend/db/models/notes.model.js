import { Schema, model } from "mongoose";




const noteSchema = new Schema({

    title: String,
    description: String
}, { timestamps: true }) 



const noteModel = model('note', noteSchema)


export default noteModel