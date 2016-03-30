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
  ScrollView
} = React;

var NavigationBar = require('./NavigationBar');
var LoadingPage = require('./LoadingPage');

var PIXELRATIO = PixelRatio.get();
var HEADER_SIZE = 200;

class AppWebView extends Component{
  constructor(props) {
    super(props);
    this.state = {
      webViewData: {},
      webViewBody: null,
      scrollValue: new Animated.Value(0)
    }
  }

  componentWillMount() {
    this.fetchStory();
  }

  render() {
    var story = this.state.webViewData;
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <WebView
          source={{ html: this.state.webViewBody }}
          javaScriptEnabled={true}
          style={{flex:1,marginTop:-160}} />
        <View style={{position:'absolute',left:0,top:0,}}>
          <NavigationBar navigator={this.props.navigator} index={false} />
        </View>
        {/*<Animated.View style={{position:'absolute',left:0,top:0,}}>
          <Image
            style={{height:200,width:360,}} source={{uri:story.image}} />
          <Text>{story.title}</Text>
        </Animated.View>*/}
      </View>
    );
  }

    fetchStory(){
      fetch('http://news-at.zhihu.com/api/4/news/'+this.props.data.id)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            webViewData:responseData,
            webViewBody:
              '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="'
              +responseData.css
              +'"></head><body>'
              +responseData.body+'</body></html>',
          })
        })
        .done();
    }
}

var styles = StyleSheet.create({

});

module.exports = AppWebView;
