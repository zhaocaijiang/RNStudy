import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import type {StackNavigationProp} from '@react-navigation/stack';
import Config from 'react-native-config';

type RootStackParamList = {
  Home: undefined;
  Details: {message: string};
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

function Home({navigation}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>首页</Text>
      <Text style={styles.description}>这是 React Navigation 路由示例2222</Text>
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

export default Home;
