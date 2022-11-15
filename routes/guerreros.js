const {Router} = require("express")
const {getSpirits, getSpiritsByID, addSpirits, updateSpiritsByUsuario, deleteSpiritsByID, } = require("../controllers/guerreros")
const router = Router()

//http://localhost:4007/api/v1/guerreros

/// GET ///
router.get("/", getSpirits)
router.get("/id/:id", getSpiritsByID)

/// POST ///
router.post("/", addSpirits)

/// PUT ///
router.put("/", updateSpiritsByUsuario )

/// DELETE ///
router.delete("/", deleteSpiritsByID)

module.exports = router