/**
 * Created by kuo zi on 2016/10/20.
 */
const state = {
  activeNav: null
};

const mutations = {
  activeNav(state, activeNav){
    state.activeNav = activeNav;
  }
};

const actions = {
  activeNav: ({commit}, activeNav)=> {
    commit("activeNav", activeNav);
  }
};

export default {
  state,
  mutations,
  actions
};
