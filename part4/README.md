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
Install *jest*'s intellisense in vscode
```
npm i -D @types/jest
```
Remember to name the test candidate file with postfix *.test.js*

Different between [toBe vs toEqual](https://stackoverflow.com/questions/22413009/jasmine-javascript-testing-tobe-vs-toequal)

`--runInBand` option prevent *jest* to run paralell ([document](https://jestjs.io/docs/cli))

Remember to set `NODE_ENV` variable when run project, note that for `NODE_ENV` to work in Windows we need to install *cross-env* module
```
npm install --save-dev cross-env
```

## Async/await in JS
> Warning: those blog is written in Vietnamese, you should look for another English explaination in internet.
[link](https://viblo.asia/p/giai-thich-ve-asyncawait-javascript-trong-10-phut-1VgZvBn7ZAw)

[more example](https://vuilaptrinh.com/2018-05-07-huong-dan-async-await-giai-thich-vi-du/)

To eliminate *catch* from async/await use `express-async-errors` module
```
npm install express-async-errors
```

### Promise.all
The `Promise.all` method can be used for transforming an array of promises into a single promise, that will be fulfilled once **every** promise in the array passed to it as a parameter is resolved.

`Promise.all` executes the promises it receives in **parallel**. If the promises need to be executed in a particular order, this will be problematic. In situations like this, the operations can be executed inside of a `for...of` block, that guarantees a specific execution order.