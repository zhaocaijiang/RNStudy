import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '@/pages/HomeScreen';
// import HomeScreen from '../pages/HomeScreen';
import DetailsScreen from '../pages/DetailsScreen';

// 定义路由参数类型
export type RootStackParamList = {
  Home: undefined;
  Details: {message: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '首页',
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={() => ({
            title: '详情页',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
