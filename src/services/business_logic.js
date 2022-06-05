import { updateSubscription, selectAllSubscriptions } from '../models/subscription.js'
import { selectMessageByPosition } from '../models/message_flow.js'

export const validateEmail = (email)=>{
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(email.match(regexEmail)) 
        return true
    else 
        return false
}
export const updateLastMessage = async () =>{
    const subscriptions = await selectAllSubscriptions()
    for(const subscription of subscriptions){
        if(subscription.active){
            const lastMessage = subscription.last_message
            const nextMessage = lastMessage + 1
            const message = await selectMessageByPosition(nextMessage)
            if(message.length){
                subscription.last_message = nextMessage
                updateSubscription(subscription)
            }else{
                subscription.active = false
                updateSubscription(subscription)
            }
        }
    }
}
export const verifyHour = ()=>{
    const now = new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})
    const nowSplitted = now.split(":")
    const nowFormatted = nowSplitted[0].split(" ")[1] + ":" + nowSplitted[1] + " " + nowSplitted[2].split(" ")[1]
    const checkTime = "10:50 PM"
    if(checkTime == nowFormatted){
        updateLastMessage()
    }
}