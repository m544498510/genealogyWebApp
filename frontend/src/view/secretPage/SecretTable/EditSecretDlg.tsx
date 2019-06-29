import * as React from 'react';
import {Form, Input, InputNumber, message, Modal} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {connect} from 'react-redux';
import {actions, Secret, SecretCfg} from "~/core/secret";
import {ajaxErrorDialog} from "~/view/common/MsgDlg";

const TextArea = Input.TextArea;

export interface EditSecretDlgProps extends FormComponentProps {
  visible: boolean,
  onCancel: () => void,
  editSecret: (cfg: SecretCfg) => Promise<Secret>,
  currentSecret: Secret,
}

export class EditSecretDlg extends React.PureComponent<EditSecretDlgProps> {
  componentDidUpdate(prevProps: EditSecretDlgProps): void {
    if (prevProps.visible === true && this.props.visible === false) {
      this.props.form.resetFields();
    }
  }

  onCommit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const secret = Object.assign({}, this.props.currentSecret, values);
        secret.phone = parseInt(secret);
        this.props.editSecret(secret)
          .finally(this.props.onCancel)
          .then(() => message.success("修改成功！"))
          .catch(ajaxErrorDialog);
      }
    });
  };

  render() {
    const {visible, onCancel, form, currentSecret} = this.props;
    if (!currentSecret) return null;

    const {getFieldDecorator} = form;
    return (
      <Modal
        title="编辑新的密码"
        visible={visible}
        onCancel={onCancel}
        onOk={this.onCommit}
      >
        <Form {...formItemLayout}>
          <Form.Item label="网站名称">
            {getFieldDecorator('siteName', {
              initialValue: currentSecret.siteName || '',
              rules: [
                {
                  required: true,
                  message: '请输入网站的名称!',
                },
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="网址">
            {getFieldDecorator('url', {
              initialValue: currentSecret.url,
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="用户名">
            {getFieldDecorator('userName', {
              initialValue: currentSecret.userName,
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
              initialValue: currentSecret.decryptPassword,
              rules: [
                {
                  required: true,
                  message: '请输入登录密码!',
                },
              ],
            })(<Input.Password/>)}
          </Form.Item>
          <Form.Item label="绑定电话">
            {getFieldDecorator('phone', {
              initialValue: currentSecret.phone,
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('note', {
              initialValue: currentSecret.note,
            })(<TextArea/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const formWrapper = Form.create<EditSecretDlgProps>()(EditSecretDlg);

const mapDispatchToProps = {
  editSecret: actions.updateSecret
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
