import * as React from 'react';
import {Icon, Table} from 'antd';
import * as CopyToClipboard from 'react-copy-to-clipboard';
import {connect} from 'react-redux';

import {Secret, selectors, actions} from '~/core/secret';
import {RootState} from "~/core/reducers";
import {ajaxErrorDialog} from "~/view/common/MsgDlg";
import CustomIcon from "~/view/common/CustomIcon";

const {Column} = Table;

export interface SecretTableProps {
  list: Secret[],
  fetchSecrets: () => Promise<any>
}

export interface SecretTableState {
  showIds: string[],
}

export class SecretTable extends React.PureComponent<SecretTableProps, SecretTableState> {
  constructor(props: SecretTableProps) {
    super(props);
    this.state = {
      showIds: [],
    };
  }

  componentDidMount(): void {
    this.props
      .fetchSecrets()
      .catch(ajaxErrorDialog)
  }

  changePsdStatus(id: string) {
    const idSet = new Set<string>(this.state.showIds);
    if (idSet.has(id)) {
      idSet.delete(id);
    } else {
      idSet.add(id);
    }
    this.setState({showIds: [...idSet]});
  };

  render() {
    const {list} = this.props;
    const {showIds} = this.state;
    return (
      <Table
        className="secret-table"
        dataSource={list}
        rowKey="_id"
      >
        <Column
          title="Site Name"
          dataIndex="siteName"
          key="siteName"
          render={(text, item: Secret) => {
            if (item.url) {
              return <a href={item.url}>{item.siteName}</a>;
            } else {
              return <span>{item.siteName}</span>;
            }
          }}
        />
        <Column
          title="User Name"
          dataIndex="name"
          key="userName"
        />
        <Column
          title="Password"
          dataIndex="password"
          key="password"
          render={(text, item: Secret) => {
            let psd = '******';
            let btnIconType = 'icon-eye';
            if (showIds.includes(item._id)) {
              psd = item.decryptPassword;
              btnIconType = 'icon-eye-close';
            }
            return (
              <div>
                <span>{psd}</span>
                <div className="right-box">
                  <CustomIcon
                    type={btnIconType}
                    onClick={() => this.changePsdStatus(item._id)}
                  />
                  <CopyToClipboard
                    text={item.decryptPassword}
                  >
                    <Icon type="copy"/>
                  </CopyToClipboard>
                </div>
              </div>
            );
          }}
        />
        <Column
          title="note"
          dataIndex="note"
          key="note"
        />
      </Table>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  list: selectors.getDisplaySecrets(state),
});

const mapDispatchToProps = {
  fetchSecrets: actions.fetchSecrets
};
export default connect(mapStateToProps, mapDispatchToProps)(SecretTable);
