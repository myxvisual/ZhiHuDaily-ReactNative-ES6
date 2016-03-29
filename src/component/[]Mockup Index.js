'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio');
var AppHeight = require('Dimensions').get('window').height;
var AppWidth = require('Dimensions').get('window').width;

var SplashPage = require('./SplashPage');
var LoginPage = require('./LoginPage');
var MainPage = require('./MainPage');
var NewsDetail = require('./NewsDetail');

var {
  AppRegistry,
  Navigator,
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var BaseConfig = Navigator.SceneConfigs.FloatFromRight;
var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  snapVelocity: 8,
  edgeHitWidth: AppWidth,
});
var CustomSceneConfig = Object.assign({}, BaseConfig, {
  springTension: 85,
  springFriction: 8,
  gestures: {
    pop: CustomLeftToRightGesture,
  }
});

class App extends Component{
  AppScene(route,navigator){
    switch (route.id) {
      case 'SplashPage':
      return <SplashPage navigator={navigator} />
      case 'MainPage':
      return <MainPage navigator={navigator} />
      case 'LoginPage':
      return <LoginPage navigator={navigator} />
    }
  }

  _configureScene(route) {
    return CustomSceneConfig;
  }

  render() {
    return (
      <Navigator
          initialRoute={{id:'SplashPage',name:'SplashPage'}}
          renderScene={this.AppScene.bind(this)}
          configureScene={this._configureScene

        }
      />
    );
  }
}

AppRegistry.registerComponent('ProjectName', () => App);
