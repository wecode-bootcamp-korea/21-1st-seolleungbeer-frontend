const sum = items => {
  const sum = items.reduce(
    (acc, item) => acc + parseInt(item.payment_charge * item.amount),
    0
  );
  return sum;
};

export default sum;
