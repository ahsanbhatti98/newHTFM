//
//  userLocation.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:22:31 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import * as types from "../actions/ActionTypes";

const initialState = {
    isFetching: false,
    failure: false,
    errorMessage: "",
    coordinate: {
        latitude: 0,
        longitude: 0
    },

    permissionGranted: null
};

export default (state: Object = initialState, action: Object) => {
    switch (action.type) {
        case types.USER_LOCATION.REQUEST:
            return {
                ...state,
                isFetching: action.permissionGranted === "granted",
                failure: false,
                errorMessage: "",
                permissionGranted: action.permissionGranted
            };
        case types.USER_LOCATION.SUCCESS:
            return {
                ...state,
                isFetching: false,
                failure: false,
                errorMessage: "",
                coordinate: {
                    latitude: action.location.coords.latitude,
                    longitude: action.location.coords.longitude
                }
            };
        case types.USER_LOCATION.FAILURE:
            return {
                ...state,
                isFetching: false,
                failure: true,
                errorMessage: action.errorMessage
            };

        default:
            return state;
    }
};
