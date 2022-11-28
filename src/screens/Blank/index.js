import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { colors } from '../../styleguide/color';

export default class Blank extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}> UnderConstruction </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  textStyle:{
    color: colors.black
  }
});
