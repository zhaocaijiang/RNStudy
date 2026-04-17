import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
  View,
} from 'react-native';
import {viewportWidth, wp} from '@/utils';

const SCREEN_WIDTH = viewportWidth;
const ITEM_WIDTH = SCREEN_WIDTH;
const IMAGE_HEIGHT = wp(45);

interface CarouselProps {
  data: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  data,
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const startAutoPlay = () => {
    if (!autoPlay || data.length <= 1) {
      return;
    }
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      const next = (currentIndex.current + 1) % data.length;
      currentIndex.current = next;
      setActiveIndex(next);
      flatListRef.current?.scrollToIndex({index: next, animated: true});
    }, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        currentIndex.current = viewableItems[0].index;
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / ITEM_WIDTH);
    if (newIndex >= 0 && newIndex < data.length) {
      currentIndex.current = newIndex;
      setActiveIndex(newIndex);
    }
    startAutoPlay();
  };

  React.useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}: {item: string}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item}} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold: 50}}
        onScrollBeginDrag={stopAutoPlay}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
      />
      <View style={styles.dots}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: IMAGE_HEIGHT + 24,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
  },
  image: {
    width: wp(94),
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#f86442',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default Carousel;
