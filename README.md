# MERN-start

Mongo-Express-React-Node

## Initial GitHub Setup

1. Create a new repository
2. Initialize with readme
3. Include Node for gitignore
4. Clone app locally

## Create Your Server

1. `touch server.js`
2. `npm init -y`
3. `npm install express dotenv`
4. Build out basic server.js with the following elements:

```js
require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
```

## React App Setup

1. Inside the root of your project, run `create-react-app client`
2. Install concurrently as a dev dependency: `npm install -D concurrently`
3. Add the following script to the package.json of your root:

```json
"dev": "concurrently \"nodemon server.js\" \"cd client && npm run start\""
```

4. Navigate to client/package.json
5. Add the following proxy:

```json
"proxy": "http://localhost:3001",
```

## Heroku Deploy

1. Include the following scripts inside your server package.json

```json
    "install": "cd client && npm install",
    "build": "cd client && npm run build",
    "heroku-postbuild": "npm run build"
```
