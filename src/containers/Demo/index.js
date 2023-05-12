import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {SafeAreaView, Text, Button} from 'react-native';
import {pop} from '../../services/NavigationService';
import singleton from '../../singleton';

class Demo extends Component {
  componentDidMount() {}
  render() {
    return (
      <Fragment>
        <SafeAreaView>
          <Text>Demo</Text>
          <Button title={'pop'} onPress={() => pop()} />
        </SafeAreaView>
      </Fragment>
    );
  }
}
const actions = {};
const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  actions,
)(Demo);
