import Nat64 "mo:base/Nat64";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import ICPLedger "canister:icp_ledger_canister";
actor MyCanister {
  // query principal ID of the owner
  public query func ownerPrincipal(): async Text {
    let principal = Principal.toText(Principal.fromActor(MyCanister));

    return principal;
  };

  public shared func checkBalance(_account: ICPLedger.TextAccountIdentifier): async {e8s:Nat64} {
    // arguments
    let args = {
      account = _account;
    };

    let balance = await ICPLedger.account_balance_dfx(args);

    return balance;
  };
  // tranfer ICP
  public shared func transfer(
    _to: ICPLedger.TextAccountIdentifier, 
    _fee: ICPLedger.Tokens, 
    _memo: ICPLedger.Memo, 
    _amount: ICPLedger.Tokens
    ): async Nat64 {
    // arguments
    let args = {
      to = _to;
      fee = _fee;
      memo = _memo;
      amount = _amount;
      from_subaccount = null;
      created_at_time = null;
    };
      let res = await ICPLedger.send_dfx(args);
      return res;
  };
};
