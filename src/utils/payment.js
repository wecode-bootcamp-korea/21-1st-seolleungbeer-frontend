import validator from './validator';

export const paymentValidator = {
  order_user_name: order_user_name => order_user_name?.length > 1,
  order_email: order_email => validator.email(order_email),
  order_mobile: order_mobile => validator.mobile(order_mobile),
  delivery_user_name: delivery_user_name => delivery_user_name?.length > 1,
  delivery_mobile: delivery_mobile => validator.mobile(delivery_mobile),
};
