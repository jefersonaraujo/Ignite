const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json())
const costomers = [];

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const id = uuidv4();

    costomers.push({
        cpf,
        name,
        id,
        statement: []
    });
    console.log(costomers);
    return response.status(201).send();
});

app.listen(3333)