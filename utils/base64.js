export function uint8ArrayToBase64(bytes) {
  const binaryString = Array.from(bytes)
    .map(byte => String.fromCharCode(byte))
    .join('');
  return btoa(binaryString);
}

export function base64ToUint8Array(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}