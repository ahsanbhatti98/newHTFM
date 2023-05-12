//
//  UserLocation.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:07:47 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import * as types from "./ActionTypes";
import constant from "../constants";
import axios from "axios";

export function request(permissionGranted) {
    return {
        permissionGranted,
        type: types.USER_LOCATION.REQUEST
    };
}

export function success(location) {
    return {
        location,
        type: types.USER_LOCATION.SUCCESS
    };
}

export function failure(errorMessage) {
    return {
        errorMessage,
        type: types.USER_LOCATION.FAILURE
    };
}
