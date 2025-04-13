const ItemList = require('../models/ItemDetails');
const ensureAuthenticated = require('../Middlewares/Auth');
const router = require('express').Router();

router.get('/categories', (req, res) => {
    ItemList.find({})
    .then(item => res.json(item))
    .catch(err => res.json(err))
})

router.post('/categories', (req, res) => {
    ItemList.create(req.body)
    .then(item => res.json(item))
    .catch(err => res.json(err))
})

router.get('/categories/:id', (req,res) => {
    const id = req.params.id
    ItemList.findById({_id: id})
    .then(item => res.json(item))
    .catch(err => console.log(err))
})

router.put('/update/:id', (req, res) => {
    const id = req.params.id
    ItemList.findByIdAndUpdate({_id: id}, {image: req.body.image, categoryName: req.body.categoryName, itemCount: req.body.itemCount})
    .then(item => res.json(item))
    .catch(err => res.json(err))
})


module.exports = router;