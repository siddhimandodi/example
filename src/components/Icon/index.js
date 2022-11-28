import React from 'react';
import {StyleSheet} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';

export default function Index(props) {
  const {style, ...rest} = props;
  return <FontIcon style={StyleSheet.flatten([style])} {...rest} />;
}
