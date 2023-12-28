const supertest = require("supertest");
const server = require("../../index");

const request = supertest(server);

describe("Authentication APIs Test", () => {
    describe("Testing User Registration", () => {
        test("Should save user and return status code 201 when valid data is provided", async () => {
            const users = [
                { email: "test@example.com", password: "testing@123" },
                { email: "test2@example.com", password: "testing123@" }
            ]

            for (let user of users) {
                const res = await request.post("/auth/register").send(user);
                expect(res.status).toBe(201);
            }
        })

        test("Should return status code 400 when email is already registered", async () => {
            const users = [
                { email: "test@example.com", password: "testing@123" },
                { email: "test2@example.com", password: "testing123@" }
            ]

            for (let user of users) {
                const res = await request.post("/auth/register").send(user);
                expect(res.status).toBe(400);
            }
        })
    })

    describe("Testing Login", () => {
        test("Should have return status code 200 and auth token on a successful login", async () => {
            const user = {
                email: "test@example.com",
                password: "testing@123"
            }

            const res = await request.post("/auth/login").send(user);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("token");
        })

        test("Should return status code 400 when email or password is invalid", async () => {
            const invalidUserCredentials = [
                { email: "te@example.com", password: "testing@123" },
                { email: "test2@example.com", password: "123" }
            ]
            for (let credentials of invalidUserCredentials) {
                const res = await request.post("/auth/login").send(credentials);
                expect(res.status).toBe(400);
            }
        })
    })

})  