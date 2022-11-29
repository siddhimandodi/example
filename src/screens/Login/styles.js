import {StyleSheet, Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import {colors} from '../../styleguide/color';

const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    backgroundColor: colors.cream,
    minHeight: height,
  },
  mainDarkLayer: {
    width: width,
    height: height / 1.1,
    backgroundColor: colors.darkRed,
    bottom: height / 2.2,
    borderRadius: height / 2,
    transform: [{scaleX: 2}, {scaleY: 1}],
  },
  middleLayer: {
    position: 'absolute',
    width: width,
    height: height / 1.1,
    backgroundColor: colors.middleRed,
    zIndex: 2,
    borderRadius: height / 2,
  },
  thirdLayer: {
    position: 'absolute',
    width: width,
    height: height / 1.12,
    backgroundColor: colors.lightRed,
    zIndex: 3,
    borderRadius: height / 2,
  },
  loginButton: {
    backgroundColor: colors.buttonColor,
    width: '80%',
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(30),
  },
  loginText: {
    fontSize: scale(17),
    color: colors.cream,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    marginHorizontal: scale(20),
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: scale(30),
    fontWeight: '500',
    color: colors.cream,
  },
  description: {
    fontSize: scale(16),
    color: colors.cream,
    marginTop: scale(20),
  },
  fingerPrintContainer: {
    marginTop: scale(25),
  },
  fingerPrint: {
    flexDirection: 'row',
    width: scale(130),
    justifyContent: 'space-evenly',
  },
  fingerPrintImg: {
    width: scale(20),
    height: scale(20),
  },
  quickBal: {
    color: colors.buttonColor,
    fontSize: scale(14),
    fontWeight: '500',
  },
  textFieldContainer: {
    backgroundColor: colors.white,
    height: scale(65),
    justifyContent: 'flex-end',
    borderRadius: scale(5),
    alignSelf: 'center',
    marginTop: scale(20),
    width: '100%',
  },
  textfield: {
    marginBottom: scale(5),
    width: '90%',
    backgroundColor: colors.white,
    alignSelf: 'center',
    color: colors.black,
  },
  middle: {
    color: colors.buttonColor,
    marginLeft: scale(10),
    marginRight: scale(10),
  },
  forgotContainer: {
    flexDirection: 'row',
    marginTop: scale(5),
    alignSelf: 'center',
  },
  enable: {
    marginTop: scale(10),
  },
});
