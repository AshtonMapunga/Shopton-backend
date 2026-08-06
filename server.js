require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Redis } = require('@upstash/redis');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// ---------------------
// Redis Setup (Upstash)
// ---------------------
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

redis.ping()
    .then(() => console.log('Connected to Upstash Redis'))
    .catch(err => console.error('Redis connection error:', err));

// ---------------------
// Import Routers
// ---------------------
const authRouter = require('./router/authRouter');
const bannerRouter = require('./router/bannerRouter.js');
const productRouter = require('./router/productRouter.js');
const brandRouter = require('./router/brandRouter.js');
const categoryRouter = require('./router/categoryRouter.js');
const orderRouter = require('./router/orderRouter.js');
const paymentRouter = require('./router/paymentRouter.js');
const cartRouter = require('./router/cartRouter.js');
const reviewRouter = require('./router/reviewRouter.js');
const serviceTypeRoutes = require('./router/serviceTypeRoutes.js');
const customRequestRoutes = require('./router/customRequestRoutes.js');
const wooCommerceRouter = require('./router/woocommerceRouter.js');
const emailRouter = require('./router/email.routes.js');

// ---------------------
// MongoDB Connection
// ---------------------
const mongoUrl = process.env.MONGO_URI || "mongodb+srv://sebatech2024:xcGRZSYqgiLbwbO0@escholar.f51th.mongodb.net/jhjhj";
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
app.use("/images", express.static("public/images"));

// ---------------------
// Routes
// ---------------------
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/banner_route', bannerRouter);
app.use('/api/v1/product_route', productRouter);
app.use('/api/v1/brand_route', brandRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/order_route', orderRouter);
app.use('/api/v1/payment_route', paymentRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/service_type', serviceTypeRoutes);
app.use('/api/v1/custom_request', customRequestRoutes);
app.use('/api/v1/woo', wooCommerceRouter);
app.use('/api/v1/email', emailRouter);

// ---------------------
// Health Check
// ---------------------
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

const Port = process.env.PORT || 4071;
app.listen(Port, () => console.log("Server running at port:", Port));
