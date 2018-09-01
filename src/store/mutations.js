import * as types from './mutation-types'
const mutations = {
  /**
   * 刷新标志位
   */
  [types.SET_REFRESH_FLAG](state, value) {
    state.refresh = value;
  },
  /**
   * 首页科目
   */
  [types.SET_SUBJECT](state, value) {
    state.subject = value;
  },
  /**
   * 城市前缀
   */
  [types.SET_CITY_PREFIX](state, value) {
    state.prefix = value;
  },
};
export default mutations
