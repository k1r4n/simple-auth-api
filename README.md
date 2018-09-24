# simple-auth-api
Simple User Create, Login, Forgot and Rest API with Nodejs

## clone

```
git clone git@github.com:k1r4n/simple-auth-api.git
```

## installation

### docker

```
docker run -t -i --rm -v $(pwd):/data  -w /data node:slim sh -c 'apt-get update && apt-get install -y build-essential && apt-get install -y python && npm install'
```

### non docker

```
npm install
```

## running 

### docker

```
docker run -t -i --rm --env-file=config/config.env -v $(pwd):/data  -w /data node:slim node index.js
```

### non dokcer

need to add `export` before env variables in `config/config.env`

```
source config/config.env
node index.js
```

## api documentation

Expecting api is run in local network

### create

method :- POST

url :-
```
http://localhost:8000/create
```

body :-
x-www-form-urlencoded
```
email: user@company.ext
name: firstName lastName
password: non-empty string
```

### login

method :- POST

url :-
```
http://localhost:8000/login
```

body :-
x-www-form-urlencoded
```
email: user@company.ext
password: non-empty string
```

Output :- token

### logout

method :- GET

url :-
```
http://localhost:8000/logout
```

header :- 
```
Authorization :- login Output token
```
### forgot passowrd

method :- PUT

url :-
```
http://localhost:8000/forgot_password
```

body :-
x-www-form-urlencoded
```
email: user@company.ext
password: non-empty string
```

### reset passowrd

method :- PUT

url :-
```
http://localhost:8000/reset_passowrd
```

body :-
x-www-form-urlencoded
```
email: user@company.ext
password: non-empty string
```

