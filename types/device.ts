export interface Device {
  // deviceId: string;
  type: string; // Type of Device (e.g., "pulse_oximeter", "thermometer")
  modelNo: string;
  title: string;
  macAddress: string;
  serviceUuid: string;
  characteristicUuid: string;
  serviceId: string;
  id?: string;
  status?: string;
  setupStatus?: string;
}
export interface DeviceTypes {
  devices: Device[];
  clientId: string;
  deviceTypes: string[];
}
