import React from 'react';
import {View, Text, Button, StyleSheet, Image, ScrollView} from 'react-native';
import type {RootStackNavigation} from '@/navigation/AppNavigator';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models';
import IconFont from '@assets/iconfont';
import Carousel from './Carousel';
import Guess from './Guess';

const connector = connect(({home, loading}: RootState) => ({
  num: home.num,
  carouselList: home.carouselList,
  loading: loading.effects['home/asyncAdd'],
}));

type ModelState = ConnectedProps<typeof connector>;

type Props = ModelState & {
  navigation: RootStackNavigation;
};

function Home({navigation, num, dispatch, loading ,carouselList}: Props): React.JSX.Element {

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Carousel
        // data={[
        //   'https://cdn.pixabay.com/photo/2026/04/14/11/47/geralt-elderly-10226113_640.jpg',
        //   'https://cdn.pixabay.com/photo/2026/04/10/11/08/geralt-relaxation-10219128_1280.jpg',
        //   'https://cdn.pixabay.com/photo/2026/04/03/07/45/geralt-students-10206633_1280.jpg',
        // ]}
        data={carouselList}
      />
      <Guess />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    paddingTop: 16,
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
