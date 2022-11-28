import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {colors} from '../../styleguide/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  parent: {
    height: '65%',
    width: '100%',
    transform: [{scaleX: 2}],
    borderBottomStartRadius: scale(200),
    borderBottomEndRadius: scale(200),
    overflow: 'hidden',
  },
  child: {
    flex: 1,
    transform: [{scaleX: 0.5}],
    backgroundColor: colors.red,
    justifyContent: 'center',
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
    backgroundColor: colors.cream,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: scale(20),
    width: '90%',
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
    backgroundColor: colors.cream,
    height: scale(65),
    justifyContent: 'flex-end',
    borderRadius: scale(5),
    alignItems: 'center',
    marginTop: scale(20),
  },
  textfield: {
    marginBottom: scale(5),
    width: '90%',
    backgroundColor: colors.cream,
  },
  middle: {
    color: colors.buttonColor,
    marginLeft: scale(10),
    marginRight: scale(10),
  },
  forgotContainer: {
    flexDirection: 'row',
    marginTop: scale(20),
  },
  enable: {
    marginTop: scale(10),
  },
});
