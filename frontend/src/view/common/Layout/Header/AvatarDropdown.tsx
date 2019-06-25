import { Avatar, Icon, Menu, Spin } from 'antd';
import * as React from 'react';
import HeaderDropdown from './HeaderDropdown';
import './index.less';
import {logout} from "~/core/user/dataProvider";
import {getHistory} from "~/view/common/BrowserRouter";
import RouteEnum from "~/view/RouteEnum";
import {ajaxErrorDialog} from "~/view/common/MsgDlg";
import {getUserInfo} from '~/utils/authUtils';

export default class AvatarDropdown extends React.PureComponent {
  logoutHandle = () => {
    logout()
      .then(() => {
        try {
          getHistory().push(RouteEnum.LoginPage);
        } catch (e) {
          window.location.href = RouteEnum.LoginPage;
        }
      })
      .catch(ajaxErrorDialog);
  };

  render(): React.ReactNode {
    const menuHeaderDropdown = (
      <Menu className="hd-menu" selectedKeys={[]}>
        <Menu.Item key="settings">
          <Icon type="setting" />
          <span>账号设置</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={this.logoutHandle}>
          <Icon type="logout" />
          <span>登出</span>
        </Menu.Item>
      </Menu>
    );
    const currentUser = getUserInfo();
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className="action account">
          <Avatar size="small" className="avatar" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="avatar" />
          <span className="name">{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
    );
  }
}


