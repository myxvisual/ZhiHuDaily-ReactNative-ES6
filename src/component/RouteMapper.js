'use strict';

var React = require('react-native');
var AppWidth = require('Dimensions').get('window').width;

var {
  Component,
  StyleSheet,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var RouteMpper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <View style={styles.RouteMapper}>
        <TouchableOpacity
          onPress={() => navigator.parentNavigator.pop()}>
          <Text style={styles.Back}>
            keyboard_arrow_left
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigator.parentNavigator.replace({id:'LoginPage',name:'LoginPage'})}>
          <Text style={styles.Tittle}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigator.parentNavigator.push({id:'SplashPage',name:'SplashPage'})}>
          <Text style={styles.Next}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
  Title(route, navigator, index, navState) {
    return null;
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
};

var styles = StyleSheet.create({
  Back:{
    fontFamily:'MaterialIcons-Regular',
    color: '#fff',
    fontSize:36,
    fontWeight:'200',
    textAlign:'center',
  },
  Tittle:{
    color: '#fff',
    fontSize:18,
    fontWeight:'600',
    textAlign:'center',
  },
  Next:{
    color: '#fff',
    fontSize:14,
    fontWeight:'200',
    textAlign:'center',
  },
  RouteMapper:{
    flexDirection:'row',
    height:36,
    width:AppWidth,
    justifyContent:'space-between',
    paddingRight:10,
    alignItems:'center',
  },
});

module.exports = RouteMpper;
