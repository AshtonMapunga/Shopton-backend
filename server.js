require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const redis = require('./config/redisClient');

// ---------------------
// Redis Setup (Upstash)
// ---------------------
// Redis is optional for startup; the shared client falls back gracefully if unavailable.

// ---------------------
// Import Routers
// ---------------------
const bannerRouter = require('./router/bannerRouter.js'); 
const productRouter = require('./router/productRouter.js'); 
const brandRouter = require('./router/brandRouter.js'); 
const orderRouter = require('./router/orderRouter.js'); 
const paymentRouter = require('./router/paymentRouter.js');
const serviceTypeRoutes = require("./router/serviceTypeRoutes.js"); 
const customRequestRoutes = require("./router/customRequestRoutes.js");
const wooCommerceRouter = require('./router/woocommerceRouter.js');
const paymentsRouter = require('./router/paymentRouter.js');
const emailRouter = require('./router/email.routes.js');




// ---------------------
// MongoDB Connection
// ---------------------
const mongoUrl = "mongodb+srv://sebatech2024:xcGRZSYqgiLbwbO0@escholar.f51th.mongodb.net/Shopton";
mongoose.connect(mongoUrl)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// ---------------------
// Express Middlewares
// ---------------------
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/images", express.static("public/images"));


// ---------------------
// Routes
// ---------------------
app.use('/api/v1/banner_route', bannerRouter);
app.use('/api/v1/product_route', productRouter);
app.use('/api/v1/brand_route', brandRouter);
app.use('/api/v1/order_route', orderRouter);
app.use('/api/v1/payment_route', paymentRouter);
app.use("/api/v1/service_type", serviceTypeRoutes); 
app.use("/api/v1/custom_request", customRequestRoutes);
app.use('/api/v1/woo', wooCommerceRouter);
app.use('/api/v1/payment_route', paymentsRouter);
app.use("/api/v1/email", emailRouter);


const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log("Server running at port:", port);
    console.log(`Swagger docs: http://localhost:${port}/api-docs`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.warn(`Port ${port} is busy. Trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      throw error;
    }
  });
};

const Port = Number(process.env.PORT || 4071);
startServer(Port);
