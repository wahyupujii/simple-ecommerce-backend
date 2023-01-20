const {Users} = require("../models");
const chaiHttp = require("chai-http");
const chai = require("chai");
const app = require("../app");
const { before } = require("mocha");

chai.use(chaiHttp)
chai.should()

describe("Users" , () => {
    before(async () => {
        await Users.destroy({
            where: {},
        })
    })
    
    describe("POST /users/register", () => {
        it("register should return token and refreshToken", (done) => {
            const data = {
                name: "example",
                email: "example@gmail.com",
                password: "exampleexample"
            }
            chai.request(app)
            .post('/users/register')
            .send(data)
            .end((err, res) => {
                if (err) return console.log(err)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("data");
                res.body.data.should.have.property("token");
                res.body.data.should.have.property("refreshToken");
                done()
            })
        })
    })

    describe("POST /users/login", () => {
        it("login should return token and refreshToken", (done) => {
            const data = {
                email: "example@gmail.com",
                password: "exampleexample"
            }
            chai.request(app)
            .post('/users/login')
            .send(data)
            .end((err, res) => {
                if (err) return console.log(err)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("data");
                res.body.data.should.have.property("token");
                res.body.data.should.have.property("refreshToken");
                done()
            })
        })
    })

    // not finished yet
    // describe("POST /users/refresh-token", () => {
    //     it("refresh token should return new token and refresh token", (done) => {
    //         const data = {
    //             refreshToken: "token",
    //             email: "email"
    //         }
    //         chai.request(app)
    //         .post('/users/refresh-token')
    //         .send(data)
    //         .end((err, res) => {
    //             if (err) console.log(err)
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             res.body.data.should.have.property("token");
    //             res.body.data.should.have.property("refreshToken");
    //             done();
    //         })
    //     })
    // })
})
