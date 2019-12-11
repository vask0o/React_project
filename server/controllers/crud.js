const Item = require('../models/Item');


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
        console.log(err)
        return res.send(500, { error: err });
      }
      return res.send("success");
    })
      .then((item) => {
        res.status(200)
          .json({
            message: 'success!',
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