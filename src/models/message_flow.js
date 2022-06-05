import {openDb} from '../configDB.js'

export async function createTableMessage(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS message_flow (id INTEGER PRIMARY KEY, template_name TEXT, position INTEGER UNIQUE)')
    })
}

export async function insertMessage(object){
    openDb().then(db=>{
        db.run('INSERT INTO message_flow(template_name, position) VALUES (?,?)', [object.templateName, object.position])
    })
}

export async function selectMessageByPosition(id){
    return openDb().then(db=>{
        return db.all('SELECT * FROM message_flow WHERE position=?', [id])
        .then(res=>res)
    })
}