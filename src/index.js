'use strict';

var Freighter = {

  getInitialState: function(){
    return this.getStateFromStores();
  },

  componentDidMount: function(){
    if (!this.stores){
      throw new Error("You must have a stores array property on your React class while using the Freighter mixin");
    }
    this.stores.forEach(function(store){
      store.addChangeListener(this.handleStoresChanged)
    }, this);
  },

  componentWillUnmount: function(){
    this.stores.forEach(function(store){
      store.removeChangeListener(this.handleStoresChanged)
    }, this);
  },

  handleStoresChanged: function(){
    if (this.isMounted()) {
      this.setState(this.getStateFromStores());
    }
  }

};

module.exports = Freighter;