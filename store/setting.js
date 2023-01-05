const state = () => ({
  ratio: (window.innerWidth > 1024
      ? 1024
      : window.innerWidth) /
    1024,
  maxWidth: 1024,



})

const mutations = {
  // SET_DATA: async (state, status) => {
  //   state.data = status
  // },

}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
