import * as React from 'react';
import {Form, Input, message, Modal} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {connect} from 'react-redux';
import {actions, Secret, SecretCfg} from "~/core/secret";
import {ajaxErrorDialog} from "~/view/common/MsgDlg";

const TextArea = Input.TextArea;

export interface CreateSecretDlgProps extends FormComponentProps {
  visible: boolean,
  onCancel: () => void,
  createSecret: (cfg: SecretCfg) => Promise<Secret>
}

export class CreateSecretDlg extends React.PureComponent<CreateSecretDlgProps> {
  onCommit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.createSecret(values)
          .finally(() => {
            this.props.form.resetFields();
            this.props.onCancel();
          })
          .then(() => message.success("添加成功！"))
          .catch(ajaxErrorDialog);
      }
    });
  };

  render() {
    const {visible, onCancel, form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Modal
        title="增加新的密码"
        visible={visible}
        onCancel={onCancel}
        onOk={this.onCommit}
        className="create-secret-dlg"
      >
        <Form {...formItemLayout}>
          <Form.Item label="网站名称">
            {getFieldDecorator('siteName', {
              rules: [
                {
                  required: true,
                  message: '请输入网站的名称!',
                },
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="网址">
            {getFieldDecorator('url', {})(<Input/>)}
          </Form.Item>
          <Form.Item label="用户名">
            {getFieldDecorator('userName', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator('decryptPassword', {
              rules: [
                {
                  required: true,
                  message: '请输入登录密码!',
                },
              ],
            })(<Input.Password/>)}
          </Form.Item>
          <Form.Item label="绑定电话">
            {getFieldDecorator('phone')(<Input/>)}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('note')(<TextArea/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const formWrapper = Form.create<CreateSecretDlgProps>()(CreateSecretDlg);

const mapDispatchToProps = {
  createSecret: actions.createSecret
};

export default connect(null, mapDispatchToProps)(formWrapper);

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 4},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 20},
  },
};
