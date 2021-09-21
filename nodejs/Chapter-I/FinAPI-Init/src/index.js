const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json())
const customers = [];

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;
    const customerAlreadtExists = customers.some(
        (customers) => customers.cpf === cpf 
    );
    if(customerAlreadtExists){
        return response.status(400).json({ error: "Customer alterady exists!"});
    }
 

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });
    console.log(customers);
    return response.status(201).send();
});

app.listen(3333)