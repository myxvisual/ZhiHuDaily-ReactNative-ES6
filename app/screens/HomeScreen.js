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
let listData = { dataBlob: {}, sectionsIDs: [], rowIDs: [] };
let storyDate = Date.parse(new Date());
const storyCache = { stories: [], storyDate: Date.parse(new Date()) };

export default class HomeScreen extends Component {
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

  coverYYMMDD(date) {
    const nowDate = new Date(date);
    const nowMonth = nowDate.getMonth() < 9 ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1;
    const nowDay = nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate();
    const fullDate = `${nowDate.getFullYear()}${nowMonth}${nowDay}`;
    return fullDate
  }

  addListData(originListData, sectionID, rowData) {
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

  componentDidMount() {
    this.fetchStories()
  }

  fetchStories() {
    fetch('http://news-at.zhihu.com/api/4/news/latest')
      .then((response) => response.json())
      .then((responseData) => {
        this.addListData(listData, responseData.date, responseData.stories);
        this.setState({
          topStories: this.state.topStories.cloneWithPages(responseData.top_stories),
          stories: this.state.stories.cloneWithRowsAndSections(listData.dataBlob, listData.sectionsIDs, listData.rowIDs),
          loading: false
        })
      })
      .done()
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          this.props.navigator.push({
            id: 'StoryScreen',
            url: rowData.id
          })} >
        <View
          style={styles.ListCard}>
          <Image style={styles.ListImage} source={{uri: rowData.images[0]}} />
          <Text style={styles.ListTitle}>{rowData.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View>
        <Text>
          {sectionID}
        </Text>
      </View>
    )
  }

  onEndReached() {
    storyDate -= 86400000;
    fetch(`http://news.at.zhihu.com/api/4/news/before/${this.coverYYMMDD(storyDate)}`)
    .then((response) => response.json())
    .then((responseData) => {
      this.addListData(listData, responseData.date, responseData.stories);
      this.setState({
        stories: this.state.stories.cloneWithRowsAndSections(listData.dataBlob, listData.sectionsIDs, listData.rowIDs)
      })
    })
    .done();
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
    return (
      <ViewPager
        dataSource={this.state.topStories}
        style={{width: SCREEN_WIDTH}}
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

    const navigationView = (
      <DrawerView />
    );
    return (
      <DrawerLayoutAndroid
        ref="drawer"
        renderNavigationView={() => navigationView}
        drawerWidth={307}
        drawerPosition={DrawerLayoutAndroid.positions.left}>
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#FAFAFA'}}
              onLayout={(event) => {
                SCREEN_WIDTH = event.nativeEvent.layout.width;
                styles = getStyles(SCREEN_WIDTH);
              }}>
          <View style={{paddingTop: 0}}>
            <NavigationBar
              navigator={this.props.navigator}
              index
              openMyDrawer={() => this.openMyDrawer()} />
          </View>
            <ListView
              style={styles.ListView}
              dataSource={this.state.stories}
              renderRow={this.renderRow.bind(this)}
              renderHeader={this.renderHeader.bind(this)}
              renderSectionHeader={this.renderSectionHeader}
              onEndReachedThreshold={24}
              onEndReached={this.onEndReached.bind(this)} />
        </View>
      </DrawerLayoutAndroid>
    )
  }
}

HomeScreen.propTypes = {
  navigator: PropTypes.object.isRequired
}
