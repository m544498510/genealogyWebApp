import * as React from 'react';
import {Input, Button, Icon} from 'antd';
import {connect} from 'react-redux';

//import {actions, selectors} from '~/core/modules/secret';

export default class ToolsBox extends React.PureComponent {
/*
  onChange = e => {
    this.props.setKeyword(e.target.value);
  };
*/

  render() {
    return (
      <div>Tools</div>
    )
/*
    return (
      <div className="tools-box">
        <div className="left-box">
          <Button
            icon="add"
            type="primary"
            ghost={true}
            shape="circle"
          />
        </div>
        <div className="right-box">
          <Icon type="search"/>
          <Input
            value={this.props.keyword}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
*/
  }
}

/*
const mapStateToProps = state => ({
  keyword: selectors.getKeyword(state)
});

const mapDispatchToProps = {
  setKeyword: actions.setKeyword
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsBox);
*/
