import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import Config from 'react-native-config';
import type {RootStackNavigation} from '@/navigation/AppNavigator';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models';
import IconFont from '@assets/iconfont';

const connector = connect(({home ,loading}: RootState) => ({
  num: home.num,
  loading: loading.effects['home/asyncAdd'],
}));

type ModelState = ConnectedProps<typeof connector>;

type Props = ModelState & {
  navigation: RootStackNavigation;
};

function Home({navigation, num, dispatch, loading}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>首页{num}</Text>
      <Text style={styles.description}>state: {num}</Text>
      <Text style={styles.description}> {loading ? '正在计算中...' : '计算完成'}</Text>
      <Text style={styles.description}>API: {Config.API_URL}</Text>
      <Image source={require('@assets/images/avatar.png')} />
      <IconFont name="toutiao-shouye" size={30} color="#f86442" />
      {/* <Image source={require('../assets/images/avatar.png')} /> */}
      <View style={styles.buttonContainer}>
        <View style={styles.addButton}>
          <Button
            title="add" // React Native 的 Button 组件会自动将 title 转为大写显示（Android 平台行为）。
            //  这是 Android 的 Material Design 默认风格，无法通过属性关闭。如果不想要大写效果，需要用 TouchableOpacity 或      Pressable 自定义按钮来替代。
            onPress={() => dispatch({type: 'home/add', payload: {num: 1}})}
          />
        </View>
        <View style={styles.addButton}>
          <Button
            title="asyncAdd"
            onPress={() => dispatch({type: 'home/asyncAdd', payload: {num: 1}})}
          />
        </View>
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
  addButton: {
    marginBottom: 16,
  },
});

export default connector(Home);
