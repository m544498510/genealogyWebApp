import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';

import { ajaxErrorDialog } from '~/view/common/MsgDlg';
import { login } from '~/core/user/dataProvider';
import RouteEnum from '../RouteEnum';

import Panel from '../common/Panel';
import './index.less';
import {FormComponentProps} from "antd/es/form";

const FormItem = Form.Item;

interface Props extends FormComponentProps {}
interface State {
  loading: boolean,
  validate: boolean,
  redirectToReferrer: boolean
}

class LoginPage extends React.Component<Props, State> {
  state = {
    loading: false,
    validate: true,
    redirectToReferrer: false,
  };

  keyDownHandle = () => {
    this.setState({
      validate: true,
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        const { userName, password } = values;

        login(userName, password)
          .then(() => {
            this.setState({ redirectToReferrer: true });
          })
          .catch(ajaxErrorDialog)
          .finally(() => {
            this.setState({ loading: false });
          });
      }
    });
  };

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={RouteEnum.RootPath} from={RouteEnum.LoginPage} />;
    }

    const { getFieldDecorator } = this.props.form;
    let status: '' | 'error' = '';
    let statusHelp;
    if (!this.state.validate) {
      status = 'error';
      statusHelp = 'Login Failed!';
    }
    return (
      <Panel
        className="login-panel container"
        title="登录"
      >

        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem
            validateStatus={status}
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'you must input user name' }],
            })(<Input
              prefix={<Icon type="user" style={{ fontSize: 13 }} />}
              placeholder="user name"
              onKeyDown={this.keyDownHandle}
            />)}
          </FormItem>
          <FormItem
            validateStatus={status}
            help={statusHelp}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'you must input password' }],
            })(<Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="password"
              onKeyDown={this.keyDownHandle}
            />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={this.state.loading}
            >
              login
            </Button>
          </FormItem>
        </Form>
      </Panel>
    );
  }
}

export default Form.create()(LoginPage);
