const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
})

app.get('/',(req, res)=>{
    res.send('Привіт з Express.js!');
})

app.get('/users/:id', (req, res)=>{
    const id = req.params.id
    res.send(`Hello User: ${id}`)
})

app.post('/users', (req, res)=>{
    const {name, email} = req.body;
    res.send(JSON.stringify({message: `Отримано дані: Ім'я - ${name}, Електронна пошта - ${email}`}));
})

app.listen(3000, ()=>{
    console.log('Server started on port 3000');
});

app.use((req,res)=>{
    res.status(404).type('text/html').send(`<h1>Page Not Found</h1>`);
})