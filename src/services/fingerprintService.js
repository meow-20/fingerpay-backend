// Generate/encrypt/decrypt dummy fingerprints

const crypto = require('crypto');
const AES_KEY = crypto.randomBytes(32);

exports.encryptTemplate = (templateBase64) => {
  const templateBuffer = Buffer.from(templateBase64, "base64");
  const iv = crypto.randomBytes(12); // GCM IV length = 12 bytes
  const cipher = crypto.createCipheriv("aes-256-gcm", AES_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(templateBuffer), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
};

exports.decryptTemplate = (encryptedBase64) => {
  const data = Buffer.from(encryptedBase64, "base64");
  const iv = data.slice(0, 12);
  const tag = data.slice(12, 28);
  const encrypted = data.slice(28);
  const decipher = crypto.createDecipheriv("aes-256-gcm", AES_KEY, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("base64");
};

exports.hashTemplate = (templateBase64) => {
  return crypto.createHash("sha256").update(templateBase64).digest("hex");
};