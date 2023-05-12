//
//  ActionTypes.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:06:43 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

const CREATE = "CREATE";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL, CREATE, UPDATE, DELETE].forEach(
    (type) => {
      res[type] = `${base}_${type}`;
    }
  );
  return res;
}
//DEFAULT ACTIONS
export const GENERAL_ACTION = "GENERAL_ACTION";
export const GENERAL_ACTION_MULTIPLE_REQUEST =
  "GENERAL_ACTION_MULTIPLE_REQUEST";
export const NO_INTERNET = "NO_INTERNET";
//SOCKET DEFAULT ACTIONS
export const SOCKET_INFO = createRequestTypes("SOCKET_INFO");
export const SOCKET_DUMP = createRequestTypes("SOCKET_DUMP");
export const SOCKET_WRITE = "SOCKET_WRITE";
//NETWORK DEFAULT ACTION
export const NETWORK_INFO = "NETWORK_INFO";
//LOCATION ACTIONS
export const USER_LOCATION = createRequestTypes("USER_LOCATION");
//APP GENERAL ACTIONS
export const LOGIN = createRequestTypes("LOGIN");
export const SET_HISTORY = "SET_HISTORY";
export const DELETE_ID = "DELETE_ID";
export const DELETE_ALL = "DELETE_ALL";
export const UPDATE_HISTORY = "UPDATE_HISTORY";
export const USER = createRequestTypes("USER");
export const ADD_HISTORY = createRequestTypes("ADD_HISTORY");
export const DUMP = createRequestTypes("DUMP");
export const LOCATION = createRequestTypes("LOCATION");
export const GET_FAVORITES = createRequestTypes("GET_FAVORITES");
export const GET_HISTORY = createRequestTypes("GET_HISTORY");
export const USER_PAYMENT_INFO = createRequestTypes("USER_PAYMENT_INFO");
export const INVOICE_LIST = createRequestTypes("INVOICE_LIST");
export const RECENT_SERVICES_LIST = createRequestTypes("RECENT_SERVICES_LIST");
export const INVOICE_PAY_CONFIRM = createRequestTypes("INVOICE_PAY_CONFIRM");
export const INVOICE_DETAIL = createRequestTypes("INVOICE_DETAIL");
export const SERVICE_PROVIDER = createRequestTypes("SERVICE_PROVIDER");
export const CUSTOMER_APPOINTMENT = createRequestTypes("CUSTOMER_APPOINTMENT");
export const MY_DAY = createRequestTypes("MY_DAY");
export const MY_DAY_DETAIL = createRequestTypes("MY_DAY_DETAIL");
export const CARD_TYPES = createRequestTypes("CARD_TYPES");
export const SERVICE_PROVIDER_DETAILS = createRequestTypes(
  "SERVICE_PROVIDER_DETAILS"
);
export const SIGNUP = createRequestTypes("SIGNUP");
export const FORGOT_PASSWORD = createRequestTypes("FORGOT_PASSWORD");
export const CHANGE_PASSWORD = createRequestTypes("CHANGE_PASSWORD");
export const LOGOUT = "LOGOUT";
//APP RELATED ACTIONS
//ADD HERE
