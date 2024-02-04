import { v4 } from "uuid";

export default {
  generateDeviceId: () => {
    return v4();
  },
  hasDeviceId: () => {
    return localStorage.getItem("deviceId") !== null;
  },
  getDeviceId: () => {
    return localStorage.getItem("deviceId");
  },
  setDeviceId: (deviceId: string) => {
    localStorage.setItem("deviceId", deviceId);
  },
  removeDeviceId: () => {
    localStorage.removeItem("deviceId");
  },
};
