const express = require('express')
const { getAllProducts,oneProduct ,saveProduct,createProduct,putProduct,updateProduct,deleteProduct} = require('../controllers/products.controllers')

const router = express.Router()

router.get('/', getAllProducts)

router.get('/create', createProduct)


router.post('/', saveProduct)

router.get('/edit/:id', updateProduct)
router.post('/:id', putProduct)

router.get('/:id', oneProduct)

router.get('/delete/:id', deleteProduct)



// router.put('/articles/:id', putArticle)

// router.patch('/articles/:id', patchArticle)

// router.delete('/articles/:id', deleteArticle)

module.exports = router