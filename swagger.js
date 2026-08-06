const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Shopton Backend API',
    version: '1.0.0',
    description: 'Swagger documentation for the Shopton backend services, including banners, products, orders, payments, service types, custom requests, emails, and WooCommerce integrations.'
  },
  servers: [
    {
      url: 'http://localhost:4071',
      description: 'Local development server'
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
  paths: {
    '/api/v1/banner_route/create': {
      post: {
        tags: ['Banners'],
        summary: 'Create a new banner',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
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
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
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
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
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
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
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
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
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
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
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
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
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
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
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
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
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
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
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
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
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
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
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
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
        responses: { '200': { description: 'Email sent' } }
      }
    },
    '/api/v1/email/order-delivered': {
      post: {
        tags: ['Emails'],
        summary: 'Send order delivered email',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
        responses: { '200': { description: 'Email sent' } }
      }
    },
    '/api/v1/email/welcome': {
      post: {
        tags: ['Emails'],
        summary: 'Send welcome email',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
        responses: { '200': { description: 'Email sent' } }
      }
    },
    '/api/v1/email/abandoned-cart': {
      post: {
        tags: ['Emails'],
        summary: 'Send abandoned cart reminder email',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
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
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
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
