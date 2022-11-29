import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {store} from '../../store';
import {colors} from '../../styleguide/color';

const Details = () => {
  const {data} = store.getState().User;
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>User ID: {data?.userId}</Text>
      <Text style={styles.textStyle}>Device Ip: {data?.device_ipAddress}</Text>
      <Text style={styles.textStyle}>
        Device Manufacturer: {data?.device_manufacturer}
      </Text>
      <Text style={styles.textStyle}>Device Modal: {data?.device_model}</Text>
      <Text style={styles.textStyle}>Device OS: {data?.device_os}</Text>
      <Text style={styles.textStyle}>Device Type: {data?.device_type}</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: scale(20),
  },
  textStyle: {
    color: colors.black,
    fontSize: scale(17),
  },
});
