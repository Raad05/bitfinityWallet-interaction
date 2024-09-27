import { useEffect, useMemo, useState } from "react";
import { idlFactory as ICPLedger } from "../../declarations/plugWallet-interaction-backend/plugWallet-interaction-backend.did.js";

export const LEDGER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";

const TRANSFER_ICP_TX = {
  idl: ICPLedger,
  canisterId: LEDGER_ID,
  methodName: "transfer",
  args: [
    "a9376a76a7d8630f6f541b0a52cdb3521690329919b9c6cd023e504d476b9e43", // to accountID
    { e8s: 10000 }, // fee as a Nat64
    { e8s: 123451231231 }, // memo as a Nat64
    { e8s: 1000000 }, // amount as a Nat64
  ],
  onSuccess: async (res) => {
    console.log("Transferred ICP successfully!", res);
  },
  onFail: (res) => {
    console.error("ICP Transfer error:", res);
  },
};

const App = () => {
  const canisterId = [
    "bd3sg-teaaa-aaaaa-qaaba-cai",
    "ryjl3-tyaaa-aaaaa-aaaba-cai",
  ]; // canister IDs
  const whitelist = useMemo(() => canisterId, []);
  const [principal, setPrincipal] = useState("");
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [useAssets, setUserAssets] = useState([]);

  // connect to wallet if not connected
  const connect = async () => {
    try {
      await window.ic.infinityWallet.requestConnect({
        whitelist,
      });
      alert("Wallet connected!");
      console.log("Wallet connected!");

      const principalId = await window.ic.infinityWallet.getPrincipal();
      const accountId = await window.ic.infinityWallet.getAccountID();
      const assets = await window.ic.infinityWallet.getUserAssets();
      setPrincipal(`${principalId}`);
      setAccount(accountId);
      setUserAssets(assets);
      setIsConnected(true);
    } catch (error) {
      alert("Failed to connect wallet.");
      console.error("Connection failed:", error);
      setIsConnected(false);
    }
  };

  // transfer ICP
  const transfer = async () => {
    // you can set host to http://localhost:8000/ to make calls to local DFX replica
    await window.ic.infinityWallet.batchTransactions([TRANSFER_ICP_TX], {
      host: undefined,
    });
    console.log(TRANSFER_ICP_TX);
  };

  useEffect(() => {
    // persist connection
    const verifyConnection = async () => {
      const connected = await window.ic.infinityWallet.isConnected();

      if (connected) {
        try {
          const principalId = await window.ic.infinityWallet.getPrincipal();
          const accountId = await window.ic.infinityWallet.getAccountID();
          const assets = await window.ic.infinityWallet.getUserAssets();
          setPrincipal(`${principalId}`);
          setAccount(accountId);
          setUserAssets(assets);
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
      <div>
        {isConnected ? (
          <>
            <div>
              <strong>Principal ID:</strong> <br />
              <p>{principal}</p>
            </div>
            <div>
              <strong>Account ID:</strong> <br />
              <p>{account}</p>
            </div>
            <div>
              <strong>Assets:</strong> <br />
              {useAssets.map((asset, idx) => (
                <p key={idx}>
                  Name: {asset.name} || Balance: {asset.balance} {asset.symbol}
                </p>
              ))}
            </div>
            <div>
              <button onClick={transfer}>Transfer 0.01 ICP</button>
            </div>
          </>
        ) : (
          <>
            <p>Plug is not connected.</p>
            <button onClick={connect}>Connect to Wallet</button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
