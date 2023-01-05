const state = () => ({
  answer_1: 0, answer_2: 0, answer_3: 0, answer_4: 0, answer_5: 0, answer_6: 0,
})

const mutations = {
  SET_ANSWER_1: async (state, status) => {
    state.answer_1 = status
  }, SET_ANSWER_2: async (state, status) => {
    state.answer_2 = status
  }, SET_ANSWER_3: async (state, status) => {
    state.answer_3 = status
  }, SET_ANSWER_4: async (state, status) => {
    state.answer_4 = status
  }, SET_ANSWER_5: async (state, status) => {
    state.answer_5 = status
  }, SET_ANSWER_6: async (state, status) => {
    state.answer_6 = status
  },
}

const actions = {
  answer_1({commit, dispatch, redirect, rootState}, value) {
    commit('SET_ANSWER_1', value)
  },
  answer_2({commit, dispatch, redirect, rootState}, value) {
    commit('SET_ANSWER_2', value)
  },
  answer_3({commit, dispatch, redirect, rootState}, value) {
    commit('SET_ANSWER_3', value)
  },
  answer_4({commit, dispatch, redirect, rootState}, value) {
    commit('SET_ANSWER_4', value)
  },
  answer_5({commit, dispatch, redirect, rootState}, value) {
    commit('SET_ANSWER_5', value)
  },
  answer_6({commit, dispatch, redirect, rootState}, value) {
    commit('SET_ANSWER_6', value)
  },
}

export default {
  namespaced: true, state, mutations, actions
}
