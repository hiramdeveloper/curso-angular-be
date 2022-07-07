const express = require('express');
var cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const users = [
    {id: 1, name: 'Hiram', age: 35, ocupation: 'Developer'},
    {id: 2, name: 'Jorge', age: 30, ocupation: 'Tester'},
    {id: 3, name: 'Ramon', age: 25, ocupation: 'DBA'}
];

const customers = [
    {id: 1, name: 'Marcos', age: 35, ocupation: 'Abogado'},
    {id: 2, name: 'Gerardo', age: 30, ocupation: 'Doctor'},
    {id: 3, name: 'Julio', age: 25, ocupation: 'Dentista'}
]

app.get('/', (req, res) => {
    res.send('Server on line');
});

app.get('/api/users', (req, res) => {
    res.send(users);
});

app.get('/api/customers', (req, res) => {
    res.send(customers);
});

app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('Usuario no encontrado');
    }
    res.send(user);
});

app.post('/api/users', (req, res) => {
    console.log(req.body);
    const user = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age,
        ocupation: req.body.ocupation
    };
    users.push(user);
    res.send(user);
});

app.delete('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('Usuario no encontrado');
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.send(user);
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Servidor activo en el puerto: ${port}`));

