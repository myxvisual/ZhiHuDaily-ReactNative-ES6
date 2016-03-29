'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio');
var AppHeight = require('Dimensions').get('window').height;
var AppWidth = require('Dimensions').get('window').width;

var ComponentFileName = require('./ComponentFileName');
var RouteMapper = require('./RouteMapper');

var {
  Component,
  StyleSheet,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} = React;

class MyClassName extends Component{
  render() {
    return (
      <Image source={require('./Folder/Image.png')} />
      <View>
        <Text>Test</Text>
      </View>
    );
  }
}

componentWillMount(){

}
componentDidMount(){

}
var styles = StyleSheet.create({
  Container:{
    backgroundColor:'#5ef63f'
  },
  MainTittle:{
    fontSize:18,
    color:'#fff',
    fontWeight:,
    textAlign:'center,left,right',
    fontFamily:'MaterialIcons-Regular',
  },
  MainText:{
    fontSize:18,
    color:'#fff',
    fontWeight:'normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'
    textAlign:'center,left,right',
    letterSpacing:12,
    lineHeight:12,
    textAlign:'auto','left','right','center','justify'
  },
  Image:{
    width:40,
    height:40,
    resizeMode:'cover','contain','stretch'
  },
  Button:{
    width:40,
    height:40,
    backgroundColor:'#bebebe',
    borderColor:'#42ff44',
    borderWidth:3,
    borderRadius:3,
    opacity:1,
    overflow:'visible',
    shadowColor:'#000',
    shadowOffset:{width:3,height:3},
    shadowOpacity:1,
  },
  FlexBox:{
    margin:5,
    padding:5,
    flexDirection:'row','column',
    flexWrap:'wrap','nowrap',
    justifyContent:'flex-start','flex-end','center','space-between','space-around',
    alignItems:'flex-start', 'flex-end', 'center', 'stretch'，
  },
  FlexItmes:{
    flex:1,
    margin:5,
    padding:5,
    position:'absolute', 'relative',
    alignSelf:'auto', 'flex-start', 'flex-end', 'center', 'stretch'，
  }
});

module.exports = MyClassName;
