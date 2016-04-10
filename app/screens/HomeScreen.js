import React, {
  Component,
  PropTypes,
  StyleSheet,
  View,
  Text,
  Image,
  DrawerLayoutAndroid,
  TouchableOpacity,
  ListView,
  Dimensions
} from 'react-native';
import ViewPager from '../components/ViewPager/ViewPager';
import NavigationBar from '../components/NavigationBar';
import LoadingPage from '../components/LoadingPage';
import DrawerView from '../components/DrawerView';
import getStyles from '../styles/screens/HomeScreen';

let SCREEN_WIDTH = Dimensions.get('window').width;
let styles = getStyles(SCREEN_WIDTH);
let listData;
let storyDate = Date.parse(new Date());

export default class HomeScreen extends Component {
  static defaultProps = { themes: 'index'};
  static propTypes = { themes: PropTypes.oneOfType([PropTypes.string, PropTypes.number])};
  constructor(props) {
    super(props)
    this.state = {
      stories: new ListView.DataSource({
        getSectionData: (dataBlob, sectionID) => dataBlob[sectionID],
        getRowData: (dataBlob, sectionID, rowID) => dataBlob[rowID],
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
    this.fetchStories();
  }

  renderRow(rowData, sectionID, rowID) {
    let image = rowData.images ? <Image style={styles.ListImage} source={{uri: rowData.images[0]}} /> : null;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          this.props.navigator.push({
            id: 'StoryScreen',
            url: rowData.id
          })} >
        <View
          style={styles.ListCard}
          elevation={0.6}>
          {image}
          <View>
            <Text style={styles.ListTitle}>{rowData.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderSectionHeader(sectionData, sectionID) {
    if (this.props.themes === 'index') {
      function toSectionHeader(date) {
        const year = date.slice(0, 4);
        const month = date.slice(4, 6) < 10 ? date.slice(5, 6) : date.slice(4, 6);
        const day = date.slice(6, 8) < 10 ? date.slice(7, 8) : date.slice(6, 8);
        const weekDay = new Date(+year, +month, +day).getDay();
        const WeekString = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
        const secitonDate = `${month}月${day}日 ${WeekString[weekDay]}`;
        return secitonDate
      }
      let sectionHeaderTitle = sectionID === this.coverYYMMDD(new Date()) ? '今日新闻' : toSectionHeader(sectionID);
      return (
        <View style={styles.SectionHeaderBG}>
          <Text style={styles.SectionHeaderTitle}>
            {sectionHeaderTitle}
          </Text>
        </View>
      )
    }
    return null
  }

  onEndReached() {
    if (this.props.themes === 'index') {
      storyDate -= 86400000;
      fetch(`http://news.at.zhihu.com/api/4/news/before/${this.coverYYMMDD(storyDate)}`)
      .then((response) => response.json())
      .then((responseData) => {
        this.addListData(responseData.date, responseData.stories, listData);
        const { dataBlob, sectionsIDs, rowIDs } = listData;
        this.setState({
          stories: this.state.stories.cloneWithRowsAndSections(dataBlob, sectionsIDs, rowIDs)
        })
      })
      .done();
    }
  }

  renderTopstories(topStories) {
    return (
      <View style={{width: SCREEN_WIDTH}}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
          this.props.navigator.push({
            id: 'StoryScreen',
            url: topStories.id
          })} >
        <Image
          style={styles.TopstoriesImage}
          source={{uri: topStories.image}} >
          <Image style={styles.TopstoriesFG}
                 source={require('../images/ZhiHuDailyMainPosterFG.png')}>
            <Text style={styles.TopstoriesTitle} >
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
    if (this.props.themes == 'index') {
      return (
        <ViewPager
          dataSource={this.state.topStories}
          style={{width: SCREEN_WIDTH}}
          renderPage={this.renderTopstories.bind(this)}
          isLoop
          autoPlay />
      )
    }
    return null
  }

  navigationView() {
    return <DrawerView navigator={this.props.navigator} />
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingPage tittle="知乎" />
      )
    }

    return (
      <DrawerLayoutAndroid
        onLayout={() => {DRAWER_REF = this.refs.drawer}}
        ref="drawer"
        renderNavigationView={() => this.navigationView()}
        drawerWidth={SCREEN_WIDTH}
        onDrawerOpen={() => {DRAWER_REF = this.refs.drawer}}
        drawerPosition={DrawerLayoutAndroid.positions.left}>
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#FAFAFA'}}
              onLayout={(event) => {
                SCREEN_WIDTH = event.nativeEvent.layout.width;
                styles = getStyles(event.nativeEvent.layout.width)
              }} >
          <View style={{paddingTop: 0}}>
            <NavigationBar
              elevation={2}
              navigator={this.props.navigator}
              index
              openMyDrawer={() => this.refs.drawer.openDrawer()} />
          </View>
            <ListView
              style={styles.ListView}
              dataSource={this.state.stories}
              renderRow={this.renderRow.bind(this)}
              renderHeader={this.renderHeader.bind(this)}
              renderSectionHeader={this.renderSectionHeader.bind(this)}
              onEndReachedThreshold={24}
              onEndReached={this.onEndReached.bind(this)} />
        </View>
      </DrawerLayoutAndroid>
    )
  }

  fetchStories() {
    let uri = this.props.themes == 'index' ? 'http://news-at.zhihu.com/api/4/news/latest' : `http://news-at.zhihu.com/api/4/theme/${this.props.themes}`;
    fetch(uri)
      .then((response) => response.json())
      .then((responseData) => {
        listData = this.addListData(responseData.date, responseData.stories);
        const { dataBlob, sectionsIDs, rowIDs } = listData;
        this.setState({
          topStories: this.props.themes == 'index' ? this.state.topStories.cloneWithPages(responseData.top_stories) : null,
          stories: this.state.stories.cloneWithRowsAndSections(dataBlob, sectionsIDs, rowIDs),
          loading: false
        })
      })
      .done()
  }

  coverYYMMDD(date) {
    const nowDate = new Date(date);
    const nowMonth = nowDate.getMonth() < 9 ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1;
    const nowDay = nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate();
    const fullDate = `${nowDate.getFullYear()}${nowMonth}${nowDay}`;
    return fullDate
  }

  addListData(sectionID, rowData, originListData = {dataBlob: {}, sectionsIDs: [], rowIDs: []}) {
    originListData.sectionsIDs.push(sectionID);
    originListData.dataBlob[sectionID] = rowData;
    originListData.rowIDs.push(
      rowData.map((element, index) => {
        const rowID = `${sectionID}:${index}`;
        originListData.dataBlob[rowID] = element;
        return rowID
      })
    )
    return originListData
  }
}

HomeScreen.propTypes = {
  navigator: PropTypes.object.isRequired
}
