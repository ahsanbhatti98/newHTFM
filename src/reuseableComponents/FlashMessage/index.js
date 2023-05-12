//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:27:23 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { showMessage, hideMessage } from "react-native-flash-message";

export default message = props => {
    const {
        message,
        type,
        hideOnPress,
        onPress,
        animated,
        autoHide,
        duration,
        hideStatusBar,
        floating,
        position,
        icon,
        canRegisterAsDefault
    } = props;

    showMessage({
        message: message,
        type: type || "danger",
        hideOnPress: hideOnPress || true,
        onPress: onPress || "none",
        animated: animated || true,
        autoHide: autoHide || true,
        duration: duration || 3500,
        hideStatusBar: hideStatusBar || false,
        floating: floating || false,
        position: position || "top",
        icon: icon || "auto",
        canRegisterAsDefault: canRegisterAsDefault || true
    });
};
