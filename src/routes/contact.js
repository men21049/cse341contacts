const express = require("express");
const router = express.Router();

const controller = require("../controllers/contactController");

router.get('/',controller.getContact);
router.get('/:id', controller.getContactById);
router.post('/', controller.createContact);
router.put('/:id', controller.updateContact);
router.delete('/:id', controller.deleteContact);

module.exports = router;