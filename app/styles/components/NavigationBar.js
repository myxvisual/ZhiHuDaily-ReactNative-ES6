import {
  StyleSheet,
  Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  Container: {
    width: SCREEN_WIDTH,
    paddingLeft: 0,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  SearchBar: {
    color: '#BFBFBF',
    height: 38,
    width: 260,
    borderColor: '#BFBFBF',
    borderWidth: 1,
    fontSize: 12
  },
  IconFont: {
    fontFamily: 'MaterialIcons-Regular',
    color: '#fff',
    fontSize: 24,
    fontWeight: '200',
    textAlign: 'center'
  }
});

export default styles
