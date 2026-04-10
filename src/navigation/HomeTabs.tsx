import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';

const Tab = createMaterialTopTabNavigator();

function HomeTabs(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        // tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          height: 4,
          width: 100,
          marginLeft: 20,
          backgroundColor: '#f86442',
          borderRadius: 2,
        },
        tabBarActiveTintColor: '#f86442',
        tabBarInactiveTintColor: '#333',
      }}>
      <Tab.Screen name="Home1" component={Home} options={{title: '推荐'}}/>
      <Tab.Screen name="Home2" component={Home} options={{title: '热门'}}/>
      <Tab.Screen name="Home3" component={Home} options={{title: '最新'}}/>
    </Tab.Navigator>
  );
}

export default HomeTabs;
