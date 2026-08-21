const configuredBaseUrl = (process.env.BASE_URL || '')
  .replace(/^BASE_URL=/, '')
  .replace(/\/$/, '');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Shopton Backend API',
    version: '1.0.0',
    description: 'Swagger documentation for the Shopton backend services, including banners, products, orders, payments, service types, custom requests, emails, and WooCommerce integrations.'
  },
  servers: [
    {
      url: configuredBaseUrl || 'http://localhost:4071',
      description: configuredBaseUrl ? 'Deployed server' : 'Local development server'
    }
  ],
  tags: [
    { name: 'Banners', description: 'Banner management endpoints' },
    { name: 'Brands', description: 'Brand management endpoints' },
    { name: 'Products', description: 'Product management endpoints' },
    { name: 'Orders', description: 'Order management endpoints' },
    { name: 'Service Types', description: 'Service type catalog endpoints' },
    { name: 'Custom Requests', description: 'Customer custom request endpoints' },
    { name: 'Emails', description: 'Email notification endpoints' },
    { name: 'Payments', description: 'Payment gateway endpoints' },
    { name: 'WooCommerce', description: 'WooCommerce product and category endpoints' }
  ],
  components: {
    schemas: {
      BannerInput: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Summer Sale' },
          description: { type: 'string', example: 'Seasonal product offers' },
          imageurl: { type: 'string', format: 'uri', example: 'https://example.com/banner.jpg' },
          categoryName: { type: 'string', example: 'Featured' },
          productCategoryID: { type: 'string', example: '12' }
        },
        required: ['title', 'description', 'imageurl', 'categoryName', 'productCategoryID']
      },
      BrandInput: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Acme' },
          numberofitems: { type: 'string', example: '24' },
          imageurl: { type: 'string', format: 'uri', example: 'https://example.com/brand.jpg' },
          productCategoryID: { type: 'number', example: 12 }
        },
        required: ['title', 'numberofitems', 'imageurl', 'productCategoryID']
      },
      OrderInput: {
        type: 'object',
        properties: {
          userId: { type: 'string', example: 'customer-123' },
          deliveryDetails: {
            type: 'object',
            properties: {
              fullName: { type: 'string', example: 'Jane Doe' },
              phoneNumber: { type: 'string', example: '+263771234567' },
              email: { type: 'string', format: 'email', example: 'jane@example.com' },
              address: { type: 'string', example: '12 Main Street' },
              city: { type: 'string', example: 'Harare' }
            },
            required: ['fullName', 'phoneNumber', 'email', 'address', 'city']
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                productId: { type: 'string', example: '665f1a2b3c4d5e6f78901234' },
                name: { type: 'string', example: 'Sample Product' },
                productImage: { type: 'string', format: 'uri', example: 'https://example.com/product.jpg' },
                quantity: { type: 'number', example: 2 },
                price: { type: 'number', example: 25.5 }
              },
              required: ['productId', 'name', 'productImage', 'quantity', 'price']
            }
          },
          totalAmount: { type: 'number', example: 51 },
          paymentStatus: { type: 'string', enum: ['pending', 'paid', 'cancelled'] },
          deliveryStatus: { type: 'string', enum: ['completed', 'off', 'confirmed', 'processing', 'delivered'] },
          paymentModel: { type: 'string', enum: ['bnpl', 'cod', 'online'] },
          depositAmount: { type: 'number', example: 25.5 },
          remainAmount: { type: 'number', example: 25.5 },
          paymentMethod: { type: 'string', example: 'card' },
          transactionReferenceID: { type: 'string', example: 'TXN-12345' }
        },
        required: ['deliveryDetails', 'items', 'totalAmount', 'depositAmount', 'remainAmount', 'paymentMethod']
      },
      ServiceTypeInput: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Plumbing' },
          imageurl: { type: 'string', format: 'uri', example: 'https://example.com/service.jpg' },
          description: { type: 'string', example: 'Professional plumbing services' },
          priceStartingFrom: { type: 'number', example: 50 },
          averageRating: { type: 'number', example: 4.5 },
          completedJobs: { type: 'number', example: 120 },
          serviceTypeCategory: { type: 'number', example: 3 },
          isActive: { type: 'boolean', example: true }
        },
        required: ['name', 'imageurl', 'description', 'priceStartingFrom', 'averageRating', 'completedJobs', 'serviceTypeCategory']
      },
      CustomRequestInput: {
        type: 'object',
        properties: {
          userID: { type: 'string', example: 'customer-123' },
          serviceType: { type: 'string', example: 'plumbing' },
          description: { type: 'string', example: 'Fix a leaking kitchen tap' },
          imageUrls: { type: 'array', items: { type: 'string', format: 'uri' } },
          budget: {
            type: 'object',
            properties: {
              min: { type: 'number', example: 50 },
              max: { type: 'number', example: 150 },
              currency: { type: 'string', example: 'USD' }
            }
          },
          location: {
            type: 'object',
            properties: {
              address: { type: 'string', example: '12 Main Street' },
              city: { type: 'string', example: 'Harare' },
              coordinates: {
                type: 'object',
                properties: {
                  latitude: { type: 'number', example: -17.8252 },
                  longitude: { type: 'number', example: 31.0335 }
                }
              }
            }
          },
          urgency: { type: 'string', enum: ['ASAP', 'THIS_WEEK', 'FLEXIBLE'] },
          status: { type: 'string', enum: ['PENDING', 'EXPERTS_REQUESTED', 'QUOTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] }
        },
        required: ['userID', 'serviceType', 'description']
      },
      PaymentInput: {
        type: 'object',
        properties: {
          pollUrl: { type: 'string', format: 'uri', example: 'https://payments.example.com/poll/123' },
          isPaid: { type: 'boolean', example: false },
          showPayment: { type: 'boolean', example: true },
          currency: { type: 'string', example: 'USD' },
          price: { type: 'number', example: 51 },
          order: { type: 'string', example: '665f1a2b3c4d5e6f78901234' },
          attempts: { type: 'number', example: 1 },
          mobilePaymentDetails: {
            type: 'object',
            properties: {
              method: { type: 'string', example: 'ecocash' },
              phoneNumber: { type: 'string', example: '+263771234567' },
              status: { type: 'string', example: 'pending' }
            }
          }
        }
      },
      PaymentSuccessfulEmail: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Jane Doe' },
          email: { type: 'string', format: 'email', example: 'jane@example.com' },
          orderId: { type: 'string', example: 'OR-ABC1234' },
          total: { type: 'number', example: 51 },
          paymentMethod: { type: 'string', example: 'card' }
        },
        required: ['name', 'email', 'orderId', 'total', 'paymentMethod']
      },
      OrderDeliveredEmail: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Jane Doe' },
          email: { type: 'string', format: 'email', example: 'jane@example.com' },
          orderId: { type: 'string', example: 'OR-ABC1234' }
        },
        required: ['name', 'email', 'orderId']
      },
      WelcomeEmail: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Jane Doe' },
          email: { type: 'string', format: 'email', example: 'jane@example.com' }
        },
        required: ['name', 'email']
      },
      AbandonedCartEmail: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Jane Doe' },
          email: { type: 'string', format: 'email', example: 'jane@example.com' },
          total: { type: 'number', example: 51 }
        },
        required: ['name', 'email', 'total']
      }
    }
  },
  paths: {
    '/api/v1/banner_route/create': {
      post: {
        tags: ['Banners'],
        summary: 'Create a new banner',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/BannerInput' } } } },
        responses: { '201': { description: 'Banner created successfully' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/banner_route/getall': {
      get: {
        tags: ['Banners'],
        summary: 'Get all banners',
        responses: { '200': { description: 'List of banners' }, '400': { description: 'Request failed' } }
      }
    },
    '/api/v1/banner_route/update/{bannerId}': {
      put: {
        tags: ['Banners'],
        summary: 'Update a banner by ID',
        parameters: [{ name: 'bannerId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/BannerInput' } } } },
        responses: { '200': { description: 'Banner updated' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/banner_route/delete/{bannerId}': {
      delete: {
        tags: ['Banners'],
        summary: 'Delete a banner by ID',
        parameters: [{ name: 'bannerId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Banner deleted' }, '404': { description: 'Banner not found' } }
      }
    },
    '/api/v1/brand_route/create': {
      post: {
        tags: ['Brands'],
        summary: 'Create a new brand',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/BrandInput' } } } },
        responses: { '201': { description: 'Brand created successfully' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/brand_route/getall': {
      get: {
        tags: ['Brands'],
        summary: 'Get all brands',
        responses: { '200': { description: 'List of brands' }, '400': { description: 'Request failed' } }
      }
    },
    '/api/v1/brand_route/update/{brandID}': {
      put: {
        tags: ['Brands'],
        summary: 'Update a brand by ID',
        parameters: [{ name: 'brandID', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/BrandInput' } } } },
        responses: { '200': { description: 'Brand updated' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/brand_route/delete/{brandID}': {
      delete: {
        tags: ['Brands'],
        summary: 'Delete a brand by ID',
        parameters: [{ name: 'brandID', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Brand deleted' }, '404': { description: 'Brand not found' } }
      }
    },
    '/api/v1/product_route/create': {
      post: {
        tags: ['Products'],
        summary: 'Create a new product',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Sample Product' },
                  description: { type: 'string', example: 'Product description' },
                  imageurl: { type: 'string', format: 'uri', example: 'https://example.com/product-image.jpg' },
                  categoryID: { type: 'number', example: 1 }
                },
                required: ['name', 'description', 'imageurl', 'categoryID']
              }
            }
          }
        },
        responses: { '201': { description: 'Product created' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/product_route/getall': {
      get: {
        tags: ['Products'],
        summary: 'Get all products',
        responses: { '200': { description: 'List of products' }, '400': { description: 'Request failed' } }
      }
    },
    '/api/v1/product_route/update/{productID}': {
      put: {
        tags: ['Products'],
        summary: 'Update a product by ID',
        parameters: [{ name: 'productID', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Updated Product Name' },
                  description: { type: 'string', example: 'Updated product description' },
                  imageurl: { type: 'string', format: 'uri', example: 'https://example.com/updated-image.jpg' },
                  categoryID: { type: 'number', example: 2 }
                }
              }
            }
          }
        },
        responses: { '200': { description: 'Product updated' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/product_route/delete/{productID}': {
      delete: {
        tags: ['Products'],
        summary: 'Delete a product by ID',
        parameters: [{ name: 'productID', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Product deleted' }, '404': { description: 'Product not found' } }
      }
    },
    '/api/v1/order_route/create': {
      post: {
        tags: ['Orders'],
        summary: 'Create a new order',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/OrderInput' } } } },
        responses: { '201': { description: 'Order created' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/order_route/getall': {
      get: {
        tags: ['Orders'],
        summary: 'Get all orders',
        responses: { '200': { description: 'List of orders' }, '400': { description: 'Request failed' } }
      }
    },
    '/api/v1/order_route/user/{userId}': {
      get: {
        tags: ['Orders'],
        summary: 'Get orders by user ID',
        parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Orders for the given user' }, '400': { description: 'Request failed' } }
      }
    },
    '/api/v1/order_route/update/{orderId}': {
      put: {
        tags: ['Orders'],
        summary: 'Update an order',
        parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/OrderInput' } } } },
        responses: { '200': { description: 'Order updated' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/order_route/delete/{orderId}': {
      delete: {
        tags: ['Orders'],
        summary: 'Delete an order',
        parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Order deleted' }, '404': { description: 'Order not found' } }
      }
    },
    '/api/v1/service_type/create': {
      post: {
        tags: ['Service Types'],
        summary: 'Create a new service type',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ServiceTypeInput' } } } },
        responses: { '201': { description: 'Service type created' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/service_type/getall': {
      get: {
        tags: ['Service Types'],
        summary: 'Get all service types',
        responses: { '200': { description: 'List of service types' }, '400': { description: 'Request failed' } }
      }
    },
    '/api/v1/service_type/get/{serviceTypeId}': {
      get: {
        tags: ['Service Types'],
        summary: 'Get a service type by ID',
        parameters: [{ name: 'serviceTypeId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Service type details' }, '404': { description: 'Service type not found' } }
      }
    },
    '/api/v1/service_type/update/{serviceTypeId}': {
      put: {
        tags: ['Service Types'],
        summary: 'Update a service type',
        parameters: [{ name: 'serviceTypeId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ServiceTypeInput' } } } },
        responses: { '200': { description: 'Service type updated' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/service_type/delete/{serviceTypeId}': {
      delete: {
        tags: ['Service Types'],
        summary: 'Delete a service type',
        parameters: [{ name: 'serviceTypeId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Service type deleted' }, '404': { description: 'Service type not found' } }
      }
    },
    '/api/v1/service_type/active': {
      get: {
        tags: ['Service Types'],
        summary: 'Get active service types',
        responses: { '200': { description: 'List of active service types' }, '400': { description: 'Request failed' } }
      }
    },
    '/api/v1/service_type/category/{categoryId}': {
      get: {
        tags: ['Service Types'],
        summary: 'Get service types by category',
        parameters: [{ name: 'categoryId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Service types for the given category' }, '400': { description: 'Request failed' } }
      }
    },
    '/api/v1/custom_request/create': {
      post: {
        tags: ['Custom Requests'],
        summary: 'Create a custom request',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CustomRequestInput' } } } },
        responses: { '201': { description: 'Custom request created' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/custom_request/getall': {
      get: {
        tags: ['Custom Requests'],
        summary: 'Get all custom requests',
        responses: { '200': { description: 'List of custom requests' }, '400': { description: 'Request failed' } }
      }
    },
    '/api/v1/custom_request/get/{requestId}': {
      get: {
        tags: ['Custom Requests'],
        summary: 'Get a custom request by ID',
        parameters: [{ name: 'requestId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Custom request details' }, '404': { description: 'Custom request not found' } }
      }
    },
    '/api/v1/custom_request/user/{userId}': {
      get: {
        tags: ['Custom Requests'],
        summary: 'Get custom requests by user ID',
        parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Matching custom requests' }, '400': { description: 'Request failed' } }
      }
    },
    '/api/v1/custom_request/servicetype/{serviceTypeId}': {
      get: {
        tags: ['Custom Requests'],
        summary: 'Get custom requests by service type',
        parameters: [{ name: 'serviceTypeId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Matching custom requests' }, '400': { description: 'Request failed' } }
      }
    },
    '/api/v1/custom_request/status/{status}': {
      get: {
        tags: ['Custom Requests'],
        summary: 'Get custom requests by status',
        parameters: [{ name: 'status', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Matching custom requests' }, '400': { description: 'Request failed' } }
      }
    },
    '/api/v1/custom_request/update/{requestId}': {
      put: {
        tags: ['Custom Requests'],
        summary: 'Update a custom request',
        parameters: [{ name: 'requestId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CustomRequestInput' } } } },
        responses: { '200': { description: 'Custom request updated' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/custom_request/update-status/{requestId}': {
      patch: {
        tags: ['Custom Requests'],
        summary: 'Update the status of a custom request',
        parameters: [{ name: 'requestId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { status: { type: 'string' } }, required: ['status'] } } } },
        responses: { '200': { description: 'Status updated' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/custom_request/add-images/{requestId}': {
      patch: {
        tags: ['Custom Requests'],
        summary: 'Add images to a custom request',
        parameters: [{ name: 'requestId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { imageUrls: { type: 'array', items: { type: 'string' } } }, required: ['imageUrls'] } } } },
        responses: { '200': { description: 'Images added' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/custom_request/delete/{requestId}': {
      delete: {
        tags: ['Custom Requests'],
        summary: 'Delete a custom request',
        parameters: [{ name: 'requestId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Custom request deleted' }, '404': { description: 'Custom request not found' } }
      }
    },
    '/api/v1/custom_request/urgent': {
      get: {
        tags: ['Custom Requests'],
        summary: 'Get urgent custom requests',
        responses: { '200': { description: 'Urgent custom requests' }, '400': { description: 'Request failed' } }
      }
    },
    '/api/v1/custom_request/search': {
      get: {
        tags: ['Custom Requests'],
        summary: 'Search custom requests',
        parameters: [{ name: 'q', in: 'query', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Search results' }, '400': { description: 'Invalid query' } }
      }
    },
    '/api/v1/custom_request/filter': {
      get: {
        tags: ['Custom Requests'],
        summary: 'Filter custom requests',
        parameters: [
          { name: 'userId', in: 'query', schema: { type: 'string' } },
          { name: 'serviceTypeId', in: 'query', schema: { type: 'string' } },
          { name: 'status', in: 'query', schema: { type: 'string' } },
          { name: 'urgency', in: 'query', schema: { type: 'string' } },
          { name: 'minBudget', in: 'query', schema: { type: 'number' } },
          { name: 'maxBudget', in: 'query', schema: { type: 'number' } }
        ],
        responses: { '200': { description: 'Filtered custom requests' }, '400': { description: 'Invalid request' } }
      }
    },
    '/api/v1/email/payment-successful': {
      post: {
        tags: ['Emails'],
        summary: 'Send payment successful email',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PaymentSuccessfulEmail' } } } },
        responses: { '200': { description: 'Email sent' } }
      }
    },
    '/api/v1/email/order-delivered': {
      post: {
        tags: ['Emails'],
        summary: 'Send order delivered email',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/OrderDeliveredEmail' } } } },
        responses: { '200': { description: 'Email sent' } }
      }
    },
    '/api/v1/email/welcome': {
      post: {
        tags: ['Emails'],
        summary: 'Send welcome email',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/WelcomeEmail' } } } },
        responses: { '200': { description: 'Email sent' } }
      }
    },
    '/api/v1/email/abandoned-cart': {
      post: {
        tags: ['Emails'],
        summary: 'Send abandoned cart reminder email',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/AbandonedCartEmail' } } } },
        responses: { '200': { description: 'Email sent' } }
      }
    },
    '/api/v1/payment_route/web': {
      post: {
        tags: ['Payments'],
        summary: 'Initiate a web payment',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { orderId: { type: 'string' }, amount: { type: 'number' } }, required: ['orderId', 'amount'] } } } },
        responses: { '200': { description: 'Payment initiated' }, '400': { description: 'Invalid request' }, '500': { description: 'Payment failed' } }
      }
    },
    '/api/v1/payment_route/zimswitch': {
      post: {
        tags: ['Payments'],
        summary: 'Initiate a ZimSwitch payment',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { orderId: { type: 'string' }, amount: { type: 'number' } }, required: ['orderId', 'amount'] } } } },
        responses: { '200': { description: 'Payment initiated' }, '400': { description: 'Invalid request' }, '500': { description: 'Payment failed' } }
      }
    },
    '/api/v1/payment_route/card': {
      post: {
        tags: ['Payments'],
        summary: 'Initiate a card payment',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { orderId: { type: 'string' }, amount: { type: 'number' } }, required: ['orderId', 'amount'] } } } },
        responses: { '200': { description: 'Payment initiated' }, '400': { description: 'Invalid request' }, '500': { description: 'Payment failed' } }
      }
    },
    '/api/v1/payment_route/mobile/ecocash': {
      post: {
        tags: ['Payments'],
        summary: 'Initiate an Ecocash payment',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { orderId: { type: 'string' }, amount: { type: 'number' }, phoneNumber: { type: 'string' } }, required: ['orderId', 'amount', 'phoneNumber'] } } } },
        responses: { '200': { description: 'Payment initiated' }, '400': { description: 'Invalid request' }, '500': { description: 'Payment failed' } }
      }
    },
    '/api/v1/payment_route/mobile/onemoney': {
      post: {
        tags: ['Payments'],
        summary: 'Initiate a OneMoney payment',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { orderId: { type: 'string' }, amount: { type: 'number' }, phoneNumber: { type: 'string' } }, required: ['orderId', 'amount', 'phoneNumber'] } } } },
        responses: { '200': { description: 'Payment initiated' }, '400': { description: 'Invalid request' }, '500': { description: 'Payment failed' } }
      }
    },
    '/api/v1/payment_route/mobile/telecash': {
      post: {
        tags: ['Payments'],
        summary: 'Initiate a Telecash payment',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { orderId: { type: 'string' }, amount: { type: 'number' }, phoneNumber: { type: 'string' } }, required: ['orderId', 'amount', 'phoneNumber'] } } } },
        responses: { '200': { description: 'Payment initiated' }, '400': { description: 'Invalid request' }, '500': { description: 'Payment failed' } }
      }
    },
    '/api/v1/payment_route/mobile/inbucks': {
      post: {
        tags: ['Payments'],
        summary: 'Initiate an InBucks payment',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { orderId: { type: 'string' }, amount: { type: 'number' }, phoneNumber: { type: 'string' } }, required: ['orderId', 'amount', 'phoneNumber'] } } } },
        responses: { '200': { description: 'Payment initiated' }, '400': { description: 'Invalid request' }, '500': { description: 'Payment failed' } }
      }
    },
    '/api/v1/payment_route/check-status': {
      post: {
        tags: ['Payments'],
        summary: 'Check payment status',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { pollUrl: { type: 'string' } }, required: ['pollUrl'] } } } },
        responses: { '200': { description: 'Payment status returned' }, '400': { description: 'Invalid request' }, '500': { description: 'Payment failed' } }
      }
    },
    '/api/v1/payment_route': {
      get: {
        tags: ['Payments'],
        summary: 'Get all payments',
        responses: { '200': { description: 'List of payments' }, '500': { description: 'Server error' } }
      }
    },
    '/api/v1/payment_route/{paymentId}': {
      get: {
        tags: ['Payments'],
        summary: 'Get a payment by ID',
        parameters: [{ name: 'paymentId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Payment details' }, '404': { description: 'Payment not found' }, '500': { description: 'Server error' } }
      },
      put: {
        tags: ['Payments'],
        summary: 'Update a payment',
        parameters: [{ name: 'paymentId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PaymentInput' } } } },
        responses: { '200': { description: 'Payment updated' }, '404': { description: 'Payment not found' }, '500': { description: 'Server error' } }
      },
      delete: {
        tags: ['Payments'],
        summary: 'Delete a payment',
        parameters: [{ name: 'paymentId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Payment deleted' }, '404': { description: 'Payment not found' }, '500': { description: 'Server error' } }
      }
    },
    '/api/v1/payment_route/order/{orderId}': {
      get: {
        tags: ['Payments'],
        summary: 'Get payments by order ID',
        parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Payments for the order' }, '500': { description: 'Server error' } }
      }
    },
    '/api/v1/payment_route/user/{userId}': {
      get: {
        tags: ['Payments'],
        summary: 'Get payments by user ID',
        parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Payments for the user' }, '500': { description: 'Server error' } }
      }
    },
    '/api/v1/payment_route/email/{email}': {
      get: {
        tags: ['Payments'],
        summary: 'Get payments by email',
        parameters: [{ name: 'email', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Payments for the email' }, '500': { description: 'Server error' } }
      }
    },
    '/api/v1/payment_route/phone/{phoneNumber}': {
      get: {
        tags: ['Payments'],
        summary: 'Get payments by phone number',
        parameters: [{ name: 'phoneNumber', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Payments for the phone number' }, '500': { description: 'Server error' } }
      }
    },
    '/api/v1/woo/products': {
      get: {
        tags: ['WooCommerce'],
        summary: 'Get WooCommerce products with pagination',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'perPage', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'tag', in: 'query', schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'WooCommerce products list' }, '500': { description: 'Request failed' } }
      }
    },
    '/api/v1/woo/products/{id}': {
      get: {
        tags: ['WooCommerce'],
        summary: 'Get a WooCommerce product by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'WooCommerce product details' }, '500': { description: 'Request failed' } }
      }
    },
    '/api/v1/woo/products/search': {
      get: {
        tags: ['WooCommerce'],
        summary: 'Search WooCommerce products',
        parameters: [
          { name: 'query', in: 'query', required: true, schema: { type: 'string' } },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'perPage', in: 'query', schema: { type: 'integer', default: 10 } }
        ],
        responses: { '200': { description: 'Search results' }, '500': { description: 'Request failed' } }
      }
    },
    '/api/v1/woo/products/category/{categoryId}': {
      get: {
        tags: ['WooCommerce'],
        summary: 'Get WooCommerce products by category',
        parameters: [
          { name: 'categoryId', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'perPage', in: 'query', schema: { type: 'integer', default: 10 } }
        ],
        responses: { '200': { description: 'Products for the category' }, '500': { description: 'Request failed' } }
      }
    },
    '/api/v1/woo/categories': {
      get: {
        tags: ['WooCommerce'],
        summary: 'Get WooCommerce categories',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'perPage', in: 'query', schema: { type: 'integer', default: 10 } }
        ],
        responses: { '200': { description: 'WooCommerce categories list' }, '500': { description: 'Request failed' } }
      }
    }
  }
};

module.exports = swaggerDefinition;
