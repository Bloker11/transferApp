import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  GET_TRANS_BEGIN,
  GET_TRANS_SUCCESS,
  GET_TRANS_ERROR,
  HANDLE_CHANGE,
  MAKE_DEPOSIT_BEGIN,
  MAKE_DEPOSIT_SUCCESS,
  MAKE_DEPOSIT_ERROR,
  SEND_MONEY_BEGIN,
  SEND_MONEY_SUCCESS,
  SEND_MONEY_ERROR,
  WITHDRAW_BEGIN,
  WITHDRAW_SUCCESS,
  WITHDRAW_ERROR

} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User created! Redirecting...",
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertText: "Successfully logged in!",
      alertType: "success",
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }
  if(action.type === UPDATE_USER_BEGIN){
    return {...state, isLoading:true}
  }

  if(action.type === UPDATE_USER_SUCCESS){
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertText: "Successfully updated!",
      alertType: "success",
    };
  }

  if(action.type === UPDATE_USER_ERROR){
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
   if (action.type === TOGGLE_SIDEBAR) {
     return { ...state, showSidebar: !state.showSidebar };
   }
   if(action.type === GET_TRANS_BEGIN){
    return {...state, isLoading:true}
   }
   if(action.type === GET_TRANS_SUCCESS){
    return {
      ...state,
      trans: action.payload.transactions,
      amount: action.payload.amounts,
      isLoading: false,
      totalTrans: action.payload.transactions.length,
      sender: action.payload.names
    };
   }
   if (action.type === HANDLE_CHANGE) {
     return {
       ...state,
       page: 1,
       [action.payload.name]: action.payload.value,
     };
   }
   if (action.type === MAKE_DEPOSIT_BEGIN) {
      return { ...state, isLoading: true };
    }
    if (action.type === MAKE_DEPOSIT_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        showAlert: true,
        alertText: "Your deposit was completed successfully",
        alertType: "success",
      };
    }
    if(action.type === MAKE_DEPOSIT_ERROR){
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };
    }
    if (action.type === SEND_MONEY_BEGIN) {
      return { ...state, isLoading: true };
    }
    if (action.type === SEND_MONEY_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        showAlert: true,
        alertText: "Money was sent successfully",
        alertType: "success",
      };
    }

    if(action.type === SEND_MONEY_ERROR){
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };
    }

    if (action.type === WITHDRAW_BEGIN) {
      return { ...state, isLoading: true };
    }
    if (action.type === WITHDRAW_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        showAlert: true,
        alertText: "Withdrawal completed successfully",
        alertType: "success",
      };
    }

    if(action.type === WITHDRAW_ERROR){
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };
    }

  throw new Error(`no such action :${action.type}`);
};
export default reducer;
