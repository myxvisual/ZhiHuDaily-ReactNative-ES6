'use strict';

var React = require('react-native');

var {
  Navigator,
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var styles = StyleSheet.create({
  Container:{
    backgroundColor:'#3fa9f6'
  }
});

class LoginPage extends Component{
  gotoMainPage(){
    this.props.navigator.push({
      id:'MainPage',name:'MainPage'
    });
  }

  render() {
    return (
      <View style={styles.Container}>
          <Text style={styles.MainTittle1}>Wel come to my first App!</Text>
          <Text style={styles.MainText}>Let us find some interesting things</Text>
          <TouchableOpacity style={styles.Button} onPress={this.gotoMainPage.bind(this)} activeOpacity={0.1}>
            <Text style={styles.ButtonText}>Let's Go!</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  Container:{
    backgroundColor:'#3fa9f6',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  MainTittle1:{
    fontSize:28,
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold'
  },
  MainText:{
    fontSize:14,
    color:'#fff',
    textAlign:'left',
    justifyContent:'center',
    alignItems:'flex-start'
  },
  Button:{
    height:28,
    backgroundColor:'#fff',
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center',
    margin:16,
    padding:2
  },
  ButtonText:{
    color:'#3fa9f6',
    fontSize:24,
    fontWeight:'bold',
    justifyContent:'center',
    alignItems:'center',
  },
});

module.exports = LoginPage;
