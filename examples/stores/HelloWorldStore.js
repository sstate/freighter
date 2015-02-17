'use strict';

var LCARS = require('lcars');
var CargoBay = require('cargo-bay');
var HelloWorldConstants = require('./../constants/HelloWorldConstants');
var merge = require('amp-merge');

var HelloWorldData = {
  _data: {
    name: "Bob",
    age: undefined
  },
  clonedData: function() {
    return JSON.parse(JSON.stringify(this._data));
  }
};

var _setAge = function(age){
  var data = HelloWorldData.clonedData();
  data.age = age;
  HelloWorldData._data = data;
  return HelloWorldData.clonedData();
};

var HelloWorldStore =  merge(CargoBay, {
  getDataFromStore: function(){
    return HelloWorldData.clonedData();
  }
});

HelloWorldStore.dispatchToken = LCARS.register(function(action){
  console.log("test", action)
  switch (action.type){
    case HelloWorldConstants.DemoActions.SET_AGE:
      _setAge(action.data.age);
      HelloWorldStore.emitChange();
      break;
  }
});

module.exports = HelloWorldStore;
