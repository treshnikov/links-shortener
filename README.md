# Links shortener app
## Overview
This app was developed as a part of exploring MERN stack.
The app supports: 
- JWT authentication.
- Storing user information in MongoDB.
- Shortening links.
- Resolving shortened links to full ones.
## How to build and run
- Check and set up configuration variables at `config/default.json` for development and `config/production.json` for production.
- To run in development mode, perform scripts:
    ```bash
    npm i
    npm run client:install
    npm run dev 
    ```
- For production:
    ```bash
    npm i
    npm run client:install
    npm run client:build
    npm run start
    ```