import { Request, Response } from 'express'
import Note from '../models/Note'

export const form = (req: Request, res: Response) => {
    res.render('pages/form')
}

/* Create */

export const addNote = async (req: Request, res: Response) => {
    const { noteTitle, noteText } = req.body 

    if(!noteTitle) {
        res.status(422).json({error: "Insira um título"})
    }

    if(!noteText) {
        res.status(422).json({error: 'Insira um texto'})
        return
    }

    const newNote = {
        noteTitle,
        noteText
    }

    try {
        await Note.create(newNote)

        res.status(201).redirect('/notes')
    } catch (error) {
        res.status(500).json({error: error})
    }
}

/* Read */

export const getNotes = async (req: Request, res: Response) => {
    try {
        const allNotes = await Note.find({})

        res.status(200).render('pages/Notes', {
            allNotes
        })
    } catch (error) {
        res.status(500).json({error: error})
    }
}

export const getNote = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const note: any = await Note.findOne({_id: id})

        console.log(note)

        if(!note) {
            res.status(422).json({message: "O usuário não foi encontrado"})
            return
        }

        res.status(200).render('pages/note', {
            note
        })
    } catch (error) {
        res.status(500).json({error: error})
    }
}

/* Update */

export const editForm = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const note = await Note.findOne({_id: id})

        if(!note){
            res.status(422).json({message: 'O usuário não foi encontrado!' })
            return
        }

        res.status(200).render('pages/editForm', {
            note
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

export const updateNote = async (req: Request, res: Response) => {
    const { id, noteText, noteTitle } = req.body

    const note = {
        noteTitle,
        noteText
    }

    try {
        const updateNote = await Note.updateOne({_id: id}, note)

        /* verificação de atualização. Se 0 registros foram atualizados, então
        nenhum usuário que tentamos atualizar foi encontrado */
        if(updateNote.matchedCount === 0) {
            res.status(422).json({messsage: "O usuário não foi encontrado!"})
            return
        }

        res.status(200).redirect(`/notes`)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

/* Delete */

export const deleteNote = async (req: Request, res: Response) => {
    const { id } = req.params

    const note = await Note.findOne({_id: id})

    if(!note){
        res.status(422).json({message: "A anotação não foi encontrada!"})
        return
    }

    try {
        await Note.deleteOne({_id: id})

        res.redirect('/notes')
    } catch (error) {
        res.status(500).json({error: error})
    }
}