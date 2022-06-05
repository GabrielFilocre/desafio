import { messageRouter } from './API/message_flow.js'
import { subscriptionRouter } from './API/subscription.js'
import { createTable } from './models/subscription.js'
import { createTableMessage } from './models/message_flow.js'
import { verifyHour } from './services/business_logic.js'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const timeVariation = 60000

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use('/', messageRouter)
app.use('/', subscriptionRouter)

createTable()
createTableMessage()

setInterval(verifyHour, timeVariation)
app.listen(3000, ()=>console.log("Api rodando"))
