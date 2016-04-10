import {
  StyleSheet
} from 'react-native';

export default function getStyles(WIDTH) {
  const SCREEN_WIDTH = WIDTH;
  const styles = StyleSheet.create({
    Container: {
      height: 50,
      flexDirection: 'row',
      width: SCREEN_WIDTH,
      backgroundColor: '#00AAFF',
      alignItems: 'center',
      flexWrap: 'nowrap'
    },
    SearchBarClose: {
      width: SCREEN_WIDTH,
      paddingLeft: 0,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    SearchBarOpen: {
      width: SCREEN_WIDTH - 40,
      margin: 20,
      height: 36,
      backgroundColor: '#fff',
      borderRadius: 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'},
    SearchBar: {
      color: '#BFBFBF',
      height: 38,
      width: SCREEN_WIDTH - 20,
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
  return styles
}
