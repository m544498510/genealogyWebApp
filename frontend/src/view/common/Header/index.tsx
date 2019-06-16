import * as React from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, Menu, Icon} from 'antd';

import {getUserInfo} from '~/utils/authUtils';
//import { logout } from '~/core/api/user';
import {getHistory} from '~/view/common/BrowserRouter';
import {ajaxErrorDialog} from '~/view/common/MsgDlg';

import RouteEnum from '~/view/RouteEnum';
import './index.less';

const MenuItem = Menu.Item;

export default class Header extends React.PureComponent {
  logoutHandle = () => {
    /*
        logout()
          .then(() => {
            try {
              getHistory().push(paths.loginPage);
            } catch (e) {
              window.location.href = paths.loginPage;
            }
          })
          .catch(ajaxErrorDialog);
    */
  };

  renderMenu() {
    return (
      <Menu className="user-menu">
        <MenuItem>
          <Link to={RouteEnum.PsdManagerPage}>
            <i className="icon-key"/>密码管理
          </Link>
        </MenuItem>
        <Menu.Divider key="divider" className="divider"/>
        <MenuItem>
          <a onClick={this.logoutHandle}>
            <Icon type="logout"/>登出
          </a>
        </MenuItem>
      </Menu>
    );
  }

  render() {
    const {name} = getUserInfo();
    return (
      <div className="header">
        <div className="logo">May&apos;s Zone</div>
        <div className="right-tool-box">
          <Dropdown overlay={this.renderMenu()}>
            <div className="user-box">
              <Icon type="user"/>{name}
            </div>
          </Dropdown>
        </div>
      </div>
    );
  }
}
