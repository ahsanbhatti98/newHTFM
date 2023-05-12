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
// import { EventBusSingleton } from "light-event-bus";
import {logout} from '../../actions/ServiceAction';
import ButtonView from '../ButtonView';
import {push, reset} from '../../services/NavigationService';
import LoginContext from '../../';
import store from '../../store';
import utility from '../../utility';
import {Metrics, Colors, AppStyles, Images} from '../../theme';

class DrawerItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      // anime: new Animated.Value(0),
    };
  }

  componentDidMount() {
    // this.subscription = EventBusSingleton.subscribe("show_drawer", () => {
    //   this.showModal();
    //   //this.toggle();
    // });
  }

  // toggle = () => {
  //   Animated.timing(this.state.anime, {
  //     toValue: 1,
  //     delay: 1000,
  //     duration: 1500,
  //     easing: Easing.ease,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // showModal = () => this.setState({isModalVisible: true});
  // hideModal = () => this.setState({isModalVisible: false});

  render() {
    const {isModalVisible} = this.state;
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={this.hideModal}>
        <TouchableWithoutFeedback onPress={this.hideModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}>
            <View
              style={[
                styles.renderStyle,
                {
                  marginTop: utility.isPlatformAndroid()
                    ? 5
                    : Metrics.xDoubleBaseMargin,
                },
              ]}>
              {data.map((item, index) => {
                return (
                  <ButtonView
                    key={index}
                    style={{
                      width: Metrics.screenWidth / 2 + Metrics.baseMargin,
                    }}
                    onPress={item.route}>
                    <Animated.View style={[styles.drawerView, {}]}>
                      <View
                        style={[
                          styles.imgStyle,
                          {
                            borderTopRightRadius:
                              index == 0 ? Metrics.doubleBaseMargin : 0,
                            borderTopLeftRadius:
                              index == 0 ? Metrics.doubleBaseMargin : 0,
                            borderBottomLeftRadius:
                              index == data.length - 1
                                ? Metrics.doubleBaseMargin
                                : 0,
                            borderBottomRightRadius:
                              index == data.length - 1
                                ? Metrics.doubleBaseMargin
                                : 0,
                          },
                        ]}>
                        <Image
                          style={styles.imgWidth}
                          resizeMode="contain"
                          source={item.img}
                        />
                      </View>

                      <View style={styles.txtStyle}>
                        <Text style={styles.text}>{item.name}</Text>
                      </View>
                    </Animated.View>
                  </ButtonView>
                );
              })}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  drawerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  renderStyle: {
    marginLeft: Metrics.baseMargin,
  },
  imgStyle: {
    backgroundColor: Colors.primary.white,
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  imgWidth: {
    width: 18,
    height: 18,
  },
  txtStyle: {
    marginLeft: Metrics.baseMargin,
  },
  text: {
    ...AppStyles.gbRe(14, Colors.primary.white),
  },
});

const actions = {};
const mapStateToProps = ({user}) => ({user: user.data});
export default connect(mapStateToProps, actions)(DrawerItem);
