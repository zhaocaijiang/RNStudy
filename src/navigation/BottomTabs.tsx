import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@/pages/Home';
import Listen from '@/pages/Listen';
import Found from '@/pages/Found';
import Account from '@/pages/Account';
import {Platform} from 'react-native';
import IconFont from '@assets/iconfont';

type BottomTabParamList = {
  TabHome: undefined;
  TabListen: undefined;
  TabFound: undefined;
  TabAccount: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabs(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#f86442',
        headerStyle: {
          ...Platform.select({
            // 根据平台设置不同的样式
            android: {
              elevation: 0, // 去掉 Android 的阴影
              backgroundColor: '#2196F3',
            },
            ios: {
              shadowOpacity: 0, // 去掉 iOS 的阴影
              backgroundColor: 'red',
            },
          }),
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      <Tab.Screen
        name="TabHome"
        component={Home}
        options={{
          title: '首页',
          tabBarLabel: '首页',
          tabBarIcon: ({color, size}) => (
            <IconFont name="toutiao-shouye" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TabListen"
        component={Listen}
        options={{
          title: '听书',
          tabBarLabel: '听书',
          tabBarIcon: ({color, size}) => (
            <IconFont name="toutiao-yuedu" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TabFound"
        component={Found}
        options={{
          title: '发现',
          tabBarLabel: '发现',
          tabBarIcon: ({color, size}) => (
            <IconFont name="toutiao-sousuo" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TabAccount"
        component={Account}
        options={{
          title: '我的',
          tabBarLabel: '我的',
          tabBarIcon: ({color, size}) => (
            <IconFont name="toutiao-wode" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
