import * as React from 'react';
import {Fragment} from "react";
import {Icon, message, Popconfirm, Table, Tooltip} from 'antd';
import * as CopyToClipboard from 'react-copy-to-clipboard';
import {connect} from 'react-redux';

import {Secret, selectors, actions, SortInfo} from '~/core/secret';
import {RootState} from "~/core/reducers";
import {ajaxErrorDialog} from "~/view/common/MsgDlg";
import CustomIcon from "~/view/common/CustomIcon";

import "./index.less";
import EditSecretDlg from "~/view/secretPage/SecretTable/EditSecretDlg";
import {PaginationConfig} from "antd/lib/pagination";
import {SorterResult} from "antd/lib/table";

const {Column} = Table;

export interface SecretTableProps {
  list: Secret[],
  fetchSecrets: () => Promise<any>,
  pageNum: number,
  pageSize: number,
  sortInfo: SortInfo,
  deleteSecret: (id: string) => Promise<any>,
  setPageNum: (pageNum: number) => void,
  setPageSize: (pageSize: number) => void,
  setSortInfo: (sortInfo: SortInfo) => void,
}

export interface SecretTableState {
  showIds: string[],
  editDlgVisible: boolean,
  editSecret?: Secret,
}

export class SecretTable extends React.PureComponent<SecretTableProps, SecretTableState> {
  constructor(props: SecretTableProps) {
    super(props);
    this.state = {
      showIds: [],
      editDlgVisible: false,
      editSecret: null,
    };
  }

  componentDidMount() {
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

  getOrderByTarget(target: string) {
    const sortInfo = this.props.sortInfo;
    return sortInfo.target === target ? sortInfo.order : false
  }

  showEditDlg(secret: Secret) {
    this.setState({
      editDlgVisible: true,
      editSecret: secret,
    });
  }

  hideEditDlg = () => this.setState({editDlgVisible: false});

  delSecretHandle(id: string) {
    this.props.deleteSecret(id)
      .then(() => message.success("删除成功！"))
      .catch(ajaxErrorDialog);
  };

  onTableChangeHandle = (pagination: PaginationConfig, _:any, sorter: SorterResult<any>) => {
    const {pageSize, pageNum, sortInfo} = this.props;
    if(pagination.current !== pageNum){
      this.props.setPageNum(pagination.current);
    } else if (pagination.pageSize !== pageSize){
      this.props.setPageSize(pagination.pageSize);
    } else if (sortInfo.target !== sorter.field || sortInfo.order !== sorter.order){
      this.props.setSortInfo({
        target: sorter.field,
        order: sorter.order
      });
    }
  };

  render() {
    const {list, pageNum, pageSize} = this.props;
    const {showIds, editDlgVisible, editSecret} = this.state;
    return (
      <Fragment>
        <Table
          className="secret-table"
          dataSource={list}
          rowKey="_id"
          pagination={{
            current: pageNum,
            pageSize: pageSize,
            showSizeChanger: true,
            onShowSizeChange: (current, size: number) => this.props.setPageSize(size)
          }}
          onChange={this.onTableChangeHandle}
        >
          <Column
            title="名称"
            dataIndex="siteName"
            key="siteName"
            width="25%"
            sorter={true}
            sortOrder={this.getOrderByTarget("siteName")}
            render={(text, item: Secret) => {
              let url = item.url;
              if (url) {
                url = url.includes('http') ? url : 'http://' + url;
                return <a href={`${url}`} target="_blank">{item.siteName}</a>;
              } else {
                return <span>{item.siteName}</span>;
              }
            }}
          />
          <Column
            title="用户名"
            dataIndex="userName"
            key="userName"
            width="20%"
            sorter={true}
            sortOrder={this.getOrderByTarget("userName")}
          />
          <Column
            title="密码"
            dataIndex="decryptPassword"
            key="password"
            width="20%"
            render={(_, item: Secret) => {
              let psd = '******';
              let btnIconType = 'icon-eye-close';
              if (showIds.includes(item._id)) {
                psd = item.decryptPassword;
                btnIconType = 'icon-eye';
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
                      onCopy={(_, result) => {
                        if (result) {
                          message.success("拷贝成功！");
                        } else {
                          message.error("拷贝失败！");
                        }
                      }}
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
            width="25%"
          />
          <Column
            title="其他"
            dataIndex="other"
            key="other"
            width="5%"
            render={(_, item: Secret) => {
              return (
                <Fragment>
                  {
                    item.phone ? (
                      <Tooltip title={item.phone}>
                        <Icon type="mobile" />
                      </Tooltip>
                    ) : null
                  }
                </Fragment>
              )
            }}
          />

          <Column
            title="操作"
            dataIndex="action"
            key="action"
            width="5%"
            render={(_, item: Secret) => {
              return (
                <Fragment>
                  <Icon type="edit" onClick={() => this.showEditDlg(item)}/>
                  <Popconfirm
                    title="确认删除该记录?"
                    onConfirm={() => this.delSecretHandle(item._id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Icon type="delete" />
                  </Popconfirm>
                </Fragment>
              )
            }}
          />
        </Table>
        <EditSecretDlg
          visible={editDlgVisible}
          onCancel={this.hideEditDlg}
          currentSecret={editSecret}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  list: selectors.getDisplaySecrets(state),
  pageNum: selectors.getPageNum(state),
  pageSize: selectors.getPageSize(state),
  sortInfo: selectors.getSortInfo(state),
});

const mapDispatchToProps = {
  fetchSecrets: actions.fetchSecrets,
  deleteSecret: actions.delSecret,
  setPageNum: actions.setPageNum,
  setPageSize: actions.setPageSize,
  setSortInfo: actions.setSortInfo,
};
export default connect(mapStateToProps, mapDispatchToProps)(SecretTable);
