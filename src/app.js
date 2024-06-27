const express = require('express');
const database = require('./database');

const app = express();

app.use(express.text());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('holis');
});

app.get('/db', (req, res) => {
    res.json(database);
});

app.get('/db/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.json(database.find((name) => name.id === id));
})

app.post('/db', (req, res) => {
    const {id, name} = req.body;
    database.push({id, name});
    res.json({msg : "se agrego correctamente"});
});

app.put('/db/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {name} = req.body;
    const x = database.find((name) => name.id === id);
    x.name = name;
    res.json({msg : "se actualizo correctamente"});
});

app.delete('/db/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const n = database.find((name) => name.id === id);
    database.splice(database.indexOf(n), 1);
    res.json({msg : "se elimino correctamente"});
});

app.listen(3000, () => console.log('servidor corriendo en el puerto 3000'));