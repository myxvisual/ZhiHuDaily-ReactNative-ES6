'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio');
var ViewPager = require('react-native-viewpager');
var {width,height} = Dimensions.get('window');

var {
  Navigator,
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  DrawerLayoutAndroid,
  TouchableOpacity,
  ScrollView,
  ListView,
} = React;

var NavigationBar = require('./NavigationBar');
var LoadingPage = require('./LoadingPage');
var DrawerView = require('./DrawerView');

var STORYIES_URL = 'http://news-at.zhihu.com/api/4/news/latest';

var storyCache = {
  dataForQuery:{},
};

class ZhiHuDaily extends Component{
  constructor(props) {
    super(props);
    this.state =  {
      dataSource:new ListView.DataSource({
        rowHasChanged:(row1,row2) => row1 !== row2
      }),
      top_stories:new ViewPager.DataSource({
        pageHasChanged:(p1,p2) => p1 !==p2
      }),
      Loading:true,
    }
  }

  componentWillMount(){
    this.fetchStories();
  }

  render() {
    if (this.state.Loading) {
      return (
        <LoadingPage tittle='知乎' />)
    }

    var top_stories = this.state.top_stories;
    var navigationView = (
      <DrawerView />
    );
    return (
      <DrawerLayoutAndroid
        ref='drawer'
        renderNavigationView={() => navigationView}
        drawerWidth={307}
        drawerPosition={DrawerLayoutAndroid.positions.left}
        >
        <View style={{flex:1,flexDirection:'column',backgroundColor:'#FAFAFA'}}>
          <View style={{paddingTop:0}}>
            <NavigationBar navigator={this.props.navigator} index={true} openMyDrawer={() => this.openMyDrawer()} />
          </View>
          <ScrollView>
            <ViewPager
              dataSource={this.state.top_stories}
              style={{height:300,}}
              renderPage={this.renderTopstories.bind(this)}
              isLoop={true}
              autoPlay={true}
              />
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderStories.bind(this)}
              style={styles.ListView}
              onEndReached={this._onEndReached.bind(this)}
              />
          </ScrollView>
        </View>
      </DrawerLayoutAndroid>
    )
  }

  renderTopstories(topStories){
    return(
      <View style={{}}>
        <TouchableOpacity
          activeOpacity={.9}
          onPress={() =>
          this.props.navigator.push({
            id:'AppWebView',
            data:topStories
          })} >
        <Image
          style={styles.TopstoriesImage}
          source={{uri:topStories.image}} >
          <Image style={styles.TopstoriesFG} source={require('./src/images/ZhiHuDailyMainPosterFG.png')}>
            <Text style={styles.TopstoriesTitle}>
              {topStories.title}
            </Text>
          </Image>
        </Image>
      </TouchableOpacity>
      </View>
    )
  }

  renderStories(story){
    return(
      <TouchableOpacity
        activeOpacity={.8}
        onPress={() =>
          this.props.navigator.push({
            id:'AppWebView',
            data:story,
          })}
        >
        <Image
          style={styles.ListCard}
          source={require('./src/images/ZhihuDailyCard.png')}>
          <Image style={styles.ListImage} source={{uri:story.images[0]}} />
          <View style={{width:240,paddingLeft:10,}}>
            <Text style={styles.ListTitle}>{story.title}</Text>
          </View>
        </Image>
      </TouchableOpacity>
    )
  }

  fetchStories(){
    fetch(STORYIES_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(responseData.stories),
          top_stories:this.state.top_stories.cloneWithPages(responseData.top_stories),
          Loading:false,
        })
      })
      .done();
    }

  _onEndReached(){
    fetch('http://news-at.zhihu.com/api/4/theme/11')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource:this.getDataSource(responseData.stories),
        })
      })
      .done();
  }

  getDataSource(stories: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(stories);
  }

  openMyDrawer(theme){
    this.refs.drawer.openDrawer();
  }

}

var styles = StyleSheet.create({
  NavigationBar:{
    height:36,
    backgroundColor:'#0a8ffc',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:20,
    paddingRight:20,
  },
  TopstoriesImage:{
    alignItems:'center',
    justifyContent:'flex-end',
    height:200,
    width:360,
  },
  TopstoriesFG:{
    height:140,
    width:360,
    alignItems:'center',
    justifyContent:'flex-end',
  },
  TopstoriesTitle:{
    color:'#fff',
    letterSpacing:12,
    lineHeight:30,
    fontSize:20,
    fontWeight:'300',
    width:320,
    marginBottom:12,
  },
  ListView:{
    marginTop:20,
    backgroundColor:'#FAFAFA',
  },
  ListCard:{
    width:360,
    height:82,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginLeft:0,
    marginRight:0,
    margin:4,
  },
  ListImage:{
    marginLeft:5,
    width:76,
    height:76,
  },
  ListTitle:{
    fontSize:14,
    color:'#a7a7a7',
    textAlign:'left',
    fontWeight:'200',
    letterSpacing:12,
    lineHeight:24,
  },
ListText:{
    fontSize:14,
    color:'#75cd37',
    textAlign:'left',
    justifyContent:'center',
    alignItems:'flex-start'
  },

});

module.exports = ZhiHuDaily;
