/* Demo: https://hooks.services/tools/raddress-to-accountid */

import { decodeAccountID } from "ripple-address-codec";

const decode = (accountId: string) => {
   return Buffer.from(decodeAccountID(accountId.trim()))
    .toString("hex")
    .toUpperCase();
} 
