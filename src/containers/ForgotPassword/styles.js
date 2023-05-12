import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },

  subText: {
    ...AppStyles.gbLight(20, Colors.primary.black),
  },
  mainText: {
    ...AppStyles.gbRe(30, Colors.primary.black),
  },

  sectionTitle: {
    marginTop: Metrics.xDoubleBaseMargin * 4,
    marginBottom: Metrics.xDoubleBaseMargin,
    marginHorizontal: Metrics.xDoubleBaseMargin + Metrics.baseMargin,
  },
  formStyle: {
    marginHorizontal: Metrics.xDoubleBaseMargin + Metrics.baseMargin,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: Metrics.xDoubleBaseMargin,
  },
});

export default styles;
