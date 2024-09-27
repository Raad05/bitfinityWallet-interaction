# `Bitfinity Wallet Interaction`

A simple wallet interaction project using the Bitfinity Wallet to transfer ICP tokens lcoally.

## Project Setup:

- Install the package dependencies:

```yaml
npm install
```

- Start the DFX locally on a different terminal tab:

```yaml
dfx start --clean
```

- Create a new indentity for the minter, switch to it and set it as the minter account ID:

```yaml
dfx identity new minter
dfx identity use minter
export MINTER_ACCOUNT_ID=$(dfx ledger account-id)
```

- Now, switch to default and set it as the default account ID:

```yaml
dfx identity use default
export DEFAULT_ACCOUNT_ID=$(dfx ledger account-id)
```

- Deploy the ICP Ledger Canister using the following command in the CLI:

```yaml
dfx deploy --specified-id ryjl3-tyaaa-aaaaa-aaaba-cai icp_ledger_canister --argument "
  (variant {
    Init = record {
      minting_account = \"$MINTER_ACCOUNT_ID\";
      initial_values = vec {
        record {
          \"$DEFAULT_ACCOUNT_ID\";
          record {
            e8s = 10_000_000_000 : nat64;
          };
        };
      };
      send_whitelist = vec {};
      transfer_fee = opt record {
        e8s = 10_000 : nat64;
      };
      token_symbol = opt \"LICP\";
      token_name = opt \"Local ICP\";
    }
  })
"
```

- Deploy the rest of the canisters using the following command:

```yaml
dfx deploy
```

- You can access the canisters through the links provided in the terminal. The links would be something like the following:

```yaml
URLs:
  Frontend canister via browser
    plugWallet-interaction-frontend:
      - http://127.0.0.1:4943/?canisterId=be2us-64aaa-aaaaa-qaabq-cai
      - http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943/
  Backend canister via Candid interface:
    icp_ledger_canister: http://127.0.0.1:4943/?canisterId=bnz7o-iuaaa-aaaaa-qaaaa-cai&id=ryjl3-tyaaa-aaaaa-aaaba-cai
    plugWallet-interaction-backend: http://127.0.0.1:4943/?canisterId=bnz7o-iuaaa-aaaaa-qaaaa-cai&id=bd3sg-teaaa-aaaaa-qaaba-cai
```

- To locally run the frontend and make changes, run:

```yaml
npm run start
```
