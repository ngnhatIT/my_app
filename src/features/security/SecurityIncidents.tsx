// src/pages/SecurityIncidents.tsx
import {
  Card,
  Table,
  Tag,
  Button,
  Popconfirm,
  Space,
  Select,
  Input,
  DatePicker,
  message,
  Breadcrumb,
} from "antd";
import { useState, useEffect } from "react";

import dayjs from "dayjs";
import { useFakeApi } from "../../hooks/useFakeApi";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface SecurityIncident {
  id: string;
  user: string;
  type:
    | "MASS_DOWNLOAD"
    | "FAILED_LOGIN"
    | "OUTSIDE_ACCESS"
    | "UNAUTHORIZED_DEVICE";
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  timestamp: string;
  resolved: boolean;
}

export default function SecurityIncidents() {
  const { data, loading, setData } = useFakeApi<SecurityIncident>("incidents");
  const [filtered, setFiltered] = useState<SecurityIncident[]>([]);
  const [searchUser, setSearchUser] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string | undefined>();

  useEffect(() => {
    if (data) setFiltered(data);
  }, [data]);

  const markResolved = (id: string) => {
    const updated = data?.map((item) =>
      item.id === id ? { ...item, resolved: true } : item
    );
    if (updated) {
      setData(updated);
      message.success("Đã đánh dấu là đã xử lý");
    }
  };

  const filterData = () => {
    let result = data || [];
    if (searchUser)
      result = result.filter((item: any) =>
        item.user.toLowerCase().includes(searchUser.toLowerCase())
      );
    if (severityFilter)
      result = result.filter((item: any) => item.severity === severityFilter);
    setFiltered(result);
  };

  const columns = [
    { title: "User", dataIndex: "user", key: "user" },
    {
      title: "Loại vi phạm",
      dataIndex: "type",
      key: "type",
      render: (type: SecurityIncident["type"]) => {
        const map = {
          MASS_DOWNLOAD: "Tải file hàng loạt",
          FAILED_LOGIN: "Đăng nhập sai nhiều lần",
          OUTSIDE_ACCESS: "Truy cập ngoài giờ",
          UNAUTHORIZED_DEVICE: "Thiết bị không hợp lệ",
        };
        return map[type];
      },
    },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Mức độ",
      dataIndex: "severity",
      key: "severity",
      render: (level: string) => {
        const colors = {
          LOW: "green",
          MEDIUM: "orange",
          HIGH: "red",
        };
        return <Tag color={colors[level as keyof typeof colors]}>{level}</Tag>;
      },
    },
    {
      title: "Thời gian",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (v: string) => dayjs(v).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Trạng thái",
      dataIndex: "resolved",
      key: "resolved",
      render: (v: boolean) =>
        v ? (
          <Tag color="blue">Đã xử lý</Tag>
        ) : (
          <Tag color="red">Chưa xử lý</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: SecurityIncident) => (
        <Space>
          {!record.resolved && (
            <Popconfirm
              title="Đánh dấu đã xử lý?"
              onConfirm={() => markResolved(record.id)}
            >
              <Button type="link">Đánh dấu xử lý</Button>
            </Popconfirm>
          )}
          <Button type="link" danger>
            Khoá tài khoản
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <Breadcrumb
        items={[{ title: "Trang chủ" }, { title: "Sự kiện bảo mật" }]}
        className="mb-4"
      />

      <Card>
        <div className="grid md:grid-cols-4 gap-4">
          <Input
            placeholder="Tìm theo email"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <Select
            allowClear
            placeholder="Mức độ"
            value={severityFilter}
            onChange={setSeverityFilter}
          >
            <Option value="LOW">LOW</Option>
            <Option value="MEDIUM">MEDIUM</Option>
            <Option value="HIGH">HIGH</Option>
          </Select>
          <RangePicker className="w-full" />
          <Button type="primary" onClick={filterData}>
            Lọc
          </Button>
        </div>
      </Card>

      <Card>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={filtered}
        />
      </Card>
    </div>
  );
}
