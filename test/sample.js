const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require("../index");

chai.use(chaiHttp);

describe("Testing The Server", () => {
    it("Should return a welcome message", (done) => {
        chai.request(server)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})