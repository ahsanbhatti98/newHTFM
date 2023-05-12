//
//  SocketAction.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:07:38 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { SOCKET_WRITE } from "./ActionTypes";

var callback = () => {};
var callbackRef = [];
export function write(
    types,
    service,
    data,
    showHud = false,
    success = callback,
    failure = callback,
    showMsg = false
) {
    findPush(types, success, failure);
    writeable = true;
    return {
        writeable,
        payload: data,
        service,
        type: SOCKET_WRITE,
        request_type: types,
        showHud,
        showMsg
    };
}
const findPush = (types, success, failure) => {
    let index = callbackRef.findIndex(item => item.type === types.SUCCESS);
    if (index !== -1) {
        callbackRef[index].success = success;
    } else {
        callbackRef.push({ type: types.SUCCESS, success: success });
    }
    let indexFail = callbackRef.findIndex(item => item.type === types.FAILURE);
    if (indexFail !== -1) {
        callbackRef[indexFail].failure = failure;
    } else {
        callbackRef.push({ type: types.FAILURE, failure: failure });
    }
};
export function withOutWrite(
    types,
    showHud = false,
    success = callback,
    failure = callback,
    showMsg = false
) {
    callbackRef.push({ type: types.SUCCESS, success: success });
    callbackRef.push({ type: types.FAILURE, failure: failure });
    writeable = false;
    return {
        writeable,
        type: SOCKET_WRITE,
        request_type: types,
        showHud,
        showMsg
    };
}
export function success(types, data) {
    let item = callbackRef.filter(item => item.type === types.SUCCESS);
    if (item.length > 0) {
        let callback = item[0]["success"];
        callback(data);
    }
    return {
        data,
        type: types.SUCCESS
    };
}

export function failure(types, errorMessage) {
    let item = callbackRef.filter(item => item.type === types.FAILURE);
    if (item.length > 0) {
        let callback = item[0]["failure"];
        callback(data);
    }
    return {
        errorMessage,
        type: types.FAILURE
    };
}
