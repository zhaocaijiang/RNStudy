import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Details: {message: string};
};

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

function Details({navigation, route}: Props): React.JSX.Element {
  const {message} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>详情页</Text>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.buttonContainer}>
        <Button title="返回首页" onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="再次跳转到详情页"
          onPress={() => navigation.push('Details', {message: '新的详情页'})}
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
  message: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default Details;
