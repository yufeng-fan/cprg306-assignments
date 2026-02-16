export function generateRandomString(length: number = 20) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  return Array.from(array)
    .map((x) => chars[x % chars.length])
    .join("");
}
