'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio');
var Platform = require('Platform');
var AppHeight = require('Dimensions').get('window').height;
var AppWidth = require('Dimensions').get('window').width;

var {
  Navigator,
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  Easing,
  TouchableHighlight,
  TouchableOpacity,
} = React;

class SplashPage extends Component{
  constructor(props: any) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }

  render() {
    return (
      <View style={styles.Container}>
        <Animated.Image
          source={require('./src/images/Logo.png')}
          style={{
            alignItems:'center',
            width:1024/3,
            height:924/3,
            transform:[
              {
                scale:this.state.bounceValue,
                rotateY:this.state.RoateTionValue}
            ]
          }}
        />
        <Text style={[styles.MainTitle]}>Cook By myxvisual</Text>
      </View>
    );
  }

  componentWillMount() {
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 1,
        friction:3,
        tension:200,
      }
    ).start();

    let navigator = this.props.navigator;
    setTimeout(
      () => {navigator.push({
        id:'LuanchScreen',name:'LuanchScreen'
      });
    },2000)
  }

}

var styles = StyleSheet.create({
  Container:{
    backgroundColor:'#3fa9f6',
    height:AppHeight,
    width:AppWidth,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  Image:{
    alignItems:'center',
    width:1024 / 3,
    height:924 / 3,
  },
  MainTitle:{
    fontSize: 18,
    fontWeight:'500',
    textAlign:'center',
    margin:20,
    color:'#fff',
  }
});

module.exports = SplashPage;
