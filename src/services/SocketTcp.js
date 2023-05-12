//
//  SocketTcp.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:32:11 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import constant from "../constants";
import singleton from "../singleton";
import { hideSpinner } from "react-native-globalspinner";
import { showMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";

var net = require("net");
let instance = null;

class SocketTCP {
    userToken = null;
    client = null;
    terminator = "\\r\\n";
    remaing_data = "";
    constructor() {
        if (!instance) {
            instance = this;
        }
        this.name = "SocketTCP";
        this.time = new Date();
        this.init();
        return instance;
    }
    init(
        socketIP = constant.socketIP,
        socketPort = constant.socketPort,
        callback = null
    ) {
        this.client = net.createConnection(socketPort, socketIP, () => {
            // singleton.storeRef.dispatch(
            //     success(types.SOCKET_INFO, { connected: true })
            // );
            if (callback) {
                callback();
            }
            console.log("connected");
        });
        //this.onConnect();
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isInternetReachable || state.isConnected) {
                this.connect();
            } else {
                this.disconnect();
            }
            console.log("Connection type", state);
        });
        this.onDrain();
        this.onEnd();
        this.onError();
        this.onLookup();
    }
    getTime() {
        return this.time;
    }
    checkClient = () => {
        if (!this.client) {
            console.log("client is not init");
            return false;
        } else {
            return true;
        }
    };
    disconnect = () => {
        this.checkClient() && this.client.pause();
        console.log("disconnect again ", this.client);
    };
    connect = () => {
        this.client.resume();
        console.log("connect again ", this.client);
    };
    onCustom = (name, callback) => {
        this.checkClient() &&
            this.client.on(name, data => {
                callback(data);
            });
    };
    on = callback => {
        this.checkClient() &&
            this.client.on("data", data => {
                console.log("on-data-received", data.toString());
                this.parse_packet(data.toString(), callback);
            });
    };
    parse_packet = (data, callback) => {
        // console.log("parse_packet-start-remaing_data", this.remaing_data);
        data = this.remaing_data + data;
        // console.log("parse_packet-start-data", data);
        this.remaing_data = "";
        var pos = data.indexOf(this.terminator);
        if (pos != -1) {
            this.first_data = data.substring(0, pos);
            this.remaing_data = this.remaing_data + data.substring(pos + 4);
            // console.log("parse_packet-first_data", this.first_data);
            // console.log("parse_packet-remaing_data", this.remaing_data);
            callback(JSON.parse(this.first_data));
        } else {
            // console.log("parse_packet-else-data", data);
            this.remaing_data = this.remaing_data + data;
            // console.log("parse_packet-else-remaing_data", this.remaing_data);
        }
        console.log("remaing_data", this.remaing_data);
    };

    write = (action, params) => {
        data = {
            action,
            params
        };
        this.checkNetworkConnection(
            success => {
                const socketStatus = singleton.storeRef.getState()
                    .socketInfoReducer.data.connected;
                if (socketStatus) {
                    //alert("socketStatus", socketStatus + "");
                    this.client.write(JSON.stringify(data) + this.terminator);
                } else {
                    //alert("socketStatus-else", socketStatus + "");
                    this.connect();
                    this.client.write(JSON.stringify(data) + this.terminator);
                }
            },
            fail => {
                hideSpinner();
                showMessage({
                    message: "Please check your network connection",
                    type: "danger",
                    icon: "danger"
                });
                this.disconnect();
            }
        );
        console.log("data-sent", JSON.stringify(data) + this.terminator);
    };
    checkNetworkConnection = (success, failure) => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable || state.isConnected) {
                success(true);
            } else {
                failure(false);
            }
        });
    };
    //Extra Callbacks
    checkisWriteable = () => {
        return this.client.writable;
    };
    onConnect = () => {
        this.checkClient() &&
            this.client.on("connect", () => {
                console.log("connect");
            });
    };
    onDrain = () => {
        this.checkClient() &&
            this.client.on("drain", () => {
                console.log("drain");
            });
    };
    onEnd = () => {
        this.checkClient() &&
            this.client.on("end", () => {
                console.log("end");
            });
    };
    onError = () => {
        this.checkClient() &&
            this.client.on("error", () => {
                console.log("error");
            });
    };
    onLookup = () => {
        this.checkClient() &&
            this.client.on("lookup", () => {
                console.log("lookup");
            });
    };
    onTimeout = () => {
        this.checkClient() &&
            this.client.on("timeout", () => {
                console.log("timeout");
            });
    };
}

export default new SocketTCP();
