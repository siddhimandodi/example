import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Animated,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {colors} from '../../styleguide/color';
import {images} from '../../assets';
// import {Textfield} from 'react-native-material-kit';
import {Icon} from '@rneui/themed';
import {useDispatch} from 'react-redux';
import {updateUserData} from '../../actions';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import Spinner from './Spinner';
import {styles} from './styles';
import {TextInput} from 'react-native-paper';
import {strings} from './strings';
import {SafeAreaView} from 'react-native-safe-area-context';

const Login = props => {
  const inputRef = React.useRef();
  const [showLogin, setShowLogin] = useState(false);

  const loginAnimation = new Animated.Value(scale(300));
  const brandAnimation = new Animated.Value(0);

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [enableSubmit, setEnableSubmit] = useState(true);

  useEffect(() => {
    if (password.length > 0 && userId.length > 0) {
      setEnableSubmit(false);
    } else {
      setEnableSubmit(true);
    }
  }, [password, userId]);

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(brandAnimation, {
        toValue: scale(-250),
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(loginAnimation, {
        toValue: scale(-55),
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const validateCreds = async () => {
    setLoading(true);
    let _data = {
      userId: userId,
      password: password,
      device_type: Platform.OS,
      device_model: DeviceInfo.getModel(),
      device_os: DeviceInfo.getSystemVersion(),
      device_manufacturer: await DeviceInfo.getManufacturer(),
      device_macAddress: await DeviceInfo.getMacAddress(),
      device_ipAddress: await DeviceInfo.getIpAddress(),
    };

    console.log('DeviceInfo : ', _data);
    let url = 'https://638309be6e6c83b7a98aaf20.mockapi.io/user';
    axios
      .post(url, _data)
      .then(function (response) {
        dispatch(updateUserData(response.data));
        setLoading(false);
        props.navigation.navigate('Details');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Spinner visible={loading} />
      <View style={styles.container}>
        <View style={styles.parent}>
          <View style={styles.child}>
            {!showLogin && (
              <Animated.View
                style={[
                  styles.textContainer,
                  {transform: [{translateY: brandAnimation}]},
                ]}>
                <Text style={styles.title}>{strings.title}</Text>
                <Text style={styles.description}>{strings.description}</Text>
              </Animated.View>
            )}
            <Animated.View
              style={[
                styles.textContainer,
                {transform: [{translateY: loginAnimation}]},
              ]}>
              <View style={styles.textFieldContainer}>
                <TextInput
                  mode="flat"
                  label="User ID"
                  style={styles.textfield}
                  underlineColor={colors.black}
                  activeUnderlineColor={colors.black}
                  value={userId}
                  onChangeText={val => setUserId(val)}
                />
              </View>
              <View style={styles.textFieldContainer}>
                <TextInput
                  label="Password"
                  secureTextEntry
                  style={styles.textfield}
                  underlineColor={colors.black}
                  activeUnderlineColor={colors.black}
                  value={password}
                  onChangeText={val => setPassword(val)}
                />
              </View>
            </Animated.View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          {showLogin ? (
            <>
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  {
                    backgroundColor: enableSubmit
                      ? colors.disableButton
                      : colors.black,
                  },
                ]}
                disabled={enableSubmit}
                onPress={() => {
                  validateCreds();
                }}>
                <Text style={styles.loginText}>{strings.submit}</Text>
              </TouchableOpacity>
              <View style={styles.forgotContainer}>
                <TouchableOpacity>
                  <Text style={{color: colors.buttonColor}}>
                    {strings.forgotUserId}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.middle}>|</Text>
                <TouchableOpacity>
                  <Text style={{color: colors.buttonColor}}>
                    {strings.forgotUserId}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.enable}>
                <Text style={{color: colors.buttonColor}}>
                  {strings.enableUserId}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {
                  startAnimation();
                  setTimeout(() => {
                    setShowLogin(true);
                  }, 300);
                }}>
                <Text style={styles.loginText}>{strings.login}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.fingerPrintContainer}>
                <View style={styles.fingerPrint}>
                  <Image
                    source={images.fingerprint}
                    style={styles.fingerPrintImg}
                  />
                  <Text style={styles.quickBal}>{strings.quickBal}</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
