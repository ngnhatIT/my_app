// src/pages/Settings/SystemSettings.tsx
import {
  Breadcrumb,
  Card,
  Form,
  Input,
  InputNumber,
  Typography,
  Button,
  Row,
  Col,
  Select,
  message,
} from "antd";
import { useEffect } from "react";
import { useFakeApi } from "../../../hooks/useFakeApi";

const { Title } = Typography;
const { Option } = Select;

interface SystemSettings {
  id: string;
  passwordExpirationDays: number;
  maxFailedLoginAttempts: number;
  autoLogoutMinutes: number;
  smtpServer: string;
  smtpPort: number;
  alertEmail: string;
  theme: "light" | "dark";
  language: "vi" | "en" | "ja";
}

export default function SystemSettings() {
  const { data, setData } = useFakeApi<SystemSettings>("settings");
  const [form] = Form.useForm();

  useEffect(() => {
    if (data && data.length > 0) {
      form.setFieldsValue(data[0]);
    }
  }, [data, form]);

  const onFinish = (values: SystemSettings) => {
    if (!data) return;
    const updated = [{ ...values, id: data[0].id }];
    setData(updated);
    message.success("Đã lưu cấu hình hệ thống");
  };

  return (
    <div className="p-4 space-y-4">
      <Breadcrumb items={[{ title: "Cài đặt" }, { title: "Hệ thống" }]} />
      <Title level={4}>Cài đặt hệ thống</Title>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        {/* SECURITY POLICIES */}
        <Card title="🔐 Chính sách bảo mật" className="mb-4">
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="passwordExpirationDays"
                label="Thời hạn mật khẩu (ngày)"
                rules={[{ required: true, type: "number", min: 1 }]}
              >
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="maxFailedLoginAttempts"
                label="Số lần đăng nhập sai tối đa"
                rules={[{ required: true, type: "number", min: 1 }]}
              >
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="autoLogoutMinutes"
                label="Tự động đăng xuất sau (phút)"
                rules={[{ required: true, type: "number", min: 1 }]}
              >
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* EMAIL SETTINGS */}
        <Card title="📧 Cài đặt email cảnh báo" className="mb-4">
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="smtpServer"
                label="SMTP Server"
                rules={[{ required: true }]}
              >
                <Input placeholder="smtp.example.com" />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item
                name="smtpPort"
                label="Port"
                rules={[{ required: true, type: "number" }]}
              >
                <InputNumber min={1} max={65535} className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="alertEmail"
                label="Email nhận cảnh báo"
                rules={[{ required: true, type: "email" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Form.Item className="mt-4">
          <Button type="primary" htmlType="submit">
            Lưu cấu hình
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
