/* Demo: https://hooks.services/tools/raddress-to-accountid */

import { decodeAccountID } from "ripple-address-codec";

const decode = (raddress: string) => {
   return Buffer.from(decodeAccountID(raddress.trim()))
    .toString("hex")
    .toUpperCase();
} 
