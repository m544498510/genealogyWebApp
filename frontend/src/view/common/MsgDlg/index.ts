import {Modal, notification} from 'antd';
import {ErrorMsgObject} from "~/utils/ajaxUtil/models";

let hasOpenDlg = false;

export function ajaxErrorNotification(e: ErrorMsgObject | any) {
  if (e && (e.title || e.msg)) {
    notification.error({
      message: e.title,
      description: e.msg,
    });
  } else {
    window.console.error(e);
  }
}

/**
 * just for ajax request failure to open a dialog
 * @param e {object} - request error message
 */
export function ajaxErrorDialog(e: ErrorMsgObject | any): Promise<ErrorMsgObject> {
  if (e && (e.title || e.msg)) {
    errorDialog(e.title, e.msg);
  } else {
    window.console.error(e);
  }
  return Promise.reject(e);
}

export function errorDialog(title: string, content = '') {
  if (!hasOpenDlg) {
    hasOpenDlg = true;
    Modal.error({
      title,
      content,
      onOk: () => {
        hasOpenDlg = false;
      },
    });
  }
}

export function warningDialog(title: string, content = '') {
  if (!hasOpenDlg) {
    hasOpenDlg = true;
    Modal.warning({
      title,
      content,
      onOk: () => {
        hasOpenDlg = false;
      },
    });
  }
}

export function infoDialog(title: string, content = '') {
  if (!hasOpenDlg) {
    hasOpenDlg = true;

    Modal.info({
      title,
      content,
      onOk: () => {
        hasOpenDlg = false;
      },
    });
  }
}

export function successDialog(title: string, content = '') {
  if (!hasOpenDlg) {
    hasOpenDlg = true;

    Modal.success({
      title,
      content,
      onOk: () => {
        hasOpenDlg = false;
      },

    });
  }
}
