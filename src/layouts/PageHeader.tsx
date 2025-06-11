import { Breadcrumb, Button, Input, Space } from "antd";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Search } = Input;

interface PageHeaderProps {
  title?: string;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  addButtonLabel?: string;
  addButtonAction?: () => void;
  addButtonVisible?: boolean;
  breadcrumbPaths?: { label: string; link?: string }[];
}

const PageHeader = ({
  onSearch,
  searchPlaceholder = "Tìm kiếm...",
  addButtonLabel = "Thêm mới",
  addButtonAction,
  addButtonVisible = true,
  breadcrumbPaths = [],
}: PageHeaderProps) => {
  return (
    <div className="mb-6 mt-2">
      <Breadcrumb className="mb-8 p-8">
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        {breadcrumbPaths.map((path) => (
          <Breadcrumb.Item key={`${path.label}-${path.link ?? ""}`}>
            {path.link ? <Link to={path.link}>{path.label}</Link> : path.label}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>

      <div className="mt-2 p-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {onSearch && (
          <Search
            allowClear
            placeholder={searchPlaceholder}
            enterButton={<SearchOutlined />}
            onSearch={onSearch}
            className="w-full sm:w-72"
          />
        )}
        {addButtonVisible && (
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={addButtonAction}
            className="w-full sm:w-auto"
          >
            {addButtonLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
