import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  DrawerLayoutAndroid,
  TouchableOpacity,
  ListView
} from 'react-native';

import ViewPager from '../components/ViewPager/ViewPager';
import NavigationBar from '../components/NavigationBar';
import LoadingPage from '../components/LoadingPage';
import DrawerView from '../components/DrawerView';

const nowDate = new Date();
const nowMonth = nowDate.getMonth() < 9 ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1;
const fullDate = `${nowDate.getFullYear()}${nowMonth}${nowDate.getDate()}`;
const storyCache = { stories: [], page: fullDate };

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stories: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      topStories: new ViewPager.DataSource({
        pageHasChanged: (p1, p2) => p1 !== p2
      }),
      loading: true
    }
  }

  componentDidMount() {
    this.fetchStories()
  }

  fetchStories() {
    fetch('http://news-at.zhihu.com/api/4/news/latest')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          stories: this.state.stories.cloneWithRows(responseData.stories),
          topStories: this.state.topStories.cloneWithPages(responseData.top_stories),
          loading: false
        })
      })
      .done()
  }

  renderStories(story) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          this.props.navigator.push({
            id: 'StoryScreen',
            data: story
          })}>
        <Image
          style={styles.ListCard}
          source={require('../images/ZhihuDailyCard.png')}>
          <Image style={styles.ListImage} source={{uri: story.images[0]}} />
          <View style={{width: 240, paddingLeft: 10}}>
            <Text style={styles.ListTitle}>{story.title}</Text>
          </View>
        </Image>
      </TouchableOpacity>
    )
  }

  renderSectionHeader() {
    const dateHeader = 12;
    return (
      <View>
        <Text>
          {dateHeader}
        </Text>
      </View>
    )
  }

  onEndReached() {
    storyCache.page -= 1;
    fetch(`http://news.at.zhihu.com/api/4/news/before/${storyCache.page}`)
    .then((response) => response.json())
    .then((responseData) => {
      for (let story in responseData.stories) {
        storyCache.stories.push(responseData.stories[story])
      }
      this.setState({
        stories: this.state.stories.cloneWithRows(storyCache.stories)
      })
    })
    .done();
  }

  renderTopstories(topStories) {
    return (
      <View style={{}}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
          this.props.navigator.push({
            id: 'StoryScreen',
            data: topStories
          })} >
        <Image
          style={styles.TopstoriesImage}
          source={{uri:topStories.image}} >
          <Image style={styles.TopstoriesFG} source={require('../images/ZhiHuDailyMainPosterFG.png')}>
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

  renderHeader() {
    return (
      <ViewPager
        dataSource={this.state.topStories}
        style={{height: 300}}
        renderPage={this.renderTopstories.bind(this)}
        isLoop
        autoPlay />
    )
  }

  openMyDrawer() {
    this.refs.drawer.openDrawer();
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingPage tittle="知乎" />
      )
    }

    const topStories = this.state.topStories;
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
            <ListView
              style={styles.ListView}
              dataSource={this.state.stories}
              renderRow={this.renderStories.bind(this)}
              renderHeader={this.renderHeader.bind(this)}
              renderSectionHeader={this.renderSectionHeader}
              onEndReachedThreshold={24}
              onEndReached={this.onEndReached.bind(this)} />
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
    marginTop: 0,
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
