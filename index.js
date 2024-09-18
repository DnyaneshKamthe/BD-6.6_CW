const express = require('express');
const { resolve } = require('path');
const {getAllEmployees, getEmploeeById} = require("./controllers/index")

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.get("/employees", (req, res) => {
  try {
    let result = getAllEmployees()
    if(result.length === 0) {
      res.status(404).json({error : "No employees found"})
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.get("/employees/details/:id", (req, res) => {
  try {
    let id = req.params.id;
    let result = getEmploeeById(id)
    if(!result) {
      res.status(404).json({error : "Employee not found"})
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

module.exports = { app }
