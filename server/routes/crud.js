const router = require('express').Router();
const crudController = require('../controllers/crud');


router.get('/items', crudController.getItems);
//router.post('/itemOne', crudController.getItemOne);
router.post('/item/create', crudController.createItem);
router.put('/item/edit/:id', crudController.editItem);
router.delete('/item/delete', crudController.deleteItem);
router.get('/itemOne/:id', crudController.getItemOne);





module.exports = router;