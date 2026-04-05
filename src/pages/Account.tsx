import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {RootStackNavigation} from '@/navigation/AppNavigator';

type Props = {
  navigation: RootStackNavigation;
};

function Account({navigation}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>我的</Text>
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
});

export default Account;
