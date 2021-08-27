# Lecture Note

## Create new backend project

First, init a project with following command

```
npm init
```

After run command and answer all the question, node create new config file *package.json*

Install ExpressJS for create server, nodemon (dev dependencies) for debug:
```
npm install express
npm install --save-dev nodemon
```

Add new command to *script* field in *package.json* for run project, debug project
```JavaScript
{
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
}
```

Create *index.js* for deploy app, content of *index.js* will look like below:
```JavaScript
const http = require('http')

// route and middleware

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

## ESLint

ESLint is used for standardlize coding style. Run this code to install ESLint:
```
npm install eslint
```

To init coding style rule we go to *node_modules/.bin* directory an run following command:
```
eslint --init
```

To check if a file has wrong coding style:
```
eslint <file-name>
```

To fix wrong coding style in file:
```
eslint --fix <file-name>
```