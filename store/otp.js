import {api, api2} from '../api/otp'
import axios from "axios";


const state = () => ({
  otp: null,
  mobile: "",
  country: "",
  waitForOTP: false,
  waitForVerify: false,
  waitForResend: false,
  isNew: false,


})

export const getters = {
  GET_OTP: (state, status) => {
    return state.otp
  },
  GET_MOBILE: (state, status) => {
    return state.mobile
  },
  GET_COUNTRY: (state, status) => {
    return state.country
  },
  GET_WAIT_FOR_OTP: (state, status) => {
    return state.waitForOTP
  },
  GET_WAIT_FOR_VERIFY: (state, status) => {
    return state.waitForVerify
  },
  GET_WAIT_FOR_RESEND: (state, status) => {
    return state.waitForResend
  },
  GET_IS_NEW: (state, status) => {
    return state.isNew
  }
}

const mutations = {
  SET_ACCESS_TOKEN: async (state, accessToken) => {
    state.accessToken = accessToken
  },
  SET_OTP: (state, status) => {
    state.otp = status
  },
  SET_MOBILE: (state, status) => {
    state.mobile = status
  },
  SET_COUNTRY: (state, status) => {
    state.country = status
  },
  SET_WAIT_FOR_OTP: (state, status) => {
    state.waitForOTP = status
  },
  SET_WAIT_FOR_VERIFY: (state, status) => {
    state.waitForVerify = status
  },
  SET_WAIT_FOR_RESEND: (state, status) => {
    state.waitForResend = status
  },
  SET_IS_NEW: (state, status) => {
    state.isNew = status
  }
}

const actions = {


  otp({commit, dispatch, redirect}, reference) {
    return new Promise((resolve, reject) => {

      const bodyFormData = new FormData();
      for (var key in reference.request) {
        bodyFormData.append(key, reference.request[key]);
      }
      api(axios, "user/mobile", bodyFormData).then(response => {

        if (!response.data.result) {
          reference.error = true
          reference.isLoading = false
          return
        }
        commit("SET_MOBILE", reference.request.mobile)
        reference.done()
        resolve()
      }).catch(error => {
        reference.error = true
        reference.isLoading = false
      })
    })
  },


  verify({dispatch, commit, state}, reference) {
    return new Promise((resolve, reject) => {
      const bodyFormData = new FormData();

      bodyFormData.append('mobile', state.mobile);
      bodyFormData.append('country', "IR");
      bodyFormData.append('source', "dafi");
      bodyFormData.append('otp', reference.otp);
      api2(axios, 'user/verify', bodyFormData, this).then(response => {

        if (!response.data.result) {
          let errorText = "";
          reference.message = response.data.error.message
          reference.resetOtp();
          return
        }
        reference.showResult()
      }).catch(error => {
        let errorText = error
        if (error.response) {
          errorText = "";
          let object = error.response.data.error.message
          Object.keys(object).map(function (key, index) {
            errorText += key + " : " + object[key] + "  <br> ";
          });
        }
        reference.message = errorText
        reference.resetOtp();
        reject(error)
      })
    });
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
