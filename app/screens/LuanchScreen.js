import React, {
  PropTypes,
  Component,
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';
import Dimensions from 'Dimensions';

const { width, height } = Dimensions.get('window');
const COVER_URL = 'http://news-at.zhihu.com/api/4/start-image/1080*1776';

export default class LuanchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CoverImage: null,
      CoverText: null,
      animatedCover: new Animated.Value(0)
    }
  }

  componentDidMount() {
    this.fetchCover();
  }

  fetchCover() {
    fetch(COVER_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          CoverImage: responseData.img,
          CoverText: responseData.text
        });
        Animated.timing(
          this.state.animatedCover,
          {
            toValue: 1,
            duration: 3000,
            easing: Easing.sin,
            delay: 0
          }
        ).start();

        setTimeout(
        () => {
          this.props.navigator.replace({
            id: 'HomeScreen'
          })
        }, 3000)
      })
    .done();
  }

  render() {
    const TextMarginTop = -60;
    return (
      <View style={styles.Container}>
        <Animated.Image
          style={[styles.CoverImage, { marginTop: TextMarginTop }, {
            transform: [
              {scale: this.state.animatedCover.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1]
              })}
            ]}]}
            source={{uri: this.state.CoverImage}} />
          <View style={{ marginTop: TextMarginTop }}>
          <Text style={{ color: '#fff', fontSize: 16 }}>
            {this.state.CoverText}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#eee',
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  CoverImage: {
    width: width,
    height: height
  }
});

LuanchScreen.propTypes = {
  navigator: PropTypes.object.isRequired
}
