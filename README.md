# Insta - Clone

Simplified clone of Instagram app with its basic functionalities, e.g. creating
profile, adding posts, liking, commenting.

## Installation

Clone repository into your local machine, then install dependencies, both in
backend and client folders:

```bash
cd insta-clone
cd backend
npm install
cd..
cd client
npm install
```

### Connection with MongoDB

Establishing connection with MongoDB is necessary for this app to work. In order
to do that, visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), create
an account and launch your database. Don't forget to whitelist your IP adress!

### Environment variables

In order to work properly, this app needs a .env file with **two** variables in
the backend folder. Examples:

_MONGO_URI=mongodb+srv://<username>:<password>@insta.eexs2.mongodb.net/<dbname>?retryWrites=true&w=majority_
\_SECRET_TOKEN=G324f2sdaF2ggasd

First variable is obtained from your just created database and is responsible
for establishing connection to it. **Clusters --> Connect --> Connect to your
application**

Second one might be a random string, which will help hashing users' passwords.

## Usage

Once installation is completed, you may run the app:

```bash
cd backend
npm start
```

Site is also live, you may visit it [here](https://insta-clone37.netlify.app/).
