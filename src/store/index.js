//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:39:19 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import reducers from "../reducers";
import rootSaga from "../sagas";
import AsyncStorage from "@react-native-community/async-storage";

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

/* redux logger config */
const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
});

/* redux persist config */
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "setHistory"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

/* saga config */
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware, logger)
);
const persistor = persistStore(store);

// run the saga
sagaMiddleware.run(rootSaga);

export { store, persistor };
