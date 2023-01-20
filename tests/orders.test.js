const { Users, Orders } = require("../models");
const chaiHttp = require("chai-http");
const chai = require("chai");
const app = require("../app");
const { before } = require("mocha");

chai.use(chaiHttp)
chai.should()

describe("Orders", () => {
    before(async () => {
        await Orders.destroy({
            where: {},
        })
    })

    describe("POST /orders", () => {
        it("make order must be successfully", (done) => {
            const credentials = {
                email: 'example@gmail.com',
                password: 'exampleexample'
            }

            chai.request(app)
                .post('/users/login')
                .send(credentials)
                .end((err, res) => {
                    if (err) return console.log(err)
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('token');
                    console.log("res login", res.body)
                    chai.request(app)
                        .post('/orders')
                        // .send("balasdas")
                        .set({
                            authorization: res.body.data.token
                        })
                        .end((err, res) => {
                            if (err) return console.log(err)
                            console.log("order", res.body)
                        })

                })
        })
    })
})
