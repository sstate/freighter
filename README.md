# Freighter

![Freighter](http://i.imgur.com/ZRQ6ZnA.jpg)

A flux storage mixin for reactjs components. This helps you bind your storage updates to your react classes and a DRY way. Please check out the `examples` directory.

#### Install

`npm install freighter`

#### Use

This works with facebook's flux implementation/api, and in turn, works with both [lcars](https://www.npmjs.com/package/lcars) and [cargo-bay](https://www.npmjs.com/package/cargo-bay) work really nice with this mixin.

freighter is a small mixin, and the [source](https://github.com/sstate/freighter/blob/master/src/index.js) should be easy
to digest.

When your component mounts, we add store event listeners to listen for store updates.

You are assumed to implement a [getStateFromStores](https://github.com/sstate/freighter/blob/master/examples/app.js#L14)
method and an [array](https://github.com/sstate/freighter/blob/master/examples/app.js#L12) listing the stores you want
to watch for updates on, in your Reactjs class.

#### In practice

The best way to use this mixin is to implement a function in your store that will return your component state.

'''

getStateFromStores: function(){
  return HelloWorldStore.getDataFromStore();
},

'''

You can see the example of [HelloWorldStore.getDataFromStore()](https://github.com/sstate/freighter/blob/master/examples/stores/HelloWorldStore.js#L26).

```
var HelloWorldStore =  merge(CargoBay, {
  getDataFromStore: function(){
    return HelloWorldData.clonedData();
  }
});
```

#### Purpose

We were implementing this same flow in a lot of our react classes throughout our flux application. This allowed to be DRY.


#### Run examples

```
npm install

npm run examples
```

#### Run tests

```
npm install

npm test
```