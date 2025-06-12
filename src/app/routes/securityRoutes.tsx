import AuditLog from "../../features/security/AuditLog";
import SecurityIncidents from "../../features/security/SecurityIncidents";
import DeviceIpManagement from "../../features/setting/pages/DeviceIP";
import IPWhitelistSetting from "../../features/setting/pages/SettupIp";
import SystemSettings from "../../features/setting/pages/SystemSetting";
import SecurityLayout from "../../layouts/SecurityLayout";
import { ProtectedRoute } from "./ProtectedRoute";

export const securityRoutes = {
  path: "/security",
  element: (
    <ProtectedRoute>
      <SecurityLayout />
    </ProtectedRoute>
  ),
  children: [
    { path: "audit-log", element: <AuditLog /> },
    { path: "device-ip", element: <DeviceIpManagement /> },
    { path: "ip-whitelist", element: <IPWhitelistSetting /> },
    { path: "security-incidents", element: <SecurityIncidents /> },
    { path: "setting-system", element: <SystemSettings /> },
  ],
};
