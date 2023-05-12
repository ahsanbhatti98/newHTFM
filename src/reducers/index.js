//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:21:40 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { combineReducers } from "redux";
import serviceReducer from "./serviceReducer";
import {
  LOGIN,
  USER,
  LOCATION,
  USER_ADDRESS_INFO,
  USER_PAYMENT_INFO,
  SERVICE_PROVIDER,
  SERVICE_PROVIDER_DETAILS,
  CUSTOMER_APPOINTMENT,
  INVOICE_PAY_CONFIRM,
  SIGNUP,
  GET_HISTORY,
  MY_DAY,
  DUMP,
  SOCKET_INFO,
  LIST_GEOFANCE,
  USER_LOCATION,
  REAL_TIME_TRACKING,
  INVOICE_LIST,
  INVOICE_DETAIL,
  LOGOUT,
  MY_DAY_DETAIL,
  GET_FAVORITES,
  SOCKET_DUMP,
  ADD_HISTORY,
  RECENT_SERVICES_LIST,
  CARD_TYPES,
} from "../actions/ActionTypes";
import userLocation from "../reducers/userLocation";
import setHistory from "../reducers/setHistory";
const appReducer = combineReducers({
  user: serviceReducer(USER),
  dump: serviceReducer(DUMP),
  location: serviceReducer(LOCATION),
  get_history: serviceReducer(GET_HISTORY),
  user_payment_info: serviceReducer(USER_PAYMENT_INFO),
  invoice_list: serviceReducer(INVOICE_LIST),
  invoice_detail: serviceReducer(INVOICE_DETAIL),
  service_provider_details: serviceReducer(SERVICE_PROVIDER_DETAILS),
  service_provider: serviceReducer(SERVICE_PROVIDER),
  my_day_detail: serviceReducer(MY_DAY_DETAIL),
  invoice_pay_confirm: serviceReducer(INVOICE_PAY_CONFIRM),
  my_day: serviceReducer(MY_DAY),
  customer_appointment: serviceReducer(CUSTOMER_APPOINTMENT),
  singupReducer: serviceReducer(SIGNUP),
  card_types: serviceReducer(CARD_TYPES),
  add_history: serviceReducer(ADD_HISTORY),
  get_favorites: serviceReducer(GET_FAVORITES),
  userLocation,
  setHistory,
  recentServices: serviceReducer(RECENT_SERVICES_LIST),
});

const rootReducer = (state, action) => {
  const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
      const { user, ...rest } = state;
      state = {
        ...rest,
        user: { ...user, data: [] },
      };
    }
  };
  return appReducer(state, action);
};

export default rootReducer;
