//
//  LocationService.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:35:45 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import Geolocation from "@react-native-community/geolocation";
import constant from "../constants";

class LocationService {
    watchID = null;
    getCurrentLocation(success, failure, successCB) {
        Geolocation.getCurrentPosition(
            position => {
                success(position);
                successCB(position);
            },
            error => {
                failure(error.message);
            },
            {
                enableHighAccuracy: constant.LOCATION_HIGH_ACCURACY,
                timeout: constant.LOCATION_TIME_OUT,
                maximumAge: constant.LOCATION_MAX_AGE
            }
        );
    }

    getWatchID() {
        return this.watchID;
    }
    clearWatchId() {
        Geolocation.clearWatch(this.watchID);
    }
}

export default new LocationService();
