# IEP API

## Setup

    yarn install

### Dev

    yarn dev

#### or

    yarn start

### build prod

    yarn build

### test
    yarn test

### Swagger Doc

-   Launch API
-   In browser access: URL:PORT/api-docs

## Project structure

    |
    |- config
        |- default.ts : exports env variables in an object
    |- src
        |- server.ts : entry point to the API
        |- app.ts : app config
        |- swagger.ts : API docs
    	|- routes.ts : main routes
    	|- controller : endpoints 
        |- db
        |- logger
        |- middleware
        |- schema
        |- middleware
        |- models
        |- service
    	|- shared
