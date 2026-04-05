import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import Config from 'react-native-config';
import type {RootStackNavigation} from '@/navigation/AppNavigator';

type Props = {
  navigation: RootStackNavigation;
};

function Found({navigation}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Found</Text>
      <Text style={styles.description}>这是 React Navigation 路由示例1111</Text>
      <Text style={styles.description}>API: {Config.API_URL}</Text>
      <Image source={require('@assets/images/avatar.png')} />
      {/* <Image source={require('../assets/images/avatar.png')} /> */}
      <View style={styles.buttonContainer}>
        <Button
          title="跳转到详情页"
          onPress={() =>
            navigation.navigate('Details', {message: '来自首页的问候!'})
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default Found;
