// Generate dummy EMVCo tokens

exports.generateDummyToken = () => {
  // Same as before, generate dummy EMVCo-like token
  const bin = "411111";
  let body = "";
  for (let i = 0; i < 9; i++) {
    body += Math.floor(Math.random() * 10).toString();
  }
  const partial = bin + body;

  const luhnChecksum = (numStr) => {
    let sum = 0;
    let doubleDigit = false;
    for (let i = numStr.length - 1; i >= 0; i--) {
      let digit = parseInt(numStr[i]);
      if (doubleDigit) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      doubleDigit = !doubleDigit;
    }
    return (10 - (sum % 10)) % 10;
  };

  const checkDigit = luhnChecksum(partial);
  return partial + checkDigit.toString();
};
