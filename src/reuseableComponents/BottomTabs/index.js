import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Modal,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../../actions/ServiceAction';
import ButtonView from '../ButtonView';
import {push, reset} from '../../services/NavigationService';
import LoginContext from '../../';
import store from '../../store';
import utility from '../../utility';
import {Metrics, Colors, AppStyles, Images} from '../../theme';

class BottomTabs extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {user, setLogin} = this.props;
    console.log('user1', user);
    console.log('setLogin', setLogin);

    const arr = [
      {
        img: Images.headerImage,
        name: '',
        route: () => {
          this.hideModal();
        },
      },
      {
        img: Images.ic_dashboard,
        name: 'Dashboard',
        route: () => {
          push('dashboard');
          this.hideModal();
        },
      },
      {
        img: Images.ic_setting,
        name: 'History',
        route: () => {
          push('history');
          this.hideModal();
        },
      },
      {
        img: Images.ic_term_condition,
        name: 'Favourite',
        route: () => {
          push('favorites');
          this.hideModal();
        },
      },
      {
        img: Images.ic_profile,
        name: 'My Profile',
        route: () => {
          push('profile');
          this.hideModal();
        },
      },
      {
        img: Images.ic_logout,
        name: 'Log Out',
        route: () => {
          this.hideModal();
          utility.getStoreRef().dispatch(logout());
          // setLogin(false);
        },
      },
    ];

    let data = arr;

    return (
      <View style={styles.tabContainer}>
        <View style={styles.tabInnerContainer}>
          <TouchableOpacity onPress={() => push('dashboard')}>
            <View style={styles.tabSec}>
              <Image style={styles.imgWidth} source={Images.ic_dashboard} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => push('history')}>
            <View style={styles.tabSec}>
              <Image style={styles.imgWidth} source={Images.ic_setting} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => push('favorites')}>
            <View style={styles.tabSec}>
              <Image
                style={styles.imgWidth}
                source={Images.ic_term_condition}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => push('profile')}>
            <View style={styles.tabSec}>
              <Image style={styles.imgWidth} source={Images.ic_profile} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => utility.getStoreRef().dispatch(logout())}>
            <View style={styles.tabSec}>
              <Image style={styles.imgWidth} source={Images.ic_logout} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 0.5,
    borderTopColor: Colors.shadow,
    backgroundColor: Colors.cGray,
    width: '100%',
  },
  tabInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabSec: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    // borderRightWidth: 0.5,
    // borderRightColor: Colors.shadow,
  },
  noBorder: {
    borderRightWidth: 0,
  },
  imgStyle: {
    backgroundColor: Colors.primary.white,
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  // imgWidth: {
  //   width: 15,
  //   height: 15,
  // },
  txtStyle: {
    marginLeft: Metrics.baseMargin,
  },
  text: {
    ...AppStyles.gbRe(14, Colors.primary.white),
  },
});

const actions = {};
const mapStateToProps = ({user}) => ({user: user.data});
export default connect(mapStateToProps, actions)(BottomTabs);
