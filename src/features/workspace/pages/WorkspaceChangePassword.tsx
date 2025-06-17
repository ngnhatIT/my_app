
// WorkspaceChangePassword.tsx (updated with current + confirm password)
import { Form, Input, Button, message } from "antd";

const WorkspaceChangePassword = ({ workspace, onClose }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Mật khẩu xác nhận không khớp!");
      return;
    }
    console.log("Change password for workspace", workspace.id, values);
    message.success("Đổi mật khẩu thành công!");
    onClose();
  };

  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Form.Item
        label="Mật khẩu hiện tại"
        name="currentPassword"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Mật khẩu mới"
        name="newPassword"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Xác nhận mật khẩu mới"
        name="confirmPassword"
        dependencies={["newPassword"]}
        rules={[
          { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Lưu</Button>
      </Form.Item>
    </Form>
  );
};

export default WorkspaceChangePassword;
