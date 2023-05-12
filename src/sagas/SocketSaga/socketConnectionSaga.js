//
//  socketConnectionSaga.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:30:27 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { take, put, call, fork } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import * as types from "../../actions/ActionTypes";
// import SocketTcp from "../../services/SocketTcp";
import { success, failure } from "../../actions/ServiceAction";

function createConnection() {
    return eventChannel(emitter => {
        const success = status => {
            var connected = true;
            if (status === "connect") {
                connected = true;
            } else {
                connected = false;
            }
            console.log("createConnection", connected);
            emitter(connected);
        };
        const failure = error => {
            const connected = true;

            if (error === undefined) {
                connected = false;
            }

            emitter(new Error(JSON.stringify({ connected })));
        };
        // SocketTcp.onCustom("connect", () => success("connect"));
        // SocketTcp.onCustom("close", () => success("close"));
        // SocketTcp.onCustom("error", () => success("error"));
        // SocketTcp.onCustom("timeout", () => success("timeout"));
        const unsubscribe = () => {};
        return unsubscribe;
    });
}

export function* watchConnection() {
    const socketChannel = yield call(createConnection);
    while (true) {
        try {
            const connected = yield take(socketChannel);
            yield put(success(types.SOCKET_INFO, { connected }));
        } catch (err) {
            yield put(failure(types.SOCKET_INFO, JSON.parse(err.message)));
            console.log("socket error:", err.message);
        }
    }
}
export default function* root() {
    yield fork(watchConnection);
}
