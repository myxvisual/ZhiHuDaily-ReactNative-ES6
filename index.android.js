import React, {
  AppRegistry,
  Navigator,
  Dimensions,
  Component
} from 'react-native';
import StatusBarAndroid from 'react-native-android-statusbar';

import ZhiHuDailyCover from './app/components/ZhiHuDailyCover';
import ZhiHuDailyIndex from './app/components/ZhiHuDailyIndex';
import AppWebView from './app/components/AppWebView';
import WebViewComponent from './app/components/WebViewComponent';

const { width } = Dimensions.get('window');

StatusBarAndroid.showStatusBar();
StatusBarAndroid.setHexColor('#000000');
const BaseConfig = Navigator.SceneConfigs.FloatFromRight;
const CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  snapVelocity: 8,
  edgeHitWidth: width
});
const CustomSceneConfig = Object.assign({}, BaseConfig, {
  springTension: 180,
  springFriction: 8,
  gestures: {
    pop: CustomLeftToRightGesture
  }
});

class APP extends Component {
  AppScene(route, navigator) {
    switch (route.id) {
    case 'ZhiHuDailyCover':
      return <ZhiHuDailyCover navigator={navigator} />
    case 'ZhiHuDailyIndex':
      return <ZhiHuDailyIndex navigator={navigator} />
    case 'AppWebView':
      return <AppWebView navigator={navigator} data={route.data} />
    case 'WebViewComponent':
      return <WebViewComponent navigator={navigator} url={route.url} />
    default:
      return <ZhiHuDailyCover navigator={navigator} />
    }
  }

  _configureScene(route) {
    return CustomSceneConfig;
  }

  render() {
    return (
      <Navigator
          initialRoute={{ id: 'ZhiHuDailyCover' }}
          renderScene={this.AppScene.bind(this)}
          configureScene={(route) => this._configureScene(route)} />
    );
  }
}

AppRegistry.registerComponent('RNZhiHuDaily', () => APP);
