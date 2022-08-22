const sortJsonArray = require('sort-json-array');
const fs = require('fs');
const buffer = fs.readFileSync('fakedatabase.json')
const contacts = JSON.parse(buffer);

function contactos(req, res)  {
    if (req.query.phrase!=undefined){
        if (req.query.phrase!=''){
            let phrase = (req.query.phrase).toLowerCase();
            let lst_contact=[];
            contacts.map((b_contact) => {
                if (b_contact.name.includes(phrase)) {
                    lst_contact.push(b_contact)
                }
            });
            res.json(lst_contact)
        }else{
            res.sendStatus(404)
        }
    }else{
       const jsonAsArray = sortJsonArray(contacts, "name")
       res.json(jsonAsArray);
    }
}

function findContact(req, res) {
    let contact_id = req.params.id;
    let contact = null;
    contacts.forEach((b_contact) => {
        if (b_contact.id === contact_id) {
            contact = b_contact;
        }
    });
    if (contact){
        res.json(contact);
    }else{
        res.sendStatus(404)
    }
 
}

function delContact(req, res) {
    let contact_id = req.params.id;
    let eliminar = false;
    let index=null;
    Object.keys(contacts).forEach( (key) => {
        if (contacts[key].id === contact_id){
            index = key;
            eliminar = true;
            }
    });
    if (eliminar){
        contacts.splice(index, 1)
        fs.writeFileSync('fakedatabase.json', JSON.stringify(contacts),'utf-8')
        res.sendStatus(204)
    }else{
        res.sendStatus(404)
    }
}

module.exports = { contactos, findContact, delContact }