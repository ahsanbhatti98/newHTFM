import {StyleSheet, Dimensions} from 'react-native';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const styles = StyleSheet.create({
  // container: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  // },
  container: {
    backgroundColor: '#fff',
  },
  card: {
    margin: 2,
  },
  image: {
    height: viewportHeight,
    width: '100%',
    justifyContent: 'center',
  },
  proImg: {
    width: '100%',
    height: '100%',
  },
  image2: {
    height: '100%',
    width: '100%',
  },
  logoSec: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: -30,
  },
  secWithIcon: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 260,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 30,
  },
  mgTop: {
    marginTop: 50,
  },
  textBottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginBottom: 200,
  },
  mgBottom20: {marginBottom: 20},
  icons: {
    color: '#fff',
    fontSize: 24,
    marginRight: 15,
  },
  secondScreenLogoTxt: {
    alignItems: 'center',
    position: 'relative',
    top: 0,
  },
  tab2: {
    height: '100%',
    justifyContent: 'flex-start',
  },
  tab3: {
    zIndex: 200,
  },
  animatedView: {
    position: 'absolute',
    width: '100%',
  },
  boxContainer: {
    height: 160,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingText: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: '#61dafb',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
  },
  mgTop: {marginTop: 40},
  centered: {justifyContent: 'center'},
  mainText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '200',
    textAlign: 'center',
    justifyContent: 'center',
  },
  orangeOverlay: {
    // color: '#fa9572',
    backgroundColor: 'rgba(250, 149, 114, 0.7)',
    height: '100%',
  },
});

export default styles;
