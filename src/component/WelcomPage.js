/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ProgressBarAndroid,
  navigator,
  ToolbarAndroid
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3cc3fe',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color:'#fff'
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  Button:{
    margin:5,
    backgroundColor:'#fff',
    color:'#3cc3fe',
    fontSize:18,
    borderRadius:4
  }
});

var Welcom = React.createClass({
  render: function() {
        var initialRoute = {name: 'search'};
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
        欢迎来到react native 的世界
        </Text>
        <Text style={styles.instructions}>
          学会Emca javascript 就能写App
        </Text>
        <Text style={styles.instructions}>
          这是个神器，能让设计师燃起来的新架构
        </Text>
        <TouchableHighlight style={styles.Button} underlayColor='#fff'>
          <Text style={styles.Button}>
          进入新世界 Get new skills >>>
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
});

module.exports = Welcom;
