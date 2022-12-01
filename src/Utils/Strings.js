export function padString(string, requiredStringLength = 25) {
  const paddingNeeded = requiredStringLength - string.length;
  const paddedStringAsArray = [...string, ...Array(paddingNeeded).fill(' ')];
  return paddedStringAsArray.join('');
}
