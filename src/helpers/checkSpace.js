const regex = /\s/;

export function checkSpace(value) {
  return !regex.test(value);
}