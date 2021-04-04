# htsuGrupo4
<img src='https://raw.githubusercontent.com/nuwe-io/files_storage/main/Hacks/Demium/HTS2.png' />
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#testing">Testing</a></li>

  </ol>
</details>

### Built With

* [Express](https://expressjs.com/)

### Prerequisites

* npm

``` sh
  npm install npm@latest -g
```

* a mongoDB instance running

### Installation

1. Clone the repo

``` sh
   git clone https://github.com/robredomedina/htsuGrupo4
```

2. Install NPM packages

``` sh
    npm i
```

3. Create a .env file outside the src folder and set up the following enviroment variables:

``` sh
    NODE_ENV
    TOKEN_SECRET
    DB_CONN_STR
    GITHUB_CLIENT_ID
    GITHUB_CLIENT_SECRET
    BEARER_TOKEN
```

where you want NODE_ENV to be set to development, TOKEN_SECRET to be a sha to be used by jwt and DB_CONN_STR the connection string to your mongo database. The github variables are necessary for the github Oauth and BEARER_TOKEN is necessary to authorize jest tests.

4. Start the server with NPM:

``` sh
    npm start
```

## Usage 

<h2> Preview </h2>
<p align="justify">

    The API is set to the port 5000. It can be changed in the config.js in the config folder. All the endpoints except those needed for authentification  are protected by custom middleware and will ask for an authentification token wich can be obtained in a successful login with github.<br/>
    

</p>

<h2>Client</h2>
<p align="justify">
  The client model has the "Name", "Lastname" string attributes. It also has a "Latitude", "Longitude", "Hotspot_Asteroids", "Price" and "Age" as Number attributes. All of them are required. Hotspot_Asteroids and Price are derived from its other attributes.
  
  

``` sh
   get('/api/clients/')
  ```

  This returns a list of all clients.

  

``` sh
    post('/api/clients/addList')
  ```

  Introduces an array of clients in the database. It expects an object with the array nested inside a "newClients".

``` sh
    get('/api/clients/:id')
    patch('/api/clients/:id')
    delete('api/clients/:id')
```

This three endpoints read, update and delete the client with the id passed in the parameter.
</p>

<h2>Oauth</h2>
<p align="justify">

``` sh
  post('/api/oauth/github')
```
This is the github login endpoint. It will redirect to a github login page. On successful login it will redirect to a done message and return the auth token in a cookie.


</p>

<h2> PHA(Potentially harmful asteroid) </h2>

<p align='justify'>
  The asteroid model has the "a", "e", "i", "om", "w", "am", "Latitude", "Longitude", fields, all of them numbers, in addition to a "full_name" string.  All of its fields are required. The Latitude and Longitude are derived from its other attributes. It has the following exposed endpoints:

  ``` sh
    post('/api/pha/add')
  ```
  This endpoint will add an asteroid to the database. It expects an object with all the asteroids fields except Latitude and Longitude.

  ```sh
    get('/api/pha/findAll')
  ```
  This returns a list of all asteroids.

  ``` sh
    post('/api/pha/addList')
  ```
  This endpoint adds a list of asteroids to the database. It expects an array of asteroids.

  ``` sh
    get('/api/pha/find/:PHAName')

  ```
    This endpoint returns the asteroid with the name passed in the PHAName parameter.

    ``` sh
        patch('/api/pha/update/:PHAId')
        delete('/api/pha/remove/:PHAId')
    ```
    These endpoints will update and delete the asteroid with the indicated id respectively.
</p>


## Testing
<p align="justify">
Unitary testing is done with jest and supertest. A bearer token is necessary to bypass the route protections, as indicated in the previous section. It is done in a local instance of mongo, in the 27017 port.
</p>