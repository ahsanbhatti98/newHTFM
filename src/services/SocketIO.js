//
//  SocketIO.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:32:02 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import SocketIOClient, { Manager } from "socket.io-client";
import { BASE_URL_SOCKET } from "../config/WebService";
import { socketInfoListener } from "../actions/SocketActions/SocketConnetion";
import configureStore, { store } from "../store";
import Utils from "../util";

class SocketIO {
    static myInstance = null;
    static socketInstance = null;
    static socketAuth = null;
    queue = [];
    static getInstance() {
        if (SocketIO.myInstance == null) {
            SocketIO.myInstance = new SocketIO();
            console.log("SocketIO.myInstance", SocketIO.myInstance);
        }
        return this.myInstance;
    }
    static init() {
        SocketIO.getInstance().socketInstance = new SocketIOClient(
            BASE_URL_SOCKET,
            { autoConnect: false }
        );
        Utils.setSocketRef(SocketIO.getInstance());
        return SocketIO.getInstance().socketInstance;
    }
    static initialize(url = BASE_URL_SOCKET, payload) {
        SocketIO.getInstance().socketInstance.io.opts = {
            ...SocketIO.getInstance().socketInstance.io.opts,
            query: payload,
            path: "/socket.io",
            autoConnect: true
        };
        SocketIO.getInstance().socketInstance.connect();

        console.log("SocketIO", SocketIO.getInstance().socketInstance);
        SocketIO.getInstance().socketInstance.on("connected", data => {
            console.log("Wahey -> connected!===", data);
            store.dispatch(socketInfoListener(true));
            SocketIO.getInstance().socketAuth = data;
            //if any request in queue
            x = 0;
            while (SocketIO.getInstance().queue.length !== 0) {
                request = SocketIO.getInstance().queue.shift();
                x = x + 1;
                SocketIO.getInstance().requestEmit(request.event, request.data);
            }
            console.log("x", x);
        });
        SocketIO.getInstance().socketInstance.on("connect", () => {});
        SocketIO.getInstance().addListners();
        return SocketIO.getInstance().socketInstance;
    }
    addListners = () => {
        SocketIO.getInstance().requestOnSuccess(
            "connect_error",
            SocketIO.getInstance().connect_error
        );
        SocketIO.getInstance().requestOnSuccess(
            "connect_timeout",
            SocketIO.getInstance().connect_timeout
        );
        SocketIO.getInstance().requestOnSuccess(
            "error",
            SocketIO.getInstance().error
        );
        SocketIO.getInstance().requestOnSuccess(
            "disconnect",
            SocketIO.getInstance().disconnect
        );
        SocketIO.getInstance().requestOnSuccess(
            "reconnect",
            SocketIO.getInstance().reconnect
        );
        SocketIO.getInstance().requestOnSuccess(
            "reconnect_attempt",
            SocketIO.getInstance().reconnect_attempt
        );
        SocketIO.getInstance().requestOnSuccess(
            "reconnecting",
            SocketIO.getInstance().reconnecting
        );
        SocketIO.getInstance().requestOnSuccess(
            "reconnect_error",
            SocketIO.getInstance().reconnect_error
        );
        SocketIO.getInstance().requestOnSuccess(
            "reconnect_failed",
            SocketIO.getInstance().reconnect_failed
        );
    };
    connect = () => {
        console.log("Connect to the socket.io", store);

        this.addListners();
    };
    connect_error = error => {
        console.log("connect_error to the socket.io", error);
    };
    connect_timeout = timeout => {
        console.log("connect_timeout to the socket.io", timeout);
    };
    error = error => {
        console.log("error to the socket.io", error);
    };
    disconnect = reason => {
        console.log("disconnect to the socket.io", reason);
        if (reason === "io server disconnect") {
            // the disconnection was initiated by the server, you need to reconnect manually
            //SocketIO.getInstance().socketInstance.connect();
        }
        // if (this.socket) this.socket.disconnect();
    };
    reconnect = attemptNumber => {
        console.log("reconnect to the socket.io", attemptNumber);
    };
    reconnect_attempt = attemptNumber => {
        console.log("reconnect_attempt to the socket.io", attemptNumber);
    };
    reconnecting = attemptNumber => {
        console.log("reconnecting to the socket.io", attemptNumber);
    };
    reconnect_error = error => {
        console.log("reconnect_error to the socket.io", error);
    };
    reconnect_failed = () => {
        console.log("reconnect_failed to the socket.io");
    };
    requestDisconnect = () => {
        if (
            SocketIO.getInstance().socketInstance !== null &&
            SocketIO.getInstance().socketInstance !== undefined
        ) {
            SocketIO.getInstance().socketInstance.disconnect();
            console.log(
                "disconnected-socket ",
                SocketIO.getInstance().socketInstance
            );
        } else {
            console.log("Can not disconnect");
        }
    };
    requestOnSuccess = (event, success) => {
        console.log("requestOnSuccess--", event);
        if (SocketIO.getInstance().socketInstance !== null) {
            SocketIO.getInstance().socketInstance.on(event, data => {
                // console.log("requestOn", data);
                success(data.data);

                // if (data.code === 200) {
                // } else {
                //   failure(data.message);
                // }
            });
        }
    };
    requestOn = (event, success, failure) => {
        console.log(
            "requestOn-check",
            SocketIO.getInstance().socketInstance !== null &&
                SocketIO.getInstance().socketInstance !== undefined
        );
        // if (
        //   SocketIO.getInstance().socketInstance !== null &&
        //   SocketIO.getInstance().socketInstance !== undefined
        // ) {
        SocketIO.getInstance().socketInstance.on(event, data => {
            console.log("requestOn-", event, "-data-", data);
            if (data.code === 200) {
                success(data.data);
            } else {
                failure(data.message);
            }
        });
        // }
    };
    requestEmit = (event, data = null) => {
        if (
            SocketIO.getInstance().socketAuth === null ||
            SocketIO.getInstance().socketAuth === undefined ||
            !SocketIO.getInstance().socketInstance.connected
        ) {
            SocketIO.getInstance().queue.push({
                event,
                data
            });
            console.log(event, "is in waiting queue");
            return;
        }
        // const newData = {
        //   token: APPLICATION_TOKEN,
        //   "user-token": Utils.getUserToken(),
        //   emiterName: event,
        //   accessToken:
        //     event == API_DRIVER_SOKECT_LOGIN ? "" : Utils.getSocketAccessToken(),
        //   user_id:
        //     event == API_DRIVER_SOKECT_LOGIN ? "" : Utils.getUserIDFromSocket(),
        //   ...data
        // };
        const newData = {
            emiterName: event,
            ...data,
            ...SocketIO.getInstance().socketAuth
        };
        console.log("requestEmit--", event, "data :", newData);
        if (
            SocketIO.getInstance().socketInstance !== null &&
            SocketIO.getInstance().socketInstance !== undefined
        ) {
            SocketIO.getInstance().socketInstance.emit(event, newData);
        }
    };
    request = (event, data, success, error) => {
        if (SocketIO.getInstance().socketInstance.connected) {
            SocketIO.getInstance().requestEmit(event, data);
            SocketIO.getInstance().requestOn(event, data => {
                console.log("requestOn", data);
                if (data.code === 200) {
                    success(data.data);
                } else {
                    error(data.message);
                }
            });
        } else {
            console.log("Socket is not connected");
        }
    };
    callback = data => {};
} // end of socket manager

export default SocketIO;
