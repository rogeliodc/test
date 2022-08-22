const express = require("express")
const routerContactos = require('./routes/contact.routes')
const app = express()
const puerto = 3000

app.use(express.json())

app.use(function (req, res, next) {
    let metodo = req.method
    console.log('Request Type:', req.method);
    if (metodo != 'GET' && metodo != 'DELETE') {
        res.sendStatus(405)
    } else {
        next();
    }
});

app.get('/', (req, res) => {
    res.send("API : " );
});

app.use(routerContactos);

app.listen(puerto, err => {
    if (err) {
        console.error("Error escuchando: ", err);
        return;
    }
    console.log(`Escuchando en el puerto :${puerto}`);
});
