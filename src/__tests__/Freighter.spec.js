'use strict';

jest.autoMockOff();

describe('Freighter', function() {

  var React = require('react/addons');
  var keyMirror = require('react/lib/keyMirror');
  var TestUtils = React.addons.TestUtils;

  var Freighter = require('./../index');
  var LCARS = require('lcars');
  var CargoBay = require('cargo-bay');
  var merge = require('amp-merge');
  var TestStoreData;
  var TestStore;
  var TestComponent;
  var component;

  var TestConstants = keyMirror({
    DemoActions: {
      SET_AGE: null
    }
  });

  var TestActionCreator = {
    updateAge: function(data){
      LCARS.dispatch({
        type: TestConstants.DemoActions.SET_AGE,
        data: data
      });
    }
  };

  beforeEach(function() {
    TestStoreData = {
      _data: {
        name: 'Bob',
        age: 1
      },
      clonedData: function() {
        return JSON.parse(JSON.stringify(this._data));
      }
    };
    var _setAge = function(age){
      var data = TestStoreData.clonedData();
      data.age = age;
      TestStoreData._data = data;
      return TestStoreData.clonedData();
    };
    TestStore = merge(CargoBay, {
      getDataFromStore: function(){
        return TestStoreData.clonedData();
      }
    });
    TestStore.dispatchToken = LCARS.register(function(action){
      switch (action.type){
        case TestConstants.DemoActions.SET_AGE:
          _setAge(action.data.age);
          TestStore.emitChange();
          break;
      }
    });
    TestComponent = React.createClass({
      mixins: [Freighter],
      stores: [TestStore],
      getStateFromStores: function(){
        return TestStore.getDataFromStore();
      },
      handleIncrementAge: function(){
        var age = React.addons.update(this.state, {$merge: {age: this.state.age + 1}});
        TestActionCreator.updateAge(age);
      },
      render: function(){
        return (
          <div>
            <div ref="testData">{this.state.age}</div>
          </div>
        );
      }
    });
    component = TestUtils.renderIntoDocument(<TestComponent />);
  });

  it('Adding `stores: [TestStore]` will lest us listen to changes in our stores and update state ', function(){
    spyOn(component, 'setState');
    component.handleIncrementAge();
    expect(component.setState).toHaveBeenCalled();
  });

  it('continuous to update age by calling `handleIncrementAge`', function(){
    component.handleIncrementAge();
    component.handleIncrementAge();
    component.handleIncrementAge();
    component.handleIncrementAge();
    component.handleIncrementAge();
    component.handleIncrementAge();
    expect(TestStore.getDataFromStore().age).toEqual(7);
  });

});