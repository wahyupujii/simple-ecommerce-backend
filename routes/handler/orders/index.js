const create = require("./create");
const getAll = require("./getAll");
const update = require("./update");
const getUnpaid = require("./getUnpaid");
const getPaid = require("./getPaid");
const updateUnpaid = require("./updateUnpaid");
const destroy = require("./destroy");
const getUnverifOrder = require("./getUnverifOrder");

const getOrderVerifyNull = require("./getOrderVerifyNull")

module.exports = {
    create,
    getAll,
    update,
    getUnpaid,
    getPaid,
    updateUnpaid,
    destroy,
    getUnverifOrder,
    getOrderVerifyNull
}
