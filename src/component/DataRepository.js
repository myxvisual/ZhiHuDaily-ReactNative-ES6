'use strict';

var React = require('react-native');

var{
  AsyncStorage,
} = React;

var API_Cover = 'http://news-at.zhihu.com/api/4/start-image/1080*1776';
var API_Latest = 'http://news-at.zhihu.com/api/4/news/latest';
var API_Thems = 'http://news-at.zhihu.com/api/4/themes';
