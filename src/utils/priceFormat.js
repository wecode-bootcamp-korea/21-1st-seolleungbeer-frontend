export const priceFormat = price => {
  const splitPrice = price.split('.')[0].split('');
  const newPrice = [];
  let count = 0;

  while (splitPrice.length) {
    if (count === 3) {
      newPrice.unshift(',');
    }
    newPrice.unshift(splitPrice.pop());
    count++;
  }
  return newPrice.join('');
};
