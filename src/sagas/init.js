//
//  init.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:30:10 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { LOAD } from "redux-storage";
import { take, fork, select, put } from "redux-saga/effects";

function* watchReduxLoadFromDisk() {
    while (true) {
        console.log("init  ********  ", LOAD);
        yield take(LOAD);
        try {
            console.log("init user : condiction ********  ");
        } catch (err) {
            console.warn("saga watchReduxLoadFromDisk error: ", err);
        }
    }
}

export default function* root() {
    yield fork(watchReduxLoadFromDisk);
}
