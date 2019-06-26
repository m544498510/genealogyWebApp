import * as React from 'react';

import ToolBox from '../ToolsBox';
import SecretTable from '../SecretTable';
import {Card} from "antd";

export default class SecretPanel extends React.PureComponent {
  render() {
    return (
      <Card>
        <ToolBox />
        <SecretTable />
      </Card>
    );
  }
}
