const router = require('express').Router();
const crudController = require('../controllers/crud');
const isAuth = require('../middleware/is-auth');

router.get('/items', crudController.getItems);
router.post('/item/create', crudController.createItem);
router.put('/item/edit', crudController.editItem);
router.delete('/item/delete', crudController.deleteItem);

router.post('/user/newOrder', crudController.addNewOrderToUser)
router.get('/user/orders', crudController.getUserOrders);
router.post('/user/delete',crudController.removeUserOrders);
router.post('/user/deleteSingleItem',crudController.deleteSingleItem);
router.post('/user/addPendingOrders',crudController.addPendingOrders);
router.get('/user/getPendingOrders',crudController.getPendingOrders);
router.post('/user/deleteSingleOrder',crudController.deleteSingleOrder);


module.exports = router;