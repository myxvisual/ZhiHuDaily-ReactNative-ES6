import React, {
  Navigator,
  Component,
  PropTypes,
  StyleSheet,
  View,
  Text,
  Image,
  DrawerLayoutAndroid,
  TouchableOpacity,
  ScrollView,
  ListView
} from 'react-native';
import ViewPager from './ViewPager/ViewPager';
import Dimensions from 'Dimensions';
import PixelRatio from 'PixelRatio';
const { width, height } = Dimensions.get('window');

import NavigationBar from './NavigationBar';
import LoadingPage from './LoadingPage';
import DrawerView from './DrawerView';

const STORYIES_URL = 'http://news-at.zhihu.com/api/4/news/latest';

let storyCache = [];

export default class ZhiHuDailyIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDataSource: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      top_stories: new ViewPager.DataSource({
        pageHasChanged: (p1, p2) => p1 !== p2
      }),
      Loading: true,
      date: String
    }
  }

  componentWillMount() {
    this.fetchStories();
    const nowDate = new Date();
    const nowMonth = nowDate.getMonth() < 10 ? `0${nowDate.getMonth()}` : nowDate.getMonth();
    const fullDate = `${nowDate.getFullYear()}${nowMonth}${nowDate.getDate()}`;
    this.setState({
      date: fullDate
    })
  }

  fetchStories() {
    fetch(STORYIES_URL)
      .then((response) => response.json())
      .then((responseData) => {
        for (var story in responseData.stories) {
          storyCache.push(responseData.stories[story])
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(storyCache),
          top_stories: this.state.top_stories.cloneWithPages(responseData.top_stories),
          Loading: false
        })
      })
      .done();
  }

  renderStories(story) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          this.props.navigator.push({
            id: 'AppWebView',
            data: story
          })}>
        <Image
          style={styles.ListCard}
          source={require('../../src/images/ZhihuDailyCard.png')}>
          <Image style={styles.ListImage} source={{uri: story.images[0]}} />
          <View style={{width: 240, paddingLeft: 10}}>
            <Text style={styles.ListTitle}>{story.title}</Text>
          </View>
        </Image>
      </TouchableOpacity>
    )
  }

  _onEndReached() {
    this.setState({
      date: this.state.date - 1
    });
    fetch(`http://news.at.zhihu.com/api/4/news/before/${this.state.date}`)
      .then((response) => response.json())
      .then((responseData) => {
        for (var story in responseData.stories) {
          storyCache.push(responseData.stories[story])
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(storyCache)
        })
      })
      .done();
  }

  getDataSource(stories: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(stories);
  }

  openMyDrawer(theme) {
    this.refs.drawer.openDrawer();
  }

  renderTopstories(topStories) {
    return (
      <View style={{}}>
        <TouchableOpacity
          activeOpacity={.9}
          onPress={() =>
          this.props.navigator.push({
            id: 'AppWebView',
            data: topStories
          })} >
        <Image
          style={styles.TopstoriesImage}
          source={{uri:topStories.image}} >
          <Image style={styles.TopstoriesFG} source={require('../../src/images/ZhiHuDailyMainPosterFG.png')}>
            <Text style={styles.TopstoriesTitle}>
              {topStories.title}
            </Text>
            <Text>
              {this.state.date}
            </Text>
          </Image>
        </Image>
      </TouchableOpacity>
      </View>
    )
  }

  render() {
    if (this.state.Loading) {
      return (
        <LoadingPage tittle="知乎" />)
    }

    const top_stories = this.state.top_stories;
    const navigationView = (
      <DrawerView />
    );
    return (
      <DrawerLayoutAndroid
        ref="drawer"
        renderNavigationView={() => navigationView}
        drawerWidth={307}
        drawerPosition={DrawerLayoutAndroid.positions.left}>
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#FAFAFA'}}>
          <View style={{paddingTop: 0}}>
            <NavigationBar navigator={this.props.navigator}
                           index
                           openMyDrawer={() => this.openMyDrawer()} />
          </View>
          <ScrollView>
            <ViewPager
              dataSource={this.state.top_stories}
              style={{height: 300}}
              renderPage={this.renderTopstories.bind(this)}
              isLoop
              autoPlay />
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderStories.bind(this)}
              style={styles.ListView}
              onEndReached={this._onEndReached.bind(this)} />
          </ScrollView>
        </View>
      </DrawerLayoutAndroid>
    )
  }
}

const styles = StyleSheet.create({
  NavigationBar: {
    height: 36,
    backgroundColor: '#0a8ffc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  TopstoriesImage: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 200,
    width: 360
  },
  TopstoriesFG: {
    height: 140,
    width: 360,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  TopstoriesTitle: {
    color: '#fff',
    letterSpacing: 12,
    lineHeight: 30,
    fontSize: 20,
    fontWeight: '300',
    width: 320,
    marginBottom: 12
  },
  ListView: {
    marginTop: 20,
    backgroundColor: '#FAFAFA'
  },
  ListCard: {
    width: 360,
    height: 82,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
    margin: 4
  },
  ListImage: {
    marginLeft: 5,
    width: 76,
    height: 76
  },
  ListTitle: {
    fontSize: 14,
    color: '#a7a7a7',
    textAlign: 'left',
    fontWeight: '200',
    letterSpacing: 12,
    lineHeight: 24
  },
  ListText: {
    fontSize: 14,
    color: '#75cd37',
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});

ZhiHuDailyIndex.propTypes = {
  navigator: PropTypes.object.isRequired
}
