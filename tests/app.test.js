const { app } = require("../index")
const { getAllEmployees, getEmploeeById} = require("../controllers/index")

let http = require("http")

jest.mock("../controllers",()=>{
    ...jest.requireActual("../controllers"),
    getAllEmployees : jest.fn(),
    getEmploeeById :jest.fn()
})