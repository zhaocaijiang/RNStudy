import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models';
import {wp} from '@/utils';

const connector = connect(({home, loading}: RootState) => ({
  guessList: home.guessList,
  loading: loading.effects['home/getGuessList'],
}));

type ModelState = ConnectedProps<typeof connector>;

interface GuessItem {
  image: string;
  title?: string;
  price?: number | string;
  [key: string]: any;
}

const ITEM_WIDTH = wp(30);

const Guess: React.FC<ModelState> = ({guessList, loading, dispatch}) => {
  const loadData = () => {
    dispatch({type: 'home/getGuessList'});
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderRows = () => {
    const items = guessList as GuessItem[];
    const rows = [];
    for (let i = 0; i < items.length; i += 3) {
      const rowItems = items.slice(i, i + 3);
      rows.push(
        <View key={i} style={styles.row}>
          {rowItems.map((item, index) => (
            <View key={i + index} style={styles.item}>
              <Image source={{uri: item.image}} style={styles.image} />
              <Text style={styles.title} numberOfLines={2}>
                {item.title || '推荐内容'}
              </Text>
            </View>
          ))}
        </View>,
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>猜你喜欢</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={loadData}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#f86442" />
          ) : (
            <Text style={styles.refreshButtonText}>刷新</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {guessList && guessList.length > 0 ? (
          renderRows()
        ) : !loading ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>暂无数据</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    marginTop: 12,
  },
  item: {
    width: ITEM_WIDTH,
    alignItems: 'center',
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    resizeMode: 'cover',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 12,
    color: '#333',
    marginTop: 6,
    lineHeight: 16,
    textAlign: 'center',
    width: ITEM_WIDTH,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
  refreshButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f86442',
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButtonText: {
    color: '#f86442',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default connector(Guess);
