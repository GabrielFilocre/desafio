import {validateEmail} from '../services/business_logic.js'
import { insertSubscription } from '../models/subscription.js'
import express from 'express'

const subscriptionRouter = express.Router()

subscriptionRouter.post('/subscription', (req, res)=>{
    const subscription = req.body
    if(!validateEmail(subscription.email)){
        res.json({
            "statusCode":400,
            "message": "Invalid Email"
        })
    }else{
        subscription.subscriptionDate = new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})
        subscription.lastMessage = 0
        subscription.active = true

        insertSubscription(subscription)

        res.json({
            "statusCode":200
        })
    }
})

export {subscriptionRouter}