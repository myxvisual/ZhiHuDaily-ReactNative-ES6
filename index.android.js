import React, {
  AppRegistry,
  Navigator,
  Component
} from 'react-native';
const Dimensions = require('Dimensions');
const PixelRatio = require('PixelRatio');
const {width,height} = Dimensions.get('window');
const StatusBarAndroid = require('react-native-android-statusbar');

const ZhiHuDaily = require('./ZhiHuDaily');
const ZhiHuDailyCover = require('./ZhiHuDailyCover');
const AppWebView = require('./AppWebView');
const WebViewComponent = require('./WebViewComponent');

StatusBarAndroid.setHexColor('#000000');
const BaseConfig = Navigator.SceneConfigs.FloatFromRight;
const CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  snapVelocity: 8,
  edgeHitWidth: width,
});
const CustomSceneConfig = Object.assign({}, BaseConfig, {
  springTension: 180,
  springFriction: 8,
  gestures: {
    pop: CustomLeftToRightGesture,
  }
});

class App extends Component {
  AppScene(route,navigator) {
    switch (route.id) {
      case 'ZhiHuDailyCover':
      return <ZhiHuDailyCover navigator={navigator} />
      case 'ZhiHuDaily':
      return <ZhiHuDaily navigator={navigator} />
      case 'AppWebView':
      return <AppWebView navigator={navigator} data={route.data} />
      case 'WebViewComponent':
      return <WebViewComponent navigator={navigator} url={route.url} />
    }
  }

  _configureScene(route) {
    return CustomSceneConfig;
  }

  render() {
    return (
      <Navigator
          initialRoute={{id:'ZhiHuDailyCover'}}
          renderScene={this.AppScene.bind(this)}
          configureScene={(route) => Navigator.SceneConfigs.FadeAndroid}
      />
    );
  }
}

AppRegistry.registerComponent('RNZhiHuDaily', () => App);
