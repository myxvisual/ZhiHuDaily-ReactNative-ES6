'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio');
var Platform = require('Platform');
var {width,height} = Dimensions.get('window');

var{
  Navigator,
  Component,
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing,
} = React;

var COVER_URL = 'http://news-at.zhihu.com/api/4/start-image/1080*1776';

class ZhiHuDailyCover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CoverImage : null,
      CoverText: null,
      animatedCover: new Animated.Value(0),
    }
  }

  componentWillMount(){
    this.fetchCover();
    Animated.timing(
      this.state.animatedCover,
      {
        toValue:1,
        duration:3000,
        easing: Easing.sin(),
      }
    ).start();

    let navigator = this.props.navigator;
    setTimeout(
      () => {navigator.replace({
        id:'ZhiHuDaily'
      })
    }, 3000)
  }

  fetchCover(){
    fetch(COVER_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          CoverImage:responseData.img,
          CoverText:responseData.text,
        })
      })
      .done();
  }

  render() {
    var TextMarginTop=-60;
    return(
      <View style={styles.Container}>
        <Animated.Image
          style={[styles.CoverImage,{marginTop:TextMarginTop},{
            transform:[
              {scale:this.state.animatedCover.interpolate({
                inputRange:[0,1],
                outputRange:[1,1.1],
              })},
            ]}]}
            source={{uri:this.state.CoverImage}}
            />
          <View style={{marginTop:TextMarginTop}}>
          <Text style={{color:'#fff',fontSize:16,}}>
            {this.state.CoverText}
          </Text>
        </View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  Container:{
    backgroundColor:'#eee',
    height:height,
    width:width,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
  },
  CoverImage:{
    width:width,
    height:height,
  },
});

module.exports = ZhiHuDailyCover;
