const connection = require('../config/db')



const getAllProducts = async (req,res)=>{

    try {
        const [result]= await connection.query('SELECT * FROM products');
        res.render('index.ejs',{products:result})
        
    } catch (error) {
        res.render('erroe.ejs')
    }

}

const oneProduct  = async (req,res)=>{

    const id = req.params.id

    try {
        const [[result]]= await connection.query('SELECT * FROM products WHERE id = ?',[id]);
        if (result.length==0) {
            return res.status(404).json({
                message:"course not found"
            })
        }
        // res.status(200).json(result)
        res.render('product/oneProduct',{product:result})
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }


}

const createProduct = async(req,res)=>{
    res.render('product/create.ejs')
}
const updateProduct = async(req,res)=>{
    const id = req.params.id
    const [[result]]= await connection.query('SELECT * FROM products WHERE id = ?',[id]);
    res.render('product/edit.ejs',{product:result})
}

const saveProduct = async (req, res) => {
    let {name,description,price,image}=req.body
    if (!image) {
        // Set default image url
        image = 'https://media.discordapp.net/attachments/426088981948530700/1093537483729412126/no-image-icon-23494.png?width=250&height=250';
      }

    try {
        const result= await connection.query('INSERT INTO products (name,description,price,image) VALUES(?,?,?,?)',[name,description,price,image]);

        res.redirect('/');
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }
}


const putProduct = async (req, res) => {
    let id =req.params.id
    let {name,description,price,image}=req.body

    if (name =='' || description== ''|| price==null ||image=='' ) {
        return res.status(400).send({
            message:"Bad request"
        })
    }

    try {
        
        const [result]= await connection.query('UPDATE products SET name = ?,description = ?,price = ?,image=? WHERE id = ?',[name,description,price,image,id]);
       if (result.affectedRows==0  ) {
        return res.status(400).send({
            message:"Bad request"
        })
       }
       res.redirect('/')
       
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
        
    }
}


const deleteProduct = async(req, res) => {
    let id =req.params.id

   
    try {
        
        const [result]= await connection.query('DELETE FROM products WHERE id = ?',[id]);

        res.redirect('/')
       
        
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }

}

exports.getAllProducts = getAllProducts
exports.oneProduct = oneProduct
exports.saveProduct = saveProduct
exports.createProduct = createProduct
exports.putProduct = putProduct
exports.updateProduct = updateProduct
exports.deleteProduct = deleteProduct