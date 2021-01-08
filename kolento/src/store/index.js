// store
// 数据存储集合,所有信息的集合
// store本身并不清楚需要修改哪些数据
import {createStore} from 'redux';
import reducer from './reducer';

// 引入createStore来创建store
const store = createStore(reducer);
export default store;