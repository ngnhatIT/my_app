import React, { useState, useMemo } from "react";
import {
  Table,
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  Typography,
  Space,
  Modal,
  Select,
  theme as antdTheme,
} from "antd";
import dayjs from "dayjs";
import { useFakeApi } from "../../hooks/useFakeApi";
import PageHeader from "../../layouts/PageHeader"; // Breadcrumb & header component

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface AuditLog {
  id: number;
  workspace: string;
  user: string;
  ipAddress: string;
  actionTime: string;
  action: string;
  detail: string;
}

const ACTION_OPTIONS = [
  "edit",
  "view",
  "comment",
  "download",
  "export",
  "import",
];

const AuditLog: React.FC = () => {
  const {
    token: { colorBgContainer, colorTextBase },
  } = antdTheme.useToken();

  const { data: logs, loading } = useFakeApi<AuditLog>("auditlogs");

  const [searchParams, setSearchParams] = useState({
    workspace: "",
    user: "",
    action: "",
    dateRange: null as [dayjs.Dayjs, dayjs.Dayjs] | null,
  });

  const [filters, setFilters] = useState<typeof searchParams>(searchParams);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleSearch = () => setFilters(searchParams);

  const handleClear = () => {
    const empty = {
      workspace: "",
      user: "",
      action: "",
      dateRange: null,
    };
    setSearchParams(empty);
    setFilters(empty);
  };

  const showDetails = (record: AuditLog) => {
    setSelectedLog(record);
    setIsDetailModalOpen(true);
  };

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchWorkspace = filters.workspace
        ? log.workspace.toLowerCase().includes(filters.workspace.toLowerCase())
        : true;
      const matchUser = filters.user
        ? log.user.toLowerCase().includes(filters.user.toLowerCase())
        : true;
      const matchAction = filters.action
        ? log.action.toLowerCase() === filters.action.toLowerCase()
        : true;
      const matchDate =
        filters.dateRange && filters.dateRange.length === 2
          ? dayjs(log.actionTime).isAfter(filters.dateRange[0]) &&
            dayjs(log.actionTime).isBefore(filters.dateRange[1])
          : true;
      return matchWorkspace && matchUser && matchAction && matchDate;
    });
  }, [logs, filters]);

  const columns = [
    { title: "Workspace", dataIndex: "workspace" },
    { title: "Người dùng", dataIndex: "user" },
    { title: "IP", dataIndex: "ipAddress" },
    {
      title: "Thời gian",
      dataIndex: "actionTime",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    { title: "Hành động", dataIndex: "action" },
    { title: "Chi tiết", dataIndex: "detail" },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: AuditLog) => (
        <Button onClick={() => showDetails(record)}>Xem</Button>
      ),
    },
  ];

  return (
    <div
      className="p-4"
      style={{ background: colorBgContainer, color: colorTextBase }}
    >
      {/* Breadcrumb & Page Title */}
      <PageHeader
        breadcrumbPaths={[
          { label: "Bảo mật và theo dõi" },
          { label: "Nhật ký hệ thống" },
        ]}
      />

      <Row gutter={[16, 12]} className="mt-4 mb-4" wrap>
        <Col xs={24} sm={12} md={6}>
          <Input
            placeholder="Tìm theo Workspace"
            value={searchParams.workspace}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                workspace: e.target.value,
              }))
            }
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Input
            placeholder="Tìm theo Người dùng"
            value={searchParams.user}
            onChange={(e) =>
              setSearchParams((prev) => ({ ...prev, user: e.target.value }))
            }
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Tìm theo Hành động"
            value={searchParams.action || undefined}
            allowClear
            onChange={(value) =>
              setSearchParams((prev) => ({ ...prev, action: value || "" }))
            }
            style={{ width: "100%" }}
          >
            {ACTION_OPTIONS.map((action) => (
              <Option key={action} value={action}>
                {action.charAt(0).toUpperCase() + action.slice(1)}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <RangePicker
            style={{ width: "100%" }}
            value={searchParams.dateRange}
            onChange={(range) => {
              const validRange =
                range && range.length === 2 && range[0] && range[1]
                  ? ([range[0], range[1]] as [dayjs.Dayjs, dayjs.Dayjs])
                  : null;
              setSearchParams((prev) => ({ ...prev, dateRange: validRange }));
            }}
          />
        </Col>
        <Col xs={24} className="text-right">
          <Space>
            <Button type="primary" onClick={handleSearch}>
              Tìm kiếm
            </Button>
            <Button onClick={handleClear}>Xoá điều kiện</Button>
          </Space>
        </Col>
      </Row>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={filteredLogs}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: true }}
      />

      <Modal
        title="Chi tiết hành động"
        open={isDetailModalOpen}
        footer={null}
        onCancel={() => setIsDetailModalOpen(false)}
      >
        {selectedLog && (
          <div style={{ lineHeight: "1.8" }}>
            <p>
              <strong>Workspace:</strong> {selectedLog.workspace}
            </p>
            <p>
              <strong>Người dùng:</strong> {selectedLog.user}
            </p>
            <p>
              <strong>IP:</strong> {selectedLog.ipAddress}
            </p>
            <p>
              <strong>Thời gian:</strong>{" "}
              {dayjs(selectedLog.actionTime).format("YYYY-MM-DD HH:mm:ss")}
            </p>
            <p>
              <strong>Hành động:</strong> {selectedLog.action}
            </p>
            <p>
              <strong>Chi tiết:</strong> {selectedLog.detail}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AuditLog;
