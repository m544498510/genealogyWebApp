import * as React from 'react';
import {Layout} from "antd";
import SideMenu from "~/view/common/Layout/SideMenu";

import CustomHeader from './Header';
import "./index.less";

const { Header, Content, Footer, Sider } = Layout;

export interface LayoutProps {
  logo?: string,
  title?: string,
  menuData?: object[],
  collapsed?: boolean,
  onCollapse?: (collapsed: boolean) => void
  children: React.ReactNode
}
export interface LayoutState {
  collapsed: boolean,
}

export default class CustomLayout extends React.PureComponent<LayoutProps, LayoutState> {
  constructor(props: LayoutProps, context: React.Context<any>){
    super(props, context);
    this.state = {
      collapsed: typeof props.collapsed === 'boolean' ? props.collapsed : false
    }
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({collapsed});
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
  };

  render() {
    const {logo, title, children} = this.props;
    const {collapsed} = this.state;
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="sider-menu-logo" id="logo">
            <a>
              {
                logo ? <img src={logo} alt=""/> : null
              }
              <h1>{title}</h1>
            </a>
          </div>
          <SideMenu/>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0}}>
            <CustomHeader
              collapsed={collapsed}
              changeCollapse={this.onCollapse}
            />
          </Header>
          <Content style={{margin: '16px 16px 0'}}>
            {children}
          </Content>
          <Footer style={{textAlign: 'center'}}>May's Zone ©2019 Created by firefly_may</Footer>
        </Layout>
      </Layout>
    );
  }
}
