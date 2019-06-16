import * as React from 'react';
import {Table, Button, Icon} from 'antd';
import * as CopyToClipboard from 'react-copy-to-clipboard';
import {connect} from 'react-redux';

//import {getSecretList, getShowPsdIds} from '~/core/modules/secret/selector';
//import {setShowPsdIds} from '~/core/modules/secret/action';

const {Column} = Table;

export default class SecretTable extends React.PureComponent {

/*
  changePsdStatus(id) {
    const idSet = new Set(this.props.showPsdIds);
    if (idSet.has(id)) {
      idSet.delete(id);
    } else {
      idSet.add(id);
    }
    this.props.setShowPsdIds([...idSet]);
  };
*/

  render() {
    return (
      <div>SecretTable</div>
    )
/*
    const {list, showPsdList} = this.props;
    return (
      <Table
        className="secret-table"
        dataSource={list}
      >
        <Column
          title="Site Name"
          dataIndex="siteName"
          key="siteName"
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
          render={(text, item) => {
            let psd = '******';
            let psdBtnClassName = 'icon-eye';
            if (showPsdList.includes(item.id)) {
              psd = item.password;
              psdBtnClassName = 'icon-eye-blocked';
            }
            return (
              <div>
                <span>{psd}</span>
                <div className="right-box">
                  <i
                    className={psdBtnClassName}
                    onClick={() => this.changePsdStatus(item.id)}
                  />
                  <CopyToClipboard
                    text={item.password}
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
          render={text => (
            <span dangerouslySetInnerHTML={text}/>
          )}
        />
      </Table>
    );
*/
  }
}

/*
const mapStateToProps = (state) => ({
  list: getSecretList(state),
  showPsdIds: getShowPsdIds(state)
});
const mapDispatchToProps = {
  setShowPsdIds
};
export default connect(mapStateToProps, mapDispatchToProps)(SecretTable);
*/
