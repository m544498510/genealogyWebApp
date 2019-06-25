import {Menu} from "antd";
import * as React from "react";

import {Link} from "react-router-dom";
import CustomIcon from "~/view/common/CustomIcon";
import RouteEnum from "~/view/RouteEnum";

export default function SideMenu() {
  return (
    <Menu theme="dark" defaultSelectedKeys={['secretPage']} mode="inline">
      <Menu.Item key="secretPage">
        <Link to={RouteEnum.PsdManagerPage}>
          <CustomIcon type="icon-user-secret"/>
          <span>密码管理</span>
        </Link>
      </Menu.Item>
    </Menu>
  )
}
