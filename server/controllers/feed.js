const Item = require('../models/Item');
const Orders = require('../models/Order');
const PendingOrder = require('../models/AllItems');

module.exports = {

  getItems: (req, res) => {
    Item.find()
      .then((items) => {
        res
          .status(200)
          .json({ message: 'Fetched items successfully.', items });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },

  getPendingOrders: (req,res) => {
    PendingOrder.find().then((orders) => {
      res.status(200)
      .json({message:"All orders fetched successfully", orders})
    }).catch((err) => {
      next(err);
    })
  },

  getUserOrders: (req, res) => {
    Orders.find().then((order) => {
      res.status(200)
        .json({ message: "User orders fetched successfully.", order })
    })
      .catch((error) => {
        // if (!error.statusCode) {
        //   error.statusCode = 500;
        // }
        next(error);
      })
  },

  
  createItem: (req, res) => {
    const itemObj = req.body;
    Item.create(itemObj)
      .then((item) => {
        res.status(200)
          .json({
            message: 'Item created successfully!',
            item
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
      });
  },

  addNewOrderToUser: (req, res) => {
    const orderObj = req.body;
    Orders.create(orderObj)
      .then((order) => {
        res.status(200).json({
          message: "Item added to cart successfully!",
          order
        })
      }).catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
      })
  },
  addPendingOrders: async (req, res) => {
    try {
      let data = req.body;
      let findOrderByUser = await PendingOrder.find({
        user: data.user
      });
      if (findOrderByUser.length < 1) {
        await PendingOrder.create({
          user: data.user,
          totalSum: data.totalSum,
          itemsName: data.itemsNameAndQnt,
        });
      }

      
      else {
        let itemNames = data.itemsNameAndQnt;
        let currentSum = findOrderByUser[0].totalSum;
        let totalSum = data.totalSum + currentSum;
        await PendingOrder.findOneAndUpdate({ user: data.user }, { $push: { itemsName: itemNames } })
        await PendingOrder.findOneAndUpdate({ user: data.user }, { $set: { totalSum: totalSum } });
      }
    } catch (error) {
      console.log(error);
    }

  },

  deleteSingleItem: (req, res) => {
    let user = req.body.user;
    let productName = req.body.productName;
    Orders.deleteMany({
      user: user,
      productName: { $in: [productName] }
    }).then(() => {
      res.status(200).json({
        message: 'You`ve deleted the choosen item'
      })
    })
  },

  deleteSingleOrder: (req,res) => {
    let id = req.body.id;
    console.log(id);
    PendingOrder.findByIdAndRemove({
      _id:id
    }).catch((err)=>{
      console.log(err);
    })
  },


  removeUserOrders: (req, res) => {
    let currUser = req.body.user;
    Orders.deleteMany(
      {
        user: currUser,
      }).then(() => {
        res.status(200).json({
          message: "You`ve made it!!!"
        })
      })
  },

  deleteItem: (req, res) => {

    let query = { '_id': req.body._id };

    Item.deleteOne(query, function (err) {
      console.log(err)
    })
      .then(() => {
        res.status(200)
          .json({
            message: 'Item deleted successfully!',
          })
      })
  },

  editItem: (req, res) => {
    let query = { '_id': req.body._id };
    let newData = {
      itemName: req.body.itemName,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price
    }

    Item.findOneAndUpdate(query, newData, { upsert: true }, function (err, doc) {
      if (err) {
        console.log("An error occurred while updating document:")
        console.log(err)
        return res.send(500, { error: err });
      }
      return res.send("succesfully saved");
    })
      .then((item) => {
        res.status(200)
          .json({
            message: 'Item edit successfully!',
            item
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
      });
  },


}