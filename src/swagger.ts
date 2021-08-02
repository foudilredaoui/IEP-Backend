export default {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Medeo API ',
    description: '',
  },
  host: `localhost:1337`,
  basePath: '/api/v1',
  tags: [
    {
      name: 'Test',
      description: 'API for test system',
    },
  ],
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/examples': {
      post: {
        tags: ['Test'],
        description: 'test',
        parameters: [
          {
            name: 'test',
            in: 'body',
            description: '',
            schema: {
              $ref: '#/definitions/Test',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Example created successfully',
            schema: {
              type: 'object',
              properties: {
                message: 'string',
                data: 'object',
              },
            },
          },
          409: {
            description: 'Object with these information does exist',
            schema: {
              type: 'object',
              properties: {
                message: 'string',
                data: 'object',
              },
            },
          },
        },
      },
    },
    '/user': {
      get: {
        tags: ['user'],
        description: 'Get all Users',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Fetched successfully',
            schema: {
              type: 'object',
              properties: {
                message: 'string',
                data: 'object',
              },
            },
          },
        },
      },
      post: {
        tags: ['user'],
        description: 'create user',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'user',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'user created successfully',
            schema: {
              type: 'object',
              properties: {
                message: 'string',
                data: 'object',
              },
            },
          },
        },
      },
    },
    '/user/:id': {
      get: {
        tags: ['user'],
        description: 'Get a single user',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'user fetched successfully',
            schema: {
              type: 'object',
              properties: {
                message: 'string',
                data: 'object',
              },
            },
          },
          401: {
            description: 'User does not exist',
            schema: {
              type: 'object',
              properties: {
                message: 'string',
                data: 'object',
              },
            },
          },
          404: {
            description: 'Video not found',
            schema: {
              type: 'object',
              properties: {
                message: 'string',
                data: 'object',
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            schema: {
              type: 'object',
              properties: {
                message: 'string',
                data: 'object',
              },
            },
          },
        },
      },
    },
    '/hobbies/:userId': {
      post: {
        tags: ['hobbies'],
        description: 'create hobbies',
        parameters: [
          {
            in: 'path',
            name: 'userId',
            required: true,
            schema: {
              $ref: '#/definitions/Hobbies',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'hobbies created successfully',
            schema: {
              type: 'object',
              properties: {
                message: 'string',
                data: 'object',
              },
            },
          },
        },
      },
    },
    '/hobbies/:userId/:id': {
      delete: {
        tags: ['hobbies'],
        description: 'delete a hobbies given',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              $ref: '#/definitions/Hobbies',
            },
          },
          {
            in: 'path',
            name: 'userId',
            required: true,
          },
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'hobbies removed successfully',
            schema: {
              type: 'object',
              properties: {
                message: 'string',
                data: 'object',
              },
            },
          },
          404: {
            description: 'Object with these information does not exist',
            schema: {
              type: 'object',
              properties: {
                message: 'string',
                data: 'object',
              },
            },
          },
          500: {
            description: 'ERROR: Object not deleted',
            schema: {
              type: 'object',
              properties: {
                message: 'string',
                data: 'object',
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    User: {
      required: ['name'],
      properties: {
        name: {
          type: 'string',
        },
        hobbies: {
          type: 'array',
        },
      },
    },
    Hobbies: {
      required: ['passionLevel', 'name', 'year'],
      properties: {
        passionLevel: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        year: {
          type: 'number',
        },
      },
    },
    Response: {
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
        },
      },
    },
  },
};
