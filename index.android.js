import React, {
  AppRegistry,
  Navigator,
  Dimensions,
  Component
} from 'react-native';
import StatusBarAndroid from 'react-native-android-statusbar';

import LuanchScreen from './app/screens/LuanchScreen';
import HomeScreen from './app/screens/HomeScreen';
import StoryScreen from './app/screens/StoryScreen';
import WebViewScreen from './app/screens/WebViewScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;

StatusBarAndroid.showStatusBar();
StatusBarAndroid.setHexColor('#000000');
const BaseConfig = Navigator.SceneConfigs.FloatFromRight;
const CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  snapVelocity: 8,
  edgeHitWidth: SCREEN_WIDTH
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
    case 'LuanchScreen':
      return <LuanchScreen navigator={navigator} />
    case 'HomeScreen':
      return <HomeScreen navigator={navigator} />
    case 'StoryScreen':
      return <StoryScreen navigator={navigator} url={route.url} />
    case 'WebViewScreen':
      return <WebViewScreen navigator={navigator} url={route.url} />
    default:
      return <LuanchScreen navigator={navigator} />
    }
  }

  _configureScene(route) {
    return CustomSceneConfig;
  }

  render() {
    return (
      <Navigator
          initialRoute={{id: 'LuanchScreen'}}
          renderScene={this.AppScene}
          configureScene={(route) => this._configureScene(route)} />
    );
  }
}

AppRegistry.registerComponent('RNZhiHuDaily', () => APP);
