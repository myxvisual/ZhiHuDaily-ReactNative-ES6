'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio');
var AppHeight = require('Dimensions').get('window').height;
var AppWidth = require('Dimensions').get('window').width;

var {
  Navigator,
  Component,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} = React;

var RouteMapper = require('./RouteMapper');

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class MainPage extends Component{
  constructor(props) {
    super(props);
    this.state =  {
      movies:null,
    }
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          movies:responseData.movies,
        });
      })
      .done();
  }

  goNewsPage(){
    this.props.navigator.push({
      id:'NewsPage',
      name:'NewsPage',
    });
  }

  render() {
    if (!this.state.movies) {
      return this.renderLoadingView();
    }

    var movie = this.state.movies[0];
    return this.renderMovie(movie);
  }

  renderLoadingView(){
    return(
      <View>
        <Text>Loading Movies...</Text>
      </View>
    )
  }

  renderMovie(movie){
    return (
      <ScrollView horizontal={false}>
        <View style={[styles.NavigationBar,]}>
          <TouchableOpacity
            onPress={() => this.props.navigator.pop()}
          >
            <Text style={styles.Text}>
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigator.replace({id:'LoginPage',name:'LoginPage'})}>
            <Text style={styles.Tittle}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({id:'SplashPage',name:'SplashPage'})}>
            <Text style={styles.Text}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Container}>
          <Text style={styles.MainTittle}>HHH! This is Fun</Text>
          <Text style={styles.MainText}>Let us go back to mainpage</Text>
          <TouchableOpacity style={styles.Button} onPress={this.goNewsPage.bind(this)}>
            <Text style={styles.ButtonText}>Let's Back!</Text>
          </TouchableOpacity>
          <Text style={[{marginTop:500},styles.MainTittle]}>{movie.title}</Text>
        </View>
      </ScrollView>
    );
  }

}
var styles = StyleSheet.create({
  Container:{
    paddingTop:76,
    backgroundColor:'#fefefe',
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center'
  },
  MainTittle:{
    fontSize:28,
    color:'#75cd37',
    textAlign:'center',
    fontWeight:'bold'
  },
  MainText:{
    fontSize:14,
    color:'#75cd37',
    textAlign:'left',
    justifyContent:'center',
    alignItems:'flex-start'
  },
  Button:{
    height:28,
    backgroundColor:'#75cd37',
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center',
    margin:16,
    padding:2
  },
  ButtonText:{
    color:'#fefefe',
    fontSize:24,
    fontWeight:'bold',
  },
  NavigationBar:{
    height:36,
    backgroundColor:'#f12846',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:20,
    paddingRight:20,
  },
  Tittle:{
    color: '#fff',
    fontSize:18,
    fontWeight:'600',
    textAlign:'center',
  },
  Text:{
    color: '#fff',
    fontSize:14,
    fontWeight:'200',
    textAlign:'center',
  },
});

module.exports = MainPage;
