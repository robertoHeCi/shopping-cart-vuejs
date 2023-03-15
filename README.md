# Solution explanation:

The application division 

I've followed a folder structure that attempts to create a maintainable and scalable application. I have used the ports and adapters architecture, to divide the application responsabilities into layers:

- **src/models**: 
  Classes that defines the structure of the diferents parts of the application( products, promotions, discounts and product position)
  the ProductPosition model is the relationship between the product, the quantity and the price with the discounts and promotions applied.
  These classes allow you to build the Application Store implemented by a library called VuexORM, which allow you to define store in objects and work with them by using Object-Relational-mapping

- **src/ports**:
    These files allows you to connect the domain classes with the adapters. Yo can change the adapter, but the domain continues working. It allows the dependency inversion.

- **src/adapters**:
  These files implements Interfaces methods and are related to a library. You must have an adapter to work with third-party libraries

- **src/domain**:
  This is the business logic layer. Here, we define the different functions that have specific requirements related to how to interact with the different actors in the application( how to calculate the promotions, how to calculate the total prices, create a product in the shopping cart...)

- **src/containers**:
  Here we are going to implements the domain classes, executing functions when events occur

- **src/repositories**:
  These classes allow you to create repositories to get data.
  These classes have a port in their constructor, that allows it to connect to an adapter, who execute third-party functions to get data

- **src/assets/img**: Images used in the application

- **src/assets/scss**: 
  In this folder are included the application styles. I have divided the main.css following the SMACSS guide-line, that has differents rules to build an scalable and mainteinable styles across the application. 

- **src/components**: 
  Here whe have of the presentation layer, with components that receive data and emit event to comunicate with their parents

- **src/pages**:
  This files are the components that will be loaded in the different application routes

- **src/tests**: 
  In this folder, are included some files to tests some functionalities
 
- **src/main.js**
  Js entry point where should be defined the vue application parts (router, store...)
 
- **src/router.js**
  In this file are defined the application routes
 
- **src/server.js**:
  This file is used to run application in heroku
 
- **src/store.js**:
  In this file are declared the models that belongs to Vuex

- **src/jest.config.js**:
  In this file is defined the unit-tests configuration

- **src/webpack.config.js**:
  In this file, are defined the rules to transpile and minimice the application files

# Application commands

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Execute unit-test
```
npm run unit-test
```
### Deployed website
[Access to deployed app ](https://shopping-cart-vuejs.herokuapp.com/)
