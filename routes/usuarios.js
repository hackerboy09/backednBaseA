const {Router} = require("express")
const{getUsers, getUserByID} = require("../controllers/usuarios")
const router = Router()

//http://localhost:4007/api/v1/usuarios

router.get("/", getUsers)
router.get("/id/:id", getUserByID)

module.exports = router