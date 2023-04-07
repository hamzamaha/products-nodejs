const express = require('express');
const bodyParser = require('body-parser')
const productsRoutes = require('./routes/products.routes')

const PORT=3500;


const app = express();
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(productsRoutes)

app.set('view engine','ejs')
app.set('views','template')


app.get("/", (req, res) => {
    
});

app.listen(PORT, () => {
    console.log(`the server is runing in http://localhost:${PORT}`)
})