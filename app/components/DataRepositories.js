'use strict';

var React = require('react-native');

var {
  AsyncStorage,
  StyleSheet,
} = React;

var API_Cover_URL = 'http://news-at.zhihu.com/api/4/start-image/1080*1776';
var API_LastNews_URL = 'http://news-at.zhihu.com/api/4/news/latest';
var API_BeforeNews_URL = 'http://news.at.zhihu.com/api/4/news/before/';
var API_Themes_URL = 'http://news-at.zhihu.com/api/4/themes';
var API_Theme_URL = 'http://news-at.zhihu.com/api/4/theme/';

var KEY_COVER= '@Cover';
var KEY_THEMESLIST = '@ThemesList';
var KEY_THEME = '@Theme';

DataRepositories.prototype.setTheme = function (theme) {
  switch (theme) {
    case 'DarkTheme':
    return DarkTheme
    case 'WhiteTheme':
    return WhiteTheme
  }
}

DataRepositories.prototype.getTheme = function (KEY_THEME) {
  AsyncStorage.getItems
}


var DarkTheme = StyleSheet.create({
  FrontColor:{
    BackgroundColor:'#333333',
    color:'#333333',
  },
  DescriptionColor:{
    BackgroundColor:'#6E6E6E',
    color:'#6E6E6E',
  },
  TextColor:{
    BackgroundColor:'#8A8A8A',
    color:'#8A8A8A',
  },
  TitleColor:{
    BackgroundColor:'#F9F9F9',
    color:'#F9F9F9',
  },
  MainColor:{
    BackgroundColor:'#1C1C1C',
    color:'#1C1C1C',
  },
  BackColor:{
    BackgroundColor:'#292929',
    color:'#292929',
  },
});

var WhiteTheme = StyleSheet.create({
  FrontColor:{
    BackgroundColor:'#FFFFFF',
    color:'#FFFFFF',
  },
  DescriptionColor:{
    BackgroundColor:'#CCCCCC',
    color:'#CCCCCC',
  },
  TextColor:{
    BackgroundColor:'#A8A8A8',
    color:'#A8A8A8',
  },
  TitleColor:{
    BackgroundColor:'#2E2E2E',
    color:'#2E2E2E',
  },
  MainColor:{
    BackgroundColor:'#FFFFFF',
    color:'#FFFFFF',
  },
  BackColor:{
    BackgroundColor:'#F9F9F9',
    color:'#F9F9F9',
  },
});

module.exports = DataRepositories;
