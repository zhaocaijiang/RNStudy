import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'redux';
export interface HomeState {
    num: number;
}
interface HomeModel extends Model {
    namespace: 'home';
    state: {
        num: number;
    };
    reducers: {
        add: Reducer<HomeState>;
    };
    effects?: {
        asyncAdd: Effect;
    };
}
const intialState: HomeState = {
    num: 0,
};
const homeModel: HomeModel = {
    namespace: 'home',
    state: {
        num: 0,
    },
    reducers: {
        // add(state, action) {
        add(state = intialState, { payload }) {
            return { ...state, num: state.num + payload.num };
        },
    },
    effects: {
        *asyncAdd({ payload }, { call, put }) {
            // 模拟异步操作，例如 API 请求
            yield call(() => new Promise(resolve => setTimeout(resolve, 2000)));
            // 异步操作完成后，触发同步 reducer 更新状态
            yield put({ type: 'add', payload });
        },
    },
};
export default homeModel;
