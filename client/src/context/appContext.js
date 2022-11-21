import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
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

const AppContext = React.createContext();

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,
  search: "",
  transactionType: ["send", "withdraw", "deposit"],
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  sort: "latest",
  searchType: "all",
  trans: [],
  amount: [],
  totalTrans: 0,
  sender: [],
  page: 1,
  receiver: '',
  ilosc: 0,
  receiver: ''

};

axios.defaults.withCredentials = true;

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
    const handleChange = ({ name, value }) => {
      dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
    };
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      const { user, token } = response.data;
      addUserToLocalStorage({ user, token });
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
        },
      });
    } catch (err) {
      dispatch({
        REGISTER_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token } = response.data;
      addUserToLocalStorage({ user, token });
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
    } catch (err) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const response = await axios.patch(
        "/api/v1/auth/updateUser",
        currentUser
      );
      const { user, token } = response.data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });

    } catch (err) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();

  };

  const getTrans = async (currentUser, token) => {
    dispatch({ type: GET_TRANS_BEGIN });
    try {
      const response = await axios.get(`/api/v1/trans/m/${currentUser._id}`, {
        headers: { Authorization: "Bearer " + `${token}` },
      });
      let transactions = [];
      let amounts = [];
      let names = [];

      for (let i = 0; i < response.data.length; i++) {
        const { amount, trans } = response.data[i];
        const { name } = response.data[i].sender;
        transactions.push(trans);
        amounts.push(amount);
        names.push(name)
      }
      
      dispatch({
        type: GET_TRANS_SUCCESS,
        payload: { amounts, transactions, names },
      });
    } catch (err) {
      console.log(err);
    }
    clearAlert();

  };

  const makeDeposit = async (difference, token, userId, tType)=>{
    dispatch({ type: MAKE_DEPOSIT_BEGIN });
    try{
      const response = await axios.post(`/api/v1/trans/deposit`, 
        {
          senderId: userId,
          difference,
          trans: tType
        },
        {
          headers: { 
            Authorization: "Bearer " + `${token}` 
          },
        }
      );

      const user = response.data?.updatedUser
      addUserToLocalStorage({user, token})
      dispatch({
        type: MAKE_DEPOSIT_SUCCESS,
        payload: { user, token },
      })

    }catch(err){
      dispatch({
        type: MAKE_DEPOSIT_ERROR,
        payload: {msg: err.response.data.msg}
      })
    }
    clearAlert();

  }

  const sendMoney = async (difference, token, recipient)=>{
    dispatch({type: SEND_MONEY_BEGIN})
    try{
      const response = await axios.post(`/api/v1/trans/send`, 
        {
          receiver: recipient,
          difference,
        },
        {
          headers: { 
            Authorization: "Bearer " + `${token}` 
          },
        }
      );

      const user = response.data?.initiator
      addUserToLocalStorage({user, token})
      dispatch({
        type: SEND_MONEY_SUCCESS,
        payload: { user, token },
      })

    }catch(err){
      dispatch({
        type: SEND_MONEY_ERROR,
        payload: {msg: err.response.data.msg}
      })
    }
    clearAlert();

  }

  const withdraw = async (difference, token )=>{
    dispatch({type: WITHDRAW_BEGIN})
    try{
      const response = await axios.get(`/api/v1/trans/withdrawal/${difference}`, 
        {
          headers: { 
            Authorization: "Bearer " + `${token}` 
          },
        }
      );

      const user = response.data?.user
      addUserToLocalStorage({user, token})
      dispatch({
        type: WITHDRAW_SUCCESS,
        payload: { user, token },
      })

    }catch(err){
      dispatch({
        type: WITHDRAW_ERROR,
        payload: {msg: err.response.data.msg}
      })
    }
    clearAlert();

  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        registerUser,
        loginUser,
        logoutUser,
        toggleSidebar,
        updateUser,
        getTrans,
        handleChange,
        makeDeposit,
        sendMoney,
        withdraw
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
