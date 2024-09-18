const { app } = require("../index");
const { getAllEmployees, getEmployeeById } = require("../controllers/index");
const request = require('supertest');

let http = require("http");

jest.mock("../controllers", () => ({
    ...jest.requireActual("../controllers"),
    getAllEmployees: jest.fn(),
    getEmployeeById: jest.fn(),  // Corrected the typo here
}));

let server;
beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("API testing", () => {
    beforeEach(() => {
        jest.clearAllMocks();  // Fixed the usage of clearAllMocks
    });

    it("Should return all employees", async () => {  // Marking the test as async
        let mockData = [
            {
                employeeId: 1,
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                departmentId: 1,
                roleId: 1,
            },
            {
                employeeId: 2,
                name: 'Priya Singh',
                email: 'priya.singh@example.com',
                departmentId: 2,
                roleId: 2,
            },
            {
                employeeId: 3,
                name: 'Ankit Verma',
                email: 'ankit.verma@example.com',
                departmentId: 1,
                roleId: 3,
            },
        ];
        getAllEmployees.mockReturnValue(mockData);  // Mocking the controller response

        // Making an HTTP request to the endpoint
        const res = await request(server).get('/employees');  // Adjust the endpoint to match your app's routes

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockData);
        expect(getAllEmployees).toHaveBeenCalled();
    });

    it("should return employee by id", async() => {
        let mockData =  {
            employeeId: 1,
            name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            departmentId: 1,
            roleId: 1,
        }
        getEmployeeById.mockReturnValue(mockData);
        let result = await request(server).get("/employees/details/1");
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(mockData)
    })

   
});
