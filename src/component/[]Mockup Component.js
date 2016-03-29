'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions')
var PixelRatio = require('PixelRatio');
var Platform = require('Platform');
var AppHeight = require('Dimensions').get('window').height;
var AppWidth = require('Dimensions').get('window').width;

var RouteMapper = require('./RouteMapper');

var{
  Component,
  Navigator,
  StyleSheet,
  ListView,
  ScrollView,
  WebView,
  View,
  Text,
  TextInput,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableHighlight,
} = React;

class ClassName extends Component{
  constructor(props:any) {
    super(props);
    this.state = {
      AnimatedValue01: new Animated.Value(0),
    };
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
        navigator={this.props.navigator}
        navigationBar={
          <Navigator.NavigationBar
            style={[styles.NavigationBar]}
            routeMapper={RouteMapper} />
        } />
      );
    }

  renderScene(route,navigator) {
    return (
      <View style={styles.Container}>
        <Text style={styles.MainTittle}>HHH! This is Fun</Text>
        <Text style={styles.MainText}>Let us go back to mainpage</Text>
        <TouchableOpacity style={styles.Button} onPress={this.BackPage.bind(this)} activeOpacity={.5}>
          <Text style={styles.ButtonText}>Let's Back!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  BackPage(){
    this.props.navigator.pop();
  }

  _Animation01() {
    this.state.bounceValue.setValue(0);
    Animated.timing(
      this.state.bounceValue,
      {
        toValue: 1,
        duration:500,
        easing:Easing.bounce(2),
      }
    ).start();
  }
  /*
  spring: 基础的单次弹跳物理模型，符合Origami设计标准
  friction: 控制“弹跳系数”、夸张系数，默认为7.
  tension: 控制速度，默认40。
  decay: 以一个初始速度开始并且逐渐减慢停止。
  velocity: 起始速度，必填参数。
  deceleration: 速度衰减比例，默认为0.997。
  timing: 从时间范围映射到渐变的值。
  duration: 动画持续的时间（单位是毫秒），默认为500。
  easing：一个用于定义曲线的渐变函数。阅读Easing模块可以找到许多预定义的函数。iOS默认为Easing.inOut(Easing.ease)。
  delay: 在一段时间之后开始动画（单位是毫秒），默认为0。
  */

}

var styles = StyleSheet.create({
  Container:{
    backgroundColor:'#e3e3e3',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  MainTittle:{
    fontSize:28,
    color:'#75cd37',
    textAlign:'center',
    fontWeight:'bold'
  },
  MainText:{
    fontSize:14,
    color:'#75cd37',
    textAlign:'left',
    justifyContent:'center',
    alignItems:'flex-start'
  },
  Button:{
    height:28,
    backgroundColor:'#75cd37',
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center',
    margin:16,
    padding:2
  },
  ButtonText:{
    color:'#e3e3e3',
    fontSize:24,
    fontWeight:'bold',
  },
  NavigationBar:{
    backgroundColor:'#75cd37',
    flex:1,
    height:36,
    alignItems:'stretch',
  },
});

module.exports = ClassName;
