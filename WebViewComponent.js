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
} = React;

var NavigationBar = require('./NavigationBar');
var LoadingPage = require('./LoadingPage');
var WebViewAndroid = require('react-native-webview-android');

class WebViewComponent extends Component{
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
        <WebViewAndroid
          url={this.props.url}
          javaScriptEnabled={true}
          geolocationEnabled={false}
          builtInZoomControls={false}
          style={{flex:1}}
        />
      </View>
    );
  }

}
var styles = StyleSheet.create({

});

module.exports = WebViewComponent;
