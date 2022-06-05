import { insertMessage } from '../models/message_flow.js'
import express from 'express'

const messageRouter = express.Router()

messageRouter.post('/message', (req, res)=>{
    const message = req.body
    insertMessage(message)

    res.json({
        "statusCode":200
    })
})

export {messageRouter}