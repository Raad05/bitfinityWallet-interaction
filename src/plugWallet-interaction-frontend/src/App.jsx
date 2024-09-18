import { useEffect, useMemo, useState } from "react";

const App = () => {
  const whitelist = useMemo(() => ["qoctq-giaaa-aaaaa-aaaea-cai"], []); // canister IDs
  const [principal, setPrincipal] = useState("");
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // connect to wallet if not connected
  const connect = async () => {
    const onConnectionUpdate = () => {
      console.log(window.ic.plug.sessionManager.sessionData);
    };

    try {
      const publicKey = await window.ic.plug.requestConnect({
        whitelist,
        onConnectionUpdate,
        timeout: 50000,
      });
      alert("Wallet connected!");
      console.log(`The connected user's public key is:`, publicKey);

      const principalId = await window.ic.plug.principalId;
      const accountId = await window.ic.plug.accountId;
      setPrincipal(principalId);
      setAccount(accountId);
      setIsConnected(true);
    } catch (e) {
      alert("Failed to connect wallet.");
      console.error(e);
    }
  };

  // transfer ICP
  const transfer = async () => {
    alert("Transferred 0.1 ICP");
  };

  // get balance
  const getBalance = async () => {
    const balance = await window.ic.plug.requestBalance();

    console.log(balance);
  };

  useEffect(() => {
    // persist connection
    const verifyConnection = async () => {
      const connected = await window.ic.plug.isConnected();

      if (connected) {
        try {
          const principalId = await window.ic.plug.principalId;
          const accountId = await window.ic.plug.accountId;
          setPrincipal(principalId);
          setAccount(accountId);
          setIsConnected(true);
        } catch (e) {
          console.error(e);
        }
      } else {
        setIsConnected(false);
      }
    };

    verifyConnection();
  }, [whitelist]);

  return (
    <div className="App">
      <h1>PlugWallet Interaction</h1>
      {isConnected ? (
        <>
          <p>
            <strong>Principal ID:</strong> {principal}
          </p>
          <p>
            <strong>Account ID:</strong> {account}
          </p>
          <button onClick={transfer}>Transfer 0.01 ICP</button>
          <button onClick={getBalance}>Check Balance</button>
        </>
      ) : (
        <>
          <p>Plug is not connected.</p>
          <button onClick={connect}>Connect to Plug</button>
        </>
      )}
    </div>
  );
};

export default App;
