# library-management-system

    This is a library managment API Backend for the management of users and the books

# Routes and the Endpoints

# /users

GET : Get all the list of users in the system
POST : Create/Register a new user

## /users{id}

GET : Get a user by their ID
PUT : Updating a user by their ID
DELETE : Delating user by their ID(Check if the user still has an issued book) && {is there any fine/penalty to be collacted}

## /user/subscription-details/{id}

GET : Get a user subscription details by their ID >> Date of subscription >> Valid till ? >> Fine if any ?

## /books

GET: Get all the books in the system
POST: Add a new book to the system

## /books{id}

GET: Get a book by its ID
PUT: Update a book by its ID
DELETE: Delete a book by its ID

## /books/issued

GET: Get all the issued books

## /books/issued/withFine

GET: Get all issued books with their fine amount

### subscription Types

    >> Basic(3 months)
    >> Standard (6 months)
    >> Premimum (12 months)

> > If a user missed the renewal date,then user should be collected with $100

> > If a user missed his subscription, then user is expected to pay $100

> > If user misses both the renewal & subscription , then the collected amount should be $200

## Commands to start:

npm init
npm i express
npm i nodemon --save-dev
npm run dev

To restore node module and package-lock.json --> npm i/npm install