/* Demo: https://hooks.services/tools/float-to-xfl */

const number = 10;
console.log(floatToLEXfl(number)); // This returns the XFL of the entered number.


function floatToLEXfl(fl: string) {
  const xfl = floatToXfl(fl);
  return flipBeLe(xfl);
}

function flipBeLe(endian) {
  const hexString = endian.toString(16).toUpperCase();
  let flippedHex = "";
  for (let i = hexString.length - 2; i >= 0; i -= 2) {
    flippedHex += hexString.slice(i, i + 2);
  }
  return flippedHex;
}

function floatToXfl(fl: string) {
  let e = 0;
  let d = "" + parseFloat("" + fl);
  d = d.toLowerCase();
  let s = d.split("e");
  if (s.length == 2) {
    e = parseInt(s[1]);
    d = s[0];
  }
  s = d.split(".");
  if (s.length == 2) {
    d = d.replace(".", "");
    e -= s[1].length;
  } else if (s.length > 2) d = BigInt(0).toString();
  return makeXfl(e, d);
}

const minMantissa = 1000000000000000n;
const maxMantissa = 9999999999999999n;
const minExponent = -96;
const maxExponent = 80;

function makeXfl(exponent, mantissa) {
  if (typeof exponent != "bigint") exponent = BigInt(exponent);
  if (typeof mantissa != "bigint") mantissa = BigInt(mantissa);
  if (mantissa == 0n) return 0n;
  const is_negative = mantissa < 0;
  if (is_negative) mantissa *= -1n;
  while (mantissa > maxMantissa) {
    mantissa /= 10n;
    exponent++;
  }
  while (mantissa < minMantissa) {
    mantissa *= 10n;
    exponent--;
  }
  if (mantissa == 0) return 0n;
  if (exponent > maxExponent || exponent < minExponent) return -1;
  exponent += 97n;
  let xfl = !is_negative ? 1n : 0n;
  xfl <<= 8n;
  xfl |= BigInt(exponent);
  xfl <<= 54n;
  xfl |= BigInt(mantissa);
  return xfl;
}
