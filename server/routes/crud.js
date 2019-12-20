const router = require('express').Router();
const crudController = require('../controllers/crud');


router.get('/items', crudController.getItems);
router.post('/item/create', crudController.createItem);
router.put('/item/edit/:id', crudController.editItem);
router.delete('/item/delete', crudController.deleteItem);
router.put('/itemOne/:id', crudController.getItemOne);





module.exports = router;