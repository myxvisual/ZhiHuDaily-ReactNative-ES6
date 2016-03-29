'use strice';

var React = require('react-native');
var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio');
var Platform= require('Platform');
var AppHeight = require('Dimensions').get('window').height;
var AppWidth = require('Dimensions').get('window').width;

var RouteMapper = require('./RouteMapper');

var {
  Navigator,
  Component,
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  TouchableHighlight,
  TouchableOpacity,
} = React;

class NewsPage extends Component {
  constructor(props:any) {
    super(props);
    this.state = {
      AnimatedValue01: new Animated.Value(1),
    };
  }

  render(){
    return(
      <Navigator
        renderScene={this.renderScene.bind(this)}
        navigator={this.props.navigator}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.NavigationBar}
            routeMapper={RouteMapper} />}
      />
    )
  }

  renderScene(route,navigator){
    var interpolateColorAnimation =  this.state.AnimatedValue01.interpolate({
      inputRange:[1,2],
      outputRange:[
        'rgb(48,143,255)','rgb(121,232,88)']
    });

    return(
      <Animated.View style={[styles.Container,{}]}>
        <View style={[styles.Card]}>
          <TouchableOpacity
            style={styles.Button}
            onPressIn={() => {
              Animated.spring(
                this.state.AnimatedValue01,
                {
                  toValue: 2,
                  tension:200,
                  friction:8,
                }
              ).start();
              }}
            onPressOut={() =>{
              Animated.spring(
                this.state.AnimatedValue01,
                {
                  toValue: 1,
                  tension:200,
                  friction:8,
                }
              ).start();
              }}
            >
            <Text style={[styles.MainTitle,styles.ButtonText]}>
              This A Animation BON!!
            </Text>
          </TouchableOpacity>
          <Animated.View
            style={[{backgroundColor:interpolateColorAnimation},{
              transform:[
                {rotate:this.state.AnimatedValue01.interpolate({
                  inputRange: [1, 2],
                  outputRange: [
                    '0deg', '360deg'],
                })},
                {scale:this.state.AnimatedValue01.interpolate({
                  inputRange: [1, 2],
                  outputRange: [
                    0.5, 1]
                })},
              ]}
          ]}>
            <Text
              style={styles.MainTitle}
              onPress={() =>
                this.props.navigator.push({
                  id:'MainPage',
                  name:'MainPage',
                })
              }>
            Click Me To Go Next Page
            </Text>
          </Animated.View>
        </View>
      </Animated.View>
    )
  }

}

var styles = StyleSheet.create({
  Container:{
    backgroundColor:'#e7e7e7',
    width:AppWidth,
    height:AppHeight,
    alignItems:'center',
    justifyContent:'flex-start',
    padding:50,
  },
  Card:{
    backgroundColor:'#fff',
    width:AppWidth-12,
    height:200,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:4,
    borderColor:'#ddd',
    borderWidth:1/3,
  },
  NavigationBar:{
    backgroundColor:'#75cd37',
    height:36,
  },
  Column:{
    backgroundColor:'#ececec',
  },
  Row:{
    backgroundColor:'#ececec',
  },
  MainTitle:{
    fontSize:24,
    color:'#fff',
    fontWeight:'400',
    textAlign:'center',
  },
  TextAlignCenter:{
    textAlign:'center',
  },
  Button:{
    backgroundColor:'#339dff',
    borderRadius:4,
    padding:2,
  },
  ButtonText:{
    color:'#e7e7e7',
  }
});

module.exports = NewsPage;
