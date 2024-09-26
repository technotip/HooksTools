/* Demo: https://hooks.services/tools/raddress-to-accountid */

import { encodeAccountID } from "ripple-address-codec";

const decode = (accountId: string) => {
  const byteArray = Buffer.from(accountId.trim(), "hex");
  return encodeAccountID(byteArray); // encodeAccountID(Array.from(byteArray));
};
