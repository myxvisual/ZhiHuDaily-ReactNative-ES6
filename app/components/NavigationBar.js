import React, {
  Component,
  PropTypes,
  StyleSheet,
  View,
  Text,
  TextInput,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';
import getStyles from '../styles/components/NavigationBar';
let SCREEN_WIDTH = Dimensions.get('window').width;
let styles = getStyles(SCREEN_WIDTH);
const ButtonMargin = {marginLeft: 12};
const API_BINGSEARCH = 'https://www.baidu.com/s?wd=site%3Adaily.zhihu.com%20';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: null,
      AnimatedSearchBar: new Animated.Value(0)
    }
  }

  clearText() {
    this._textInput.setNativeProps({text: ''});
  }

  openSearch() {
    Animated.timing(
      this.state.AnimatedSearchBar,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.bounce,
        delay: 0
      }
    ).start();
    this._textInput.focus()
  }

  closeSearch() {
    Animated.timing(
      this.state.AnimatedSearchBar,
      {
        toValue: 0,
        duration: 300,
        easing: Easing.bounce,
        delay: 0
      }
    ).start()
  }

  render() {
    const navigator = this.props.navigator;
    const leftButton = this.props.index ?
      (<TouchableOpacity
        style={ButtonMargin}
        onPress={() => this.props.openMyDrawer(null)}>
        <Text style={styles.IconFont}>
          menu
        </Text>
      </TouchableOpacity>) :
      (<TouchableOpacity
        style={ButtonMargin}
        onPress={() => navigator.pop()}>
        <Text style={styles.IconFont}>
          keyboard_arrow_left
        </Text>
      </TouchableOpacity>);
    const marginLeftinterpolate = this.state.AnimatedSearchBar.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -SCREEN_WIDTH]
    });

    return (
      <View onLayout={(event) => {
              SCREEN_WIDTH = event.nativeEvent.layout.width;
              styles = getStyles(SCREEN_WIDTH)}} >
        <View style={styles.Container}>
          <Animated.View
            style={[styles.SearchBarClose, {marginLeft: marginLeftinterpolate}]}>
            {leftButton}
            <View style={{flexDirection: 'row', flexWrap: 'nowrap'}}>
              <TouchableOpacity
                style={ButtonMargin}
                onPress={() => this.openSearch()} >
                <Text style={[styles.IconFont, {marginRight: 12}]}>
                  search
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={ButtonMargin} >
                <Text style={styles.IconFont}>
                  more_vert
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <Animated.View
            style={styles.SearchBarOpen}>
            <View style={{flexDirection: 'row', flexWrap: 'nowrap',
            alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                this.closeSearch();
                dismissKeyboard();
              }} >
              <Text style={{color: '#BFBFBF', fontFamily: 'MaterialIcons-Regular', fontSize: 24}}>
                close
              </Text>
            </TouchableOpacity>
            <TextInput
              ref={component => {this._textInput = component}}
              style={styles.SearchBar}
              placeholder={'搜索更多日报...'}
              placeholderTextColor ={'#BFBFBF'}
              underlineColorAndroid={'#fff'}
              value={this.state.searchString}
              onChangeText={(text) => this.setState({
                searchString: text})} />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigator.push({
                  id: 'WebViewScreen', url: `${API_BINGSEARCH}${this.state.searchString}`});
                dismissKeyboard();
                this.clearText();
                this.closeSearch();
              }}>
              <Text style={{color: '#BFBFBF', fontFamily: 'MaterialIcons-Regular', fontSize: 24}}>
                search
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }
}

NavigationBar.propTypes = {
  navigator: PropTypes.object.isRequired,
  index: PropTypes.bool.isRequired,
  openMyDrawer: PropTypes.func
}
