export {};

declare global {
  interface Window {
    electron: {
      sendDevicesList: (devices: any[]) => void;
      sendBleData: (devices: any[]) => void;
      receiveBleData: (
        callback: (event: any, receivedData: any) => void
      ) => void;
      ipcRenderer: {
        send: (channel: string, data: any) => void;
        on: (
          channel: string,
          callback: (event: any, ...args: any[]) => void
        ) => void;
        removeListener: (
          channel: string,
          callback: (event: any, ...args: any[]) => void
        ) => void;
      };
    };
  }
}
