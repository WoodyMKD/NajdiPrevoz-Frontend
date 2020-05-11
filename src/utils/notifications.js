import {store} from "react-notifications-component";

export const notificationSuccess = {
    title: "Успешна акција!",
    type: "success",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
        duration: 3500,
        onScreen: true
    }
};

export const notificationError = {
    title: "Неуспешна акција!",
    type: "danger",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
        duration: 3500,
        onScreen: true
    }
};

export const notificationSoon = {
    title: "Наскоро!",
    message: "Оваа функција ќе биде воведена наскоро!",
    type: "info",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
        duration: 3500,
        onScreen: true
    }
};

export const notificationWarning = {
    title: "Внимание!",
    message: "Warning",
    type: "info",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
        duration: 3500,
        onScreen: true
    }
};

export const soonNotification = () => {
    store.addNotification({
        ...notificationSoon,
    });
};