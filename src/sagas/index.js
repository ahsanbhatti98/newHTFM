//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:29:53 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { fork } from "redux-saga/effects";
import init from "./init";
import serviceSaga from "./serviceSaga";
// import socketConnectionSaga from "./SocketSaga/socketConnectionSaga";
// import socketDataSaga from "./SocketSaga/socketDataSaga";
export default function* root() {
    yield fork(init);
    yield fork(serviceSaga);
    // yield fork(socketConnectionSaga);
    // yield fork(socketDataSaga);
}
