const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json())

const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const productsRoutes = require('./routes/products');
const wishlistRoutes = require('./routes/wishlist');
const orderRoutes = require('./routes/order');
const myauthMiddleware = require("./middleware/tokenAuth");

app.use('/app/v1/user', userRoutes);
app.use('/app/v1/cart', myauthMiddleware ,cartRoutes);
app.use('/app/v1/product', productsRoutes);
app.use('/app/v1/wishlist',myauthMiddleware, wishlistRoutes);
app.use('/app/v1/order',myauthMiddleware, orderRoutes);

const connect = async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon')
}

connect()
.then(() => {
    console.log('conection establish with database');
})
.catch((error)=>{
    console.log('Error occured while connecting with database.');
})

const port = 4000;
app.listen(port, ()=>{
    console.log('The app is up and running on port ', port);
})