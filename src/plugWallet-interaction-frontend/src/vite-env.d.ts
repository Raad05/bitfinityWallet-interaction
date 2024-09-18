/// <reference types="vite/client" />
export {};

declare global {
  interface Window {
    ic: {
      plug: {
        sessionManager: {
          sessionData;
        };
        requestConnect;
        isConnected;
        principalId;
        accountId;
        agent;
        isConnected;
        requestTransfer;
        requestBalance;
      };
    };
  }
}
