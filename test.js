const { default: seedPoint } = require("./crypto");

const password = "123456";
const pass = seedPoint(password);


console.log(pass.getX().toString());