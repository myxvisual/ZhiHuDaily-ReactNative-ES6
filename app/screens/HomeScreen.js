import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  DrawerLayoutAndroid,
  TouchableOpacity,
  ListView,
  Dimensions,
  PixelRatio
} from 'react-native';
const { width } = Dimensions.get('window');
import ViewPager from '../components/ViewPager/ViewPager';
import NavigationBar from '../components/NavigationBar';
import LoadingPage from '../components/LoadingPage';
import DrawerView from '../components/DrawerView';
const getDate = new Date();
const storyCache = { stories: [], storyDate: Date.parse(getDate) };

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
        <View
          style={styles.ListCard}>
          <Image style={styles.ListImage} source={{uri: story.images[0]}} />
          <Text style={styles.ListTitle}>{story.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderSectionHeader() {
    const dateHeader = null;
    return (
      <View>
        <Text>
          {dateHeader}
        </Text>
      </View>
    )
  }

  onEndReached() {
    storyCache.storyDate -= 86400000;
    const nowDate = new Date(storyCache.storyDate);
    const nowMonth = nowDate.getMonth() < 9 ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1;
    const fullDate = `${nowDate.getFullYear()}${nowMonth}${nowDate.getDate()}`;
    storyCache.page -= 1;
    fetch(`http://news.at.zhihu.com/api/4/news/before/${fullDate}`)
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
      <View style={{width: width}}>
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
        style={{width: width}}
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
    height: 2 / 3 * width,
    width: width
  },
  TopstoriesFG: {
    height: 140 / 360 * width,
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  TopstoriesTitle: {
    color: '#fff',
    letterSpacing: 12,
    lineHeight: 30,
    fontSize: 24,
    fontWeight: '300',
    width: width - 24,
    marginBottom: 12
  },
  ListView: {
    marginTop: 0,
    backgroundColor: '#FAFAFA'
  },
  ListCard: {
    width: width,
    height: 82,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fbfbfb'
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
    lineHeight: 24,
    margin: 10
  },
  ListText: {
    fontSize: 14,
    color: '#75cd37',
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});
