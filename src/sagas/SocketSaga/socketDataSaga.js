//
//  socketDataSaga.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:30:35 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { take, put, call, fork } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import * as types from "../../actions/ActionTypes";
// import SocketTcp from "../../services/SocketTcp";
import { success, failure } from "../../actions/SocketAction";
import { showSpinner, hideSpinner } from "react-native-globalspinner";
import constant from "../../constants";
import { showMessage } from "react-native-flash-message";
var _showMessage = false;
function* requestWriteSocket() {
    while (true) {
        const {
            payload,
            service,
            request_type,
            showHud,
            showMsg,
            writeable
        } = yield take(types.SOCKET_WRITE);
        _showMessage = showMsg;
        if (showHud) {
            showSpinner();
        }
        if (writeable) {
            // SocketTcp.write(service, payload);
        }
    }
}
function createConnection() {
    return eventChannel(emitter => {
        const success = data => {
            type = responseInterceptor(data);
            if (data.status) {
                emitter({ type, data });
            } else {
                emitter(new Error(JSON.stringify({ type, data })));
            }
        };
        // SocketTcp.on(success);
        console.log("createConnection-SocketTcp-data");
        const unsubscribe = () => {};
        return unsubscribe;
    });
}

export function* watchSocketData() {
    const socketChannel = yield call(createConnection);
    while (true) {
        try {
            const { type, data } = yield take(socketChannel);
            _type = type;
            hideSpinner();
            if (_showMessage) {
                showMessage({
                    message: data.reason,
                    type: "success",
                    icon: "success"
                });
                _showMessage = false;
            }
            yield put(success(type, data.data));
        } catch (err) {
            hideSpinner();
            try {
                const { type, data } = JSON.parse(err.message);

                showMessage({
                    message: data.reason,
                    type: "danger",
                    icon: "danger"
                });
                _showMessage = false;
                yield put(failure(type, data.reason));
            } catch (err) {
                console.log(err);
            }
        }
    }
}
export default function* root() {
    yield fork(watchSocketData);
    yield fork(requestWriteSocket);
}
function responseInterceptor(response) {
    switch (response.packet_code) {
        case constant.signup.packet_code:
        case constant.userLogin.packet_code:
            return types.LOGIN;
        case constant.listGeofence.packet_code:
            return types.LIST_GEOFANCE;
        case constant.listHistory.packet_code:
            return types.HISTORY_DETAIL;
        case constant.realTimeTracking.packet_code:
            return types.REAL_TIME_TRACKING;
        case constant.alarmSetting.packet_code:
            return types.ALARM_SETTING;
        case constant.antiHarassment.packet_code:
            return types.ANTI_HARASSEMENT;
        case constant.defaultGeofence.packet_code:
            return types.DEFAULT_GEOFANCE;
        case constant.helpFaq.packet_code:
            return types.HELP_FAQ;
        case constant.addGeofence.packet_code:
            return types.ADD_GEOFANCE;
        case constant.deleteGeofence.packet_code:
            return types.DELETE_GEOFANCE;
        case constant.changePassword.packet_code:
            return types.CHANGE_PASSWORD;
        case constant.sos2.packet_code:
        case constant.sos1.packet_code:
            return types.SOS;
        default:
            return types.SOCKET_DUMP;
    }
}
