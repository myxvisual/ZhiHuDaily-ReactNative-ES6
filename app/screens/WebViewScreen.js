'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio');
var {height,width} = Dimensions.get('window');

var {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  WebView,
  Animated,
  Easing,
  WebView
} = React;

var NavigationBar = require('../components/NavigationBar');
var LoadingPage = require('../components/LoadingPage');

class WebViewScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={{flex:1,flexDirection:'column'}}>
        <View style={{paddingTop:0}}>
          <NavigationBar navigator={this.props.navigator} index={false} />
        </View>
        <WebView
          source={{uri: this.props.url, method: 'GET'}}
          javaScriptEnabled={true}
          style={{flex: 1}}
        />
      </View>
    );
  }

}
var styles = StyleSheet.create({

});

module.exports = WebViewScreen;
