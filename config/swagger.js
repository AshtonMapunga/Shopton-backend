const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shoptoo Ecommerce API",
      version: "1.0.0",
      description: "Complete REST API documentation for the Shoptoo ecommerce backend",
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 4071}`, description: "Local Development" },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token. Get it from /api/v1/auth/login",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            address: {
              type: "object",
              properties: {
                street: { type: "string" },
                city: { type: "string" },
                country: { type: "string" },
              },
            },
            role: { type: "string", enum: ["customer", "admin"] },
            isActive: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            originalPrice: { type: "number" },
            discount: { type: "number" },
            imageurl: { type: "string" },
            images: { type: "array", items: { type: "string" } },
            categoryID: { type: "number" },
            category: { type: "string" },
            brand: { type: "string" },
            tags: { type: "array", items: { type: "string" } },
            stock: { type: "number" },
            sku: { type: "string" },
            rating: { type: "number" },
            numReviews: { type: "number" },
            isActive: { type: "boolean" },
            isFeatured: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Category: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            imageurl: { type: "string" },
            categoryID: { type: "number" },
            isActive: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        CartItem: {
          type: "object",
          properties: {
            productId: { type: "string" },
            name: { type: "string" },
            price: { type: "number" },
            imageurl: { type: "string" },
            quantity: { type: "number" },
          },
        },
        Cart: {
          type: "object",
          properties: {
            _id: { type: "string" },
            userId: { type: "string" },
            items: { type: "array", items: { $ref: "#/components/schemas/CartItem" } },
            totalAmount: { type: "number" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Review: {
          type: "object",
          properties: {
            _id: { type: "string" },
            productId: { type: "string" },
            userId: { type: "string" },
            userName: { type: "string" },
            rating: { type: "number", minimum: 1, maximum: 5 },
            comment: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string" },
            orderNumber: { type: "string" },
            userId: { type: "string" },
            deliveryDetails: {
              type: "object",
              properties: {
                fullName: { type: "string" },
                phoneNumber: { type: "string" },
                email: { type: "string" },
                address: { type: "string" },
                city: { type: "string" },
              },
            },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: { type: "string" },
                  name: { type: "string" },
                  productImage: { type: "string" },
                  quantity: { type: "number" },
                  price: { type: "number" },
                },
              },
            },
            totalAmount: { type: "number" },
            paymentStatus: { type: "string", enum: ["pending", "paid", "cancelled"] },
            deliveryStatus: {
              type: "string",
              enum: ["completed", "off", "confirmed", "processing", "delivered"],
            },
            paymentModel: { type: "string", enum: ["bnpl", "cod", "online"] },
            paymentMethod: { type: "string" },
            depositAmount: { type: "number" },
            remainAmount: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Payment: {
          type: "object",
          properties: {
            _id: { type: "string" },
            order: { $ref: "#/components/schemas/Order" },
            pollUrl: { type: "string" },
            isPaid: { type: "boolean" },
            currency: { type: "string" },
            price: { type: "number" },
            attempts: { type: "number" },
            mobilePaymentDetails: {
              type: "object",
              properties: {
                method: { type: "string" },
                phoneNumber: { type: "string" },
                status: { type: "string" },
              },
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
          },
        },
        Success: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { type: "object" },
          },
        },
      },
    },
  },
  apis: ["./router/*.js"],
};

module.exports = swaggerJsdoc(options);
