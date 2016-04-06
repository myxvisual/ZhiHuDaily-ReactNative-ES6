import { StyleSheet } from 'react-native';

function getStyles(WIDTH) {
  const SCREEN_WIDTH = WIDTH;
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
      height: 400,
      width: SCREEN_WIDTH
    },
    TopstoriesFG: {
      height: 140 / 360 * SCREEN_WIDTH,
      width: SCREEN_WIDTH,
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    TopstoriesTitle: {
      color: '#fff',
      letterSpacing: 12,
      lineHeight: 30,
      fontSize: 24,
      fontWeight: '300',
      width: SCREEN_WIDTH - 24,
      marginBottom: 12
    },
    ListView: {
      marginTop: 0,
      backgroundColor: '#FAFAFA'
    },
    ListCard: {
      width: SCREEN_WIDTH,
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
  return styles
}

export default getStyles