// import { useContext } from "react";
import React from "react";
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];

const Context = React.createContext({ name: "Default" });

export const useErrorNotification = () => {
  const [api] = notification.useNotification();

  const openNotification = (
    placement: NotificationPlacement,
    message: string
  ) => {
    api.error({
      message: `API Error`,
      description: (
        <Context.Consumer>
          {({ name }) => `${message} (${name})`}
        </Context.Consumer>
      ),
      placement,
    });
  };

  const showErrorNotification = (
    message: string,
    placement: NotificationPlacement = "topLeft"
  ) => {
    openNotification(placement, message);
  };

  return showErrorNotification;
};
