import * as React from 'react';
import {render} from 'react-dom';
import "antd/test.less";

import Test from './test';
import InputPanel from './Input';
import './test.less';

render(
  (
      <div>
        <Test data="loading" />
        <InputPanel />
      </div>
  ),
  document.getElementById('root')
);
