'use strict';

var React = require('react-native');

var{
  StyleSheet,
  View,
  Text,
  image,
  TouchableOpacity,
  Component,
  Navigator
} = React;

class DrawerLayout extends Component{
  render() {
    return (
      <View style={styles.Container}>
        <Text style={styles.MainTitle}>I am DrawerLayout</Text>
      </View>
    );
  }
}

styles = StyleSheet.create({
  Container:{
    backgroundColor:'#3ff657'
  },
  MainTitle:{
    fontSize:34,
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold'
  }
});

module.exports = DrawerLayout;
