export const uppercaseFunction = (text: string) => {
  if (!!text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
};
