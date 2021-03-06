const { response, request } = require('express');
const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json())
const customers = [];

// +
function verifyIfExistsAccountCPF(request, response, next){
    const { cpf } = request.headers;

    const customer = customers.find(customer => customer.cpf == cpf);   

    if(!customer){
        return response.status(404).json({ error: "Customer not found!"});
    }
    request.customer = customer;
    return next();
}


app.post("/account", (request, response) => {
    const { cpf, name } = request.body;
    const customerAlreadtExists = customers.some(
        (customer) => customer.cpf === cpf 
    );
  
 

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });
    console.log(customers);
    return response.status(201).send();
});

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {    
    const { customer } = request;
    return response.json(customer.statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) =>{
    const { description, amount } = request.body;

    const { customer } = request;

    const statementOperation = { 
        description,
        amount,
        create_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);
    return response.status(201).send({mensagem: statementOperation});


});
app.listen(3333)