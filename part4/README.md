## Testing library

> `Jest` is a natural choice for this course, as it works well for testing backends, and it shines when it comes to testing React applications

Install `jest`
```
npm install --save-dev jest
```

Config `jest` for testing in *package.json*
```JavaScript
{
  "scripts": {
    ...
    "test": "jest --verbose"
  },
  "jest": {
    "testEnvironment": "node"
  }
}
```