import * as React from 'react';
import {Input, Button} from 'antd';
import {connect} from 'react-redux';

import {actions, selectors} from '~/core/secret';
import {RootState} from "~/core/reducers";

import "./index.less";
import CreateSecretDlg from "~/view/secretPage/ToolsBox/CreateSecretDlg";

const Search = Input.Search;
export interface ToolsBoxProps {
  setKeyword: (keyword: string) => void,
  keyword: string
}
interface ToolsBoxState {
  createDlgVisible: boolean
}

export class ToolsBox extends React.PureComponent<ToolsBoxProps, ToolsBoxState> {
  state = {
    createDlgVisible: false
  };

  hideCreateDlg = () => this.setState({createDlgVisible: false});
  showCreateDlg = () => this.setState({createDlgVisible: true});

  render() {
    const {createDlgVisible} = this.state;
    return (
      <div className="tools-box">
        <div className="left-box">
          <Button
            icon="plus"
            type="primary"
            onClick={this.showCreateDlg}
          >新建</Button>
        </div>
        <div className="right-box">
          <Search
            placeholder="关键字搜索"
            onSearch={(value: string) => this.props.setKeyword(value)}
          />
        </div>
        <CreateSecretDlg
          visible={createDlgVisible}
          onCancel={this.hideCreateDlg}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  keyword: selectors.getKeyword(state)
});

const mapDispatchToProps = {
  setKeyword: actions.setKeyword
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsBox);
