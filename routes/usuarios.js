const {Router} = require("express")
const{getUsers, getUserByID, deleteUserByID} = require("../controllers/usuarios")
const router = Router()

//http://localhost:4007/api/v1/usuarios?id=""

router.get("/", getUsers)
router.get("/id/:id", getUserByID)

router.delete("/", deleteUserByID)

module.exports = router