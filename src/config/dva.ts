import {create} from 'dva-core-ts';
import createLoading from 'dva-loading-ts';
import models from '../models';
// 1、创建实例
const app = create();
app.use(createLoading());
// 2、注册 model
models.forEach(model => app.model(model));
// 3、启动应用
app.start();
// 4、导出 app
const store = app._store;
export default store;
