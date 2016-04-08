import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import ThemeList from './ThemeList';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class DrawerView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{width: SCREEN_WIDTH * 0.7, backgroundColor:'#FAFAFA', height: SCREEN_HEIGHT}} onMouseDown >
        <Image style={{width:SCREEN_WIDTH * 0.7,height:SCREEN_WIDTH * 0.3,flexDirection:'column',justifyContent:'space-between',}} source={require('../images/Material-225.jpg')} >
          <View style={{backgroundColor:'#fff',height:80,width:80,borderRadius:80,marginTop:20,marginLeft:12,}}></View>
          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{marginLeft:20,color:'#fff',fontSize:14,fontWeight:'bold',}}>请登录</Text>
            <Text style={{marginRight:20,color:'#fff',fontSize:24,fontFamily:'MaterialIcons-Regular',}}>arrow_drop_down</Text>
          </View>
        </Image>
        <View style={{flexDirection:'column'}}>
          <TouchableOpacity style={{flexDirection:'row',height:40,alignItems:'center',}} >
            <Text style={{marginLeft:20,color:'#B3B3B3',fontSize:28,fontFamily:'MaterialIcons-Regular',}}>star</Text>
            <Text style={{marginLeft:20,color:'#B3B3B3',fontSize:14,}}>我的收藏</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',height:40,alignItems:'center',}}>
            <Text style={{marginLeft:20,color:'#B3B3B3',fontSize:28,fontFamily:'MaterialIcons-Regular',}}>inbox</Text>
            <Text style={{marginLeft:20,color:'#B3B3B3',fontSize:14,}}>离线下载</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',height:40,alignItems:'center',borderBottomWidth:1,borderColor:'#F2F2F2',}}>
            <Text style={{marginLeft:20,color:'#00AAFF',fontSize:28,fontFamily:'MaterialIcons-Regular',}}>home</Text>
            <Text style={{marginLeft:20,color:'#00AAFF',fontSize:14,}}>首页</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row',height:40,alignItems:'center',}}>
            <Text style={{marginLeft:20,color:'#D1D1D1',fontSize:16,}}>主题日报</Text>
          </View>
        </View>
        <ThemeList onselectTheme={null} />
      </View>
    );
  }
}
