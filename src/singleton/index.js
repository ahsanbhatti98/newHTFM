//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:38:32 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
let instance = null;

class singleton {
    userLoggedIn = null;
    userToken = null;
    storeRef = null;
    constructor() {
        if (!instance) {
            instance = this;
        }
        this.name = "singleton";
        this.time = new Date();
        return instance;
    }
    singletonMethod() {
        return this.time;
    }
}

export default new singleton();
