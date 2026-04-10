import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeTabs from '@/navigation/HomeTabs';
import Listen from '@/pages/Listen';
import Found from '@/pages/Found';
import Account from '@/pages/Account';
import {Platform, StatusBar} from 'react-native';
import IconFont from '@assets/iconfont';

type BottomTabParamList = {
  HomeTabs: undefined;
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
              backgroundColor: 'red',
            },
            ios: {
              shadowOpacity: 0, // 去掉 iOS 的阴影
              backgroundColor: 'red',
            },
          }),
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerStatusBarHeight: StatusBar.currentHeight, // 避免从最顶端加载下来
      }}>
      <Tab.Screen
        name="HomeTabs"
        component={HomeTabs}
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
