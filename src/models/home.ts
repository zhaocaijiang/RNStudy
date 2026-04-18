import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'redux';
import { getCarouselList, getGuessList } from '@/service/home';

interface GuessList {
    image: string;
    // 其他字段根据实际数据结构添加
}
export interface HomeState {
    num: number;
    carouselList: string[]; // 轮播图数据
    guessList: GuessList[]; // 猜你喜欢数据
}
interface HomeModel extends Model {
    namespace: 'home';
    state: {
        num: number;
        carouselList: string[]; // 轮播图数据
        guessList: GuessList[]; // 猜你喜欢数据
    };
    reducers: {
        add: Reducer<HomeState>;
        save: Reducer<HomeState>;
    };
    effects?: {
        asyncAdd: Effect;
        getCarouselList: Effect;
        getGuessList: Effect;
    };
}
const intialState: HomeState = {
    num: 0,
    carouselList: [], // 轮播图数据
    guessList: [], // 猜你喜欢数据
};
const homeModel: HomeModel = {
    namespace: 'home',
    state: {
        num: 0,
        carouselList: [], // 轮播图数据
        guessList: [], // 猜你喜欢数据
    },
    reducers: {
        // add(state, action) {
        add(state = intialState, { payload }) {
            return { ...state, num: state.num + payload.num };
        },
        save(state = intialState, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *asyncAdd({ payload }, { call, put }) {
            // 模拟异步操作，例如 API 请求
            yield call(() => new Promise(resolve => setTimeout(resolve, 2000)));
            // 异步操作完成后，触发同步 reducer 更新状态
            yield put({ type: 'add', payload });
        },
        *getCarouselList(_, { call, put }) {
            const { data } = yield call(getCarouselList);
            // 异步操作完成后，触发同步 reducer 更新状态
            yield put({ type: 'save', payload: { carouselList: data.data?.map((it: { image: string }) => it.image) } });
        },
        *getGuessList(_, { call, put }) {
            const { data } = yield call(getGuessList);
            // 异步操作完成后，触发同步 reducer 更新状态
            yield put({ type: 'save', payload: { guessList: data.data } });
        }
    },
};
export default homeModel;
