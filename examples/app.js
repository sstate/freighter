'use strict';

var React = require('react/addons');
var Freighter = require('./../src/index');
var HelloWorldStore = require('./stores/HelloWorldStore');
var HelloWorldActionCreator = require('./actions/HelloWorldActionCreator');

var HelloWorld = React.createClass({

  mixins: [Freighter],

  stores: [HelloWorldStore],

  getStateFromStores: function(){
    return HelloWorldStore.getDataFromStore();
  },

  handleSubmit: function(e){
    e.preventDefault();
    //There are better ways to handle forms :)
    var age = this.refs.age.getDOMNode().value.trim();
    HelloWorldActionCreator.updateAge(React.addons.update(this.state, {$merge: {age: age}}));
    this.refs.age.getDOMNode().value = '';
  },

  render: function () {
    return (
      <div>
        <p>Hello {this.state.name}, I am {this.state.age ? this.state.age : '__blank__'} years old.</p>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="age" type="text" name="age" ref="age" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
});

React.render(<HelloWorld />, document.getElementById('example'));
