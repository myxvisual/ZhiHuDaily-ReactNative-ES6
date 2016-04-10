import React, {
  AppRegistry,
  Navigator,
  Dimensions,
  Component,
  StatusBar,
  View
} from 'react-native';

import LuanchScreen from './app/screens/LuanchScreen';
import HomeScreen from './app/screens/HomeScreen';
import StoryScreen from './app/screens/StoryScreen';
import WebViewScreen from './app/screens/WebViewScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;


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
    let statusBar = <StatusBar backgroundColor={'hsl(0, 0%, 0%)'}
                               translucent={false}
                               barStyle={'light-content'} />;
    switch (route.id) {
    case 'LuanchScreen':
      return (
        <View>
          {statusBar}
          <LuanchScreen navigator={navigator} />
        </View>
      )
    case 'HomeScreen':
      return <HomeScreen navigator={navigator} themes={route.themes} />
    case 'StoryScreen':
      return <StoryScreen navigator={navigator} url={route.url} />
    case 'WebViewScreen':
      return <WebViewScreen navigator={navigator} url={route.url} />
    default:
      return <LuanchScreen navigator={navigator} />
    }
  }

  configureScene() {
    return CustomSceneConfig;
  }

  render() {
    return (
      <Navigator
          initialRoute={{id: 'LuanchScreen'}}
          renderScene={this.AppScene}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid} />
    );
  }
}

AppRegistry.registerComponent('RNZhiHuDaily', () => APP);
