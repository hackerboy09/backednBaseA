const {request, response} = require("express")


const getUsers = (req = request, res = response) => {
    console.log("Funcion getUsers")
    res.json ({ms: "Funcion getUsers"})
}

module.exports = {getUsers}