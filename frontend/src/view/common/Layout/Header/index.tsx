import * as React from 'react';
import {Icon} from 'antd';

import './index.less';
import AvatarDropdown from "~/view/common/Layout/Header/AvatarDropdown";

export interface HeaderProps {
  collapsed: boolean,
  changeCollapse: (collapse: boolean) => void
}

export default class Header extends React.PureComponent<HeaderProps>  {
  onCollapseBtnClick = () => {
    const {collapsed, changeCollapse} = this.props;
    changeCollapse(!collapsed);
  };

  render() {
    const {collapsed} = this.props;
    return (
      <div className="header">
          <span
            className="header-trigger"
            onClick={this.onCollapseBtnClick}
          >
             <Icon
               type={collapsed ? 'menu-unfold' : 'menu-fold'}
             />
          </span>

        <div className="right-tool-box">
          <AvatarDropdown />
        </div>
      </div>
    );
  }
}
