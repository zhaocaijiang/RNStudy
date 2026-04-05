import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import BottomTabs from '@/navigation/BottomTabs';
import Details from '@/pages/Details';
// import {Platform} from 'react-native';

// 定义路由参数类型
export type RootStackParamList = {
  Home: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
  Details: {message: string};
};
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // 有tab这里的header就没生效了，tab里会有自己的header
          // headerStyle: {
          //   ...Platform.select({
          //     // 根据平台设置不同的样式
          //     android: {
          //       elevation: 0, // 去掉 Android 的阴影
          //       backgroundColor: '#2196F3',
          //     },
          //     ios: {
          //       shadowOpacity: 0, // 去掉 iOS 的阴影
          //       backgroundColor: 'red',
          //     },
          //   }),
          // },
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
          // headerTitleAlign: 'center',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="Home"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={() => ({
            title: '详情页',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
