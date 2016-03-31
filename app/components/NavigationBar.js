'use strict';

var React = require('react-native');

var {
  Component,
  Navigator,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
} = React;

var ButtonMargin = {marginLeft:12,};
var API_BINGSEARCH = 'https://www.baidu.com/s?wd=site%3Adaily.zhihu.com%20';
var dismissKeyboard = require('dismissKeyboard');

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString:null,
      AnimatedSearchBar: new Animated.Value(0),
    }
  }

  render() {
    var navigator = this.props.navigator;
    var leftButton = this.props.index ?
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
    var marginLeftinterpolate = this.state.AnimatedSearchBar.interpolate({
      inputRange:[0,1],
      outputRange:[0,-350]
    });

    return (
      <View style={{height:50,flexDirection:'row',width:360,backgroundColor:'#00AAFF',alignItems:'center',}}>
        <Animated.View style={[styles.Container,{marginLeft:marginLeftinterpolate,}]}>
          {leftButton}
          <TouchableOpacity
            style={ButtonMargin}
            onPress={() => this.openSearch()} >
            <Text style={[styles.IconFont,{marginLeft:240}]}>
              search
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ButtonMargin} >
            <Text style={styles.IconFont}>
              more_vert
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{width:340,height:36,backgroundColor:'#fff',borderRadius:2,flexDirection:'row',alignItems:'center',justifyContent:'space-around',}}
          >
          <TouchableOpacity
            onPress={() => {
              this.closeSearch();
              dismissKeyboard();
            }} >
            <Text style={{color:'#BFBFBF',fontFamily:'MaterialIcons-Regular',fontSize:24,}}>
              close
            </Text>
          </TouchableOpacity>
          <TextInput
            ref={component => this._textInput = component}
            style={styles.SearchBar}
            placeholder={'搜索更多日报...'}
            placeholderTextColor ={'#BFBFBF'}
            underlineColorAndroid={'#fff'}
            value={this.state.searchString}
            onChangeText={(text) => this.setState({
              searchString:text})}
          />
          <TouchableOpacity
            onPress={() => {
              navigator.push({id:'WebViewScreen',url:API_BINGSEARCH+this.state.searchString});
              dismissKeyboard();
              this.clearText();
              this.closeSearch();
            }}>
            <Text style={{color:'#BFBFBF',fontFamily:'MaterialIcons-Regular',fontSize:24,}}>
              search
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  clearText(){
    this._textInput.setNativeProps({text:''});
  }

  openSearch(){
    Animated.timing(
      this.state.AnimatedSearchBar,
      {
        toValue:1,
        duration:300,
        easing:Easing.bounce,
        delay:0,
      }
    ).start();
  }

  closeSearch(){
    Animated.timing(
      this.state.AnimatedSearchBar,
      {
        toValue:0,
        duration:300,
        easing:Easing.bounce,
        delay:0,
      }
    ).start();
  }

}

var styles = StyleSheet.create({
  Container:{
    width:360,
    paddingLeft:0,
    height:50,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  SearchBar:{
    color:'#BFBFBF',
    height:36,
    width:260,
    borderColor:'#BFBFBF',
    borderWidth: 1,
    fontSize:14,
  },
  IconFont:{
    fontFamily:'MaterialIcons-Regular',
    color: '#fff',
    fontSize:24,
    fontWeight:'200',
    textAlign:'center',
  },
});

module.exports = NavigationBar;
