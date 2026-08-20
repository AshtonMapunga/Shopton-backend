require('dotenv').config();

const mongoose = require('mongoose');
const Banner = require('./models/banner/banner_schema');
const Brand = require('./models/brands/brands_schema');
const Product = require('./models/product/products_schema');
const ServiceType = require('./models/service_type/service_type_schema');

const mongoUrl = process.env.MONGODB_URI || process.env.MongoDB_URI;

if (!mongoUrl) {
  throw new Error('MONGODB_URI is required');
}

const seedData = {
  brands: [
    {
      title: 'Apex Audio',
      numberofitems: '12',
      imageurl: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80',
      productCategoryID: 1,
    },
    {
      title: 'Northstar Home',
      numberofitems: '18',
      imageurl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      productCategoryID: 2,
    },
    {
      title: 'Field & Form',
      numberofitems: '9',
      imageurl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80',
      productCategoryID: 3,
    },
  ],
  products: [
    {
      name: 'Wireless Studio Headphones',
      description: 'Over-ear Bluetooth headphones with active noise cancellation and a 30-hour battery.',
      imageurl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      categoryID: 1,
    },
    {
      name: 'Modular Lounge Chair',
      description: 'A supportive, easy-care lounge chair designed for relaxed everyday living.',
      imageurl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      categoryID: 2,
    },
    {
      name: 'Everyday Canvas Tote',
      description: 'A durable, roomy canvas tote with reinforced handles for daily carry.',
      imageurl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      categoryID: 3,
    },
    {
      name: 'Insulated Travel Bottle',
      description: 'Double-wall stainless steel bottle that keeps drinks cold throughout the day.',
      imageurl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
      categoryID: 3,
    },
  ],
  banners: [
    {
      title: 'Make room for better living',
      description: 'Thoughtful home essentials, selected for everyday comfort.',
      imageurl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
      categoryName: 'Home',
      productCategoryID: '2',
    },
    {
      title: 'Sound that travels with you',
      description: 'Explore portable audio built for work, rest, and the road.',
      imageurl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80',
      categoryName: 'Audio',
      productCategoryID: '1',
    },
  ],
  serviceTypes: [
    {
      name: 'Home Installation',
      imageurl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
      description: 'Professional assembly and installation for furniture and home accessories.',
      priceStartingFrom: 45,
      averageRating: 4.8,
      completedJobs: 126,
      serviceTypeCategory: 2,
      isActive: true,
    },
    {
      name: 'Device Setup',
      imageurl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      description: 'Get your new audio and smart devices configured and ready to use.',
      priceStartingFrom: 30,
      averageRating: 4.7,
      completedJobs: 94,
      serviceTypeCategory: 1,
      isActive: true,
    },
  ],
};

const upsertMany = async (Model, records, key) => {
  const operations = records.map((record) => ({
    updateOne: {
      filter: { [key]: record[key] },
      update: { $set: record },
      upsert: true,
    },
  }));

  if (operations.length) {
    await Model.bulkWrite(operations);
  }
};

const seed = async () => {
  await mongoose.connect(mongoUrl);

  await upsertMany(Brand, seedData.brands, 'title');
  await upsertMany(Product, seedData.products, 'name');
  await upsertMany(Banner, seedData.banners, 'title');
  await upsertMany(ServiceType, seedData.serviceTypes, 'name');

  console.log(`Seeded ${seedData.brands.length} brands, ${seedData.products.length} products, ${seedData.banners.length} banners, and ${seedData.serviceTypes.length} service types.`);
};

seed()
  .catch((error) => {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
