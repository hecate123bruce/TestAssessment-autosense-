# SOULTRAIN HOME ASSESSMENT

## HOSTING URL

https://autosense-test-api.vercel.app

## API Documentation

### **OverView**

The Autosense Test Assessment API provides REST API endpoints for simple actions for a users. This document provides an overview of the available endpoints and their functionality

### **Base Url**

    https://autosense-test-api.vercel.app/api/v1

### **Responses**

All responses are returned in the JSON format - `application/json`.

### **Endpoints**

- `POST /users`

  Create a new user

  **Request**

  | Field       | Type   | Validation      | Comment  |
  | ----------- | ------ | --------------- | -------- |
  | email       | string | Email Format    | required |
  | firstName   | string |                 | required |
  | lastName    | string |                 | required |
  | phoneNumber | string | Phone Format    | required |
  | address     | string | Address Formart | required |
  | password    | string |                 | required |

      {
        "email": "testCase@gmail.com",
        "firstName": "First Test Name",
        "lastName": "Last Test Name",
        "phoneNumber": "+358 13843824",
        "address": "street A Country",
        "password": "123456"
      }

  **Response**

  Code `200`: A new user create success and returns created user information

        {
          "message": "Success",
          "data": {
            "email": "testCase@gmail.com",
            "password": "$2b$10$n.DHCFBo47JyMzWk6BXgOOtFVHBk2ko4alH0SU7At6mtB1FOEsuy6",
            "firstName": "First Test Name",
            "lastName": "Last Test Name",
            "phoneNumber": "+358 13843824",
            "address": "street A Country",
            "_id": "658a9cfb4687dccc723c3889",
            "__v": 0
          }
        }

  Code `400`: Bad request error and returns reason

      {
        "message": [
          "Email is not correct",
          "Email domain is not valid",
          "Password is required",
          "First Name is required",
          "Last Name is required",
          "Phone Number is required",
          "Address is required"
        ]
      }

- `POST /users/login`

  Login user

  **Request**

  | Field    | Type   | Validation   | Comment  |
  | -------- | ------ | ------------ | -------- |
  | email    | string | Email Format | required |
  | password | string |              | required |

      {
        "email": "testCase@gmail.com",
        "password": "123456"
      }

  **Response**

  Code `200`: user login success and return token and logined user data

      {
        "message": "Success",
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGE5Y2ZiNDY4N2RjY2M3MjNjMzg4OSIsImVtYWlsIjoidGVzdENhc2VAZ21haWwuY29tIiwiaWF0IjoxNzAzNTgzOTEzLCJleHAiOjE3MDM1ODU3MTN9.B8vGVb_eE0-rGa91u680Fdah1oI3bGFbjZBtmZ_vDhQ",
        "user": {
          "email": "testCase@gmail.com",
          "firstName": "First Test Name",
          "lastName": "Last Test Name",
          "phoneNumber": "+358 13843824",
          "address": "street A Country"
        }
      }

  Code `400`: Bad request error and returns reason

      {
        "message": [
          "Email is not correct"
        ]
      }

- `POST /users/update`

  Update user

  **Request**

  | Field       | Type   | Validation      | Comment  |
  | ----------- | ------ | --------------- | -------- |
  | firstName   | string |                 | required |
  | lastName    | string |                 | required |
  | phoneNumber | string | Phone Format    | required |
  | address     | string | Address Formart | required |

      {
        "firstName": "updated Name",
        "lastName": "updated Name(Last)",
        "phoneNumber": 179382465,
        "address": "walga"
      }

  **Response**

  Code `200`: user update success and return updated user data

      {
        "message": "Success",
        "data": {
          "_id": "658339dbb8f737533674624b",
          "email": "testCase@gmail.com",
          "password": "$2b$10$q019bzJ9jfG2ZyyUJmiouefHQLgCRmhUQfS4rmhKFhRUPcWjs6u92",
          "firstName": "updated Name",
          "lastName": "updated Name(Last)",
          "phoneNumber": "179382465",
          "address": "walga",
          "__v": 0
        }
      }

  Code `400`: Bad request error and returns reason

      {
        "message": [
          "First Name is required",
          "Last Name is required",
          "Phone Number is required",
          "Address is required"
        ]
      }

- `GET /users/me`

  Check user authentication.

  **Response**

  Code `200`: Get authenticated user data

      {
        "message": "Success",
        "data": {
          "_id": "658339dbb8f737533674624b",
          "email": "testCase@gmail.com",
          "password": "$2b$10$q019bzJ9jfG2ZyyUJmiouefHQLgCRmhUQfS4rmhKFhRUPcWjs6u92",
          "firstName": "updated Name",
          "lastName": "updated Name(Last)",
          "phoneNumber": "179382465",
          "address": "walga",
          "__v": 0
        }
      }

  Code `400`: Bad request error and returns reason

      {
        "message": "UNAUTHORIZED"
      }

- `DELETE /users`

  Delete a user

  **Response**

  Code `200`: Returns deleted user information

      {
        "message": "Success",
        "data": {
          "_id": "658339dbb8f737533674624b",
          "email": "testCase@gmail.com",
          "password": "$2b$10$q019bzJ9jfG2ZyyUJmiouefHQLgCRmhUQfS4rmhKFhRUPcWjs6u92",
          "firstName": "updated Name",
          "lastName": "updated Name(Last)",
          "phoneNumber": "179382465",
          "address": "walga",
          "__v": 0
        }
      }

  Code `404`: User not found

      {
        "message": "User not found"
      }

## Development

    git clone https://github.com/Sharplancer/soultrain-test.git
    cd autosense-backend
    npm install
    npm start

## Deployment

The APIs are deployed Vercel.

## Technical Documentation

### **Technologies**

- TypeScript
- Node.js
- Express
- MongoDB

### **Infrastructure**

    |- src
      |- config
      |- consts
      |- controllers                  // endpoint handlers
        |- users                      // users endpoint handlers
          |- createUser               // handler for creating new user
          |- getUser                  // handler for getting a single user
          |- loginUser                // handler for login user
          |- updateUser               // handler for updating user
          |- deleteUser               // handler for deleting user
      |- errors                       // customize errors
      |- middlewares
        |- errorHandlerMiddleware     // a middleware to handle errors
      |- models
        |- userModel                  // userSchema for DB
      |- routes                       // endpoint routes
        |- userRouter                 // routes for user endpoint
      |- services                     // the service directly interacts with DB
        |- userService                // userService contains proper actions for user collection
      |- setup
        |- backendSetup               // run backend server
        |- databaseSetup              // connect database
      |- types
      |- utils

### Technical Approaches

### Implement a robust error handling approach

Used a Error-handling Middleware: This middleware is used to handle errors in the application and is defined like any other middleware, except it takes an additional argument to handle errors. `src/middlewares/errorHandler.middleware.ts`.

In `backend.setup.ts`,

    ...
    app.use(errorHandlerMiddleware);
    ...

And each handler in controller is wrapped with an errorHandlerWrapper (`src/errorHandler.wrapper.ts`). It catches errors and hands over to the next function. It is passed into error-handling middleware and returns response the with the status by Error type.

Defined custom errors mainly uas 2 variables (errorCode and reasonCode)

### Encrypt the password before create a new user in DB

Using `mongoose` ODM library for Node.js and MongoDB. Used `mongoose` middleware to encrypt user's password before save it. Encryption was done using `bcrypt`.
