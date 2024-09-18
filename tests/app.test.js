const { app } = require("../index")
const { getAllEmployees, getEmploeeById} = require("../controllers/index")
const request = require('supertest')
const { app } = require("../index")

let http = require("http")

jest.mock("../controllers",()=>({
    ...jest.requireActual("../controllers"),
    getAllEmployees : jest.fn(),
    getEmploeeById :jest.fn()
}))

let server;
beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done)
})

afterAll((done) => {
    server.close(done);
})