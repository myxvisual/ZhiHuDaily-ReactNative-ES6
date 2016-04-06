import React, {
  Component,
  StyleSheet,
  View,
  WebView,
  Animated,
  PropTypes,
  Dimensions
} from 'react-native';

import NavigationBar from '../components/NavigationBar';
import LoadingPage from '../components/LoadingPage';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class StoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webViewData: {},
      loading: true,
      scrollValue: new Animated.Value(0)
    }
  }

  componentWillMount() {
    this.fetchStory();
  }

  fetchStory() {
    fetch(`http://news-at.zhihu.com/api/4/news/${this.props.url}`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          webViewData: responseData,
          loading: false
        })
      })
      .done();
  }

  render() {
    if (this.state.loading) {
      return (
         <LoadingPage tittle="知乎" />
      )
    }
    const story = this.state.webViewData;
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <NavigationBar navigator={this.props.navigator} index={false} />
        <WebView
          source={{ html: `
            <!DOCTYPE html>
            <html>
              <head>
                <link rel="stylesheet" type="text/css" href="${story.css}">
              </head>
              <body>
                <div style="
                  background-image: url('${story.image}');
                  background-size: cover;
                  background-position: center;
                  width: 100%;
                  height: 400px;
                  z-index: 999;
                  position: relative">
                </div>
                <div style="margin-top:-200px">
                  ${story.body}
                </div>
              </body>
            </html>` }}
          javaScriptEnabled
          style={{flex: 1}} />
      </View>
    );
  }
}

StoryScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
  url: PropTypes.number.isRequired
}
