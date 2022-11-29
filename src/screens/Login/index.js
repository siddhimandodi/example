import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Animated,
  KeyboardAvoidingView,
  Dimensions,
  SafeAreaView,
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

const {width, height} = Dimensions.get('screen');

const Login = props => {
  const inputRef = React.useRef();

  const TopHalfCircleAnimation = useRef(new Animated.Value(0)).current;
  const MiddleHalfCircleAnimation = useRef(new Animated.Value(0)).current;
  const WholeCircleHalf = useRef(new Animated.Value(0)).current;

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [enableSubmit, setEnableSubmit] = useState(true);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          commonAnimation(TopHalfCircleAnimation, 1),
          commonAnimation(MiddleHalfCircleAnimation, 1),
        ]),
        Animated.parallel([
          commonAnimation(TopHalfCircleAnimation, 0),
          commonAnimation(MiddleHalfCircleAnimation, 0),
        ]),
      ]),
    ).start();
  }, []);

  const commonAnimation = (data, value) => {
    return Animated.timing(data, {
      toValue: value,
      duration: 2000,
      useNativeDriver: true,
    });
  };

  useEffect(() => {
    if (password.length > 0 && userId.length > 0) {
      setEnableSubmit(false);
    } else {
      setEnableSubmit(true);
    }
  }, [password, userId]);

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
    dispatch(updateUserData(_data));
    let url = 'https://638309be6e6c83b7a98aaf20.mockapi.io/user';
    axios
      .post(url, _data)
      .then(function (response) {
        // dispatch(updateUserData(response.data));
        setLoading(false);
        props.navigation.navigate('Details');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Spinner visible={loading} />
        <View style={styles.mainView}>
          {/* circle layer */}
          <Animated.View
            style={{
              position: 'absolute',
              transform: [
                {
                  translateY: WholeCircleHalf.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -height / 8],
                  }),
                },
              ],
            }}>
            <Animated.View style={styles.mainDarkLayer} />
            <Animated.View
              style={[
                styles.middleLayer,
                {
                  transform: [
                    {scaleX: 2},
                    {scaleY: 1},
                    {
                      translateY: MiddleHalfCircleAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-height / 2, -height / 2.05],
                      }),
                    },
                    {
                      translateX: MiddleHalfCircleAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-width * 0.12, -width * 0.1],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.thirdLayer,
                {
                  height: height / 1.2,
                  transform: [
                    {scaleX: 2},
                    {scaleY: 1},
                    {
                      translateY: TopHalfCircleAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-height / 2.2, -height / 2.1],
                      }),
                    },
                    {
                      translateX: TopHalfCircleAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-width * 0.22, -width * 0.24],
                      }),
                    },
                  ],
                },
              ]}
            />
          </Animated.View>

          {/* Input View */}
          <View style={styles.textContainer}>
            <Animated.View
              style={{
                opacity: WholeCircleHalf.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
                transform: [
                  {
                    translateY: WholeCircleHalf.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height / 8, height / 14],
                    }),
                  },
                ],
              }}>
              <Text style={styles.title}>{strings.title}</Text>
              <Text style={styles.description}>{strings.description}</Text>
            </Animated.View>

            {/* Back button */}
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  opacity: WholeCircleHalf.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                  transform: [
                    {
                      translateY: WholeCircleHalf.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-height / 18, -height / 5],
                      }),
                    },
                  ],
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  inputRef.current.blur();
                  Animated.timing(WholeCircleHalf, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                  }).start();
                }}>
                <Icon name="chevron-left" color={colors.white} />
              </TouchableOpacity>
            </Animated.View>

            {/* TextInput */}
            <Animated.View
              style={[
                styles.textFieldContainer,
                {
                  opacity: WholeCircleHalf.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                  transform: [
                    {
                      translateY: WholeCircleHalf.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height / 10, height / 95],
                      }),
                    },
                  ],
                },
              ]}>
              <TextInput
                mode="flat"
                label="User ID"
                style={styles.textfield}
                underlineColor={colors.buttonColor}
                activeUnderlineColor={colors.buttonColor}
                value={userId}
                ref={inputRef}
                onChangeText={val => setUserId(val)}
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.textFieldContainer,
                {
                  marginTop: 20,
                  opacity: WholeCircleHalf.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                  transform: [
                    {
                      translateY: WholeCircleHalf.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height / 10, height / 225],
                      }),
                    },
                  ],
                },
              ]}>
              <TextInput
                label="Password"
                secureTextEntry
                style={styles.textfield}
                underlineColor={colors.buttonColor}
                activeUnderlineColor={colors.buttonColor}
                value={password}
                onChangeText={val => setPassword(val)}
              />
            </Animated.View>

            <Animated.View
              style={[
                {
                  alignItems: 'center',
                  opacity: WholeCircleHalf.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                  transform: [
                    {
                      translateY: WholeCircleHalf.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height / 8, height / 12],
                      }),
                    },
                  ],
                },
              ]}>
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
            </Animated.View>
            <Animated.View
              style={[
                styles.forgotContainer,
                {
                  opacity: WholeCircleHalf.interpolate({
                    inputRange: [0, 0.7, 1],
                    outputRange: [0, 0.5, 1],
                  }),
                  transform: [
                    {
                      translateY: WholeCircleHalf.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height / 8, height / 10],
                      }),
                    },
                  ],
                },
              ]}>
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
            </Animated.View>
          </View>

          <View style={styles.bottomContainer}>
            <Animated.View
              style={[
                {
                  alignItems: 'center',
                  opacity: WholeCircleHalf.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                  transform: [
                    {
                      translateY: WholeCircleHalf.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -height / 6],
                      }),
                    },
                  ],
                },
              ]}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {
                  Animated.timing(WholeCircleHalf, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                  }).start();
                  setTimeout(() => {
                    inputRef.current.focus();
                  }, 400);
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
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;
