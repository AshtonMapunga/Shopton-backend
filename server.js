require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');




const bannerRouter = require('./router/bannerRouter.js'); 
const productRouter = require('./router/productRouter.js'); 
const brandRouter = require('./router/brandRouter.js'); 
const orderRouter = require('./router/orderRouter.js'); 
const paymentRouter = require('./router/paymentRouter.js');
const serviceTypeRoutes = require("./router/serviceTypeRoutes.js"); 
const customRequestRoutes = require("./router/customRequestRoutes.js");












const url = "mongodb+srv://sebatech2024:xcGRZSYqgiLbwbO0@escholar.f51th.mongodb.net/Shopton";
const app = express();

// MongoDB Connection
mongoose.connect(url)
    .then(() => {
        console.log('The MongoDB has connected successfully');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());




app.use('/api/v1/banner_route', bannerRouter);
app.use('/api/v1/product_route', productRouter);
app.use('/api/v1/brand_route', brandRouter);
app.use('/api/v1/order_route', orderRouter);
app.use('/api/v1/payment_route', paymentRouter);
app.use("/api/v1/service_type", serviceTypeRoutes); 
app.use("/api/v1/custom_request", customRequestRoutes);













const Port = 4071;
app.listen(Port, () => {
    console.log("The server is running well at port:", Port);
});
