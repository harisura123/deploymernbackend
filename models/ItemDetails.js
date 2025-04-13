const mongoose = require('mongoose');

const ItemDetails = new mongoose.Schema({
    image: String,
    categoryName: String,
    itemCount: String
})

const ItemList = mongoose.model("itemdetail", ItemDetails)

module.exports = ItemList