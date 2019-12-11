const router = require('express').Router();
const crudController = require('../controllers/crud');


router.get('/items', crudController.getItems);
router.post('/item/create', crudController.createItem);
router.put('/item/edit', crudController.editItem);
router.delete('/item/delete', crudController.deleteItem);





module.exports = router;