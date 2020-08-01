# auth
Authentication service for the ballometer server with json web tokens.

## Installation

Create a file called ```./settings.json``` and fill it with:

```json
{
    "secret": "your-jwt-secret",
    "port": 3000,
    "saltRounds": 10
}
```

The ```secret``` is used to sign the json web token, ```port``` is the port where the server runs, and ```saltRounds``` is used by bcrypt to hash passwords.

Create a users file ```./users.json``` and populate it with your users:

```json
[
    {
        "username": "john",
        "hash": "$2b$10$wuzj/D1bQNGCFILsp7C97.CaAO3T5SSIgfc1oqCse72O2ctdw8CwW",
        "role": "admin"
    }, 
    {
        "username": "anna",
        "hash": "$2b$10$4wD3/1.sAggLX4Wx.73XMu5aabxz29UpXQNuhMN.g8g9FWxjARxfu",
        "role": "member"
    }
]
```

Run:
```bash
npm install
```

Start the service with:
```bash
node index.js
```

## Usage

To  **add** a new user you need to hash the password and add an entry in ```users.json```. To get the hash of a password do a POST request to the ```/hash``` endpoint with a json body of the form 

```json
{
    "password": "plainTextPassword"
}
```
and you get a response with the hash:
```json
{
    "hash": "$2b$10$4wD3/1.sAggLX4Wx.73XMu5aabxz29UpXQNuhMN.g8g9FWxjARxfu"
}
```

To **authenticate** a user and receive a json web token you can POST to the ```/login``` endpoint with a json body of the form 

```json 
{
    "username": "anna", 
    "password": "plainTextPassword"
}
```

If the user exists and the password is correct the response will be a jwt of the form:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFubmEiLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNTk2Mjg4OTY5fQ.ehhVm1lHZ903GVXZAakrU-AmhBgnGcfjDsNqRq6b4fE"
}
```
where the payload translates to:
```json
{
  "username": "anna",
  "role": "member",
  "iat": 1596288969
}
```
