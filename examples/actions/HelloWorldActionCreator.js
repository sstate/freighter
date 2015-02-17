'use strict';
var LCARS = require('lcars');
var CargoBay = require('cargo-bay');
var HelloWorldConstants = require('./../constants/HelloWorldConstants');

var HelloWorldActionCreator = {
  updateAge: function(data){
    LCARS.dispatch({
      type: HelloWorldConstants.DemoActions.SET_AGE,
      data: data
    })
  }
};

module.exports = HelloWorldActionCreator;
