import {openDb} from '../configDB.js'

export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Subscription (id INTEGER PRIMARY KEY, subscription_date DATETIME ,name TEXT, email TEXT UNIQUE,last_message INTEGER, active BOOLEAN)')
    })
}

export async function insertSubscription(object){
    openDb().then(db=>{
        db.run('INSERT INTO Subscription(subscription_date, name, email, last_message, active) VALUES (?,?,?,?,?)', [object.subscriptionDate, object.name, object.email, object.lastMessage, object.active])
    })
}

export async function updateSubscription(object){
    openDb().then(db=>{
        db.run('UPDATE Subscription SET subscription_date=?, name=?, email=?, last_message=?, active=? WHERE id=?', [object.subscription_date, object.name, object.email, object.last_message, object.active, object.id])
    })
}

export async function selectAllSubscriptions(){
    return openDb().then(db=>{
        return db.all('SELECT * FROM Subscription')
        .then(res=>res)
    })
}
