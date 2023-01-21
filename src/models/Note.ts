import { Schema, model, Model, connection } from 'mongoose'

type NoteType = {
    noteTitle: string
    noteText: string
}

const schema = new Schema<NoteType>({
    noteTitle: {
        type: String,
        required: true
    },
    noteText: {
        type: String,
        required: true
    }
})

const modelName = 'Note'

export default (connection && connection.models[modelName]) ? 
connection.models[modelName] as Model<NoteType> : 
model<NoteType>(modelName, schema)