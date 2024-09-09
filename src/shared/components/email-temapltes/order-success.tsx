import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { EURO } from '../ui';

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate = ({ orderId, items }: Props) => (
  <div>
    <h1>Thank you for your purchase! 🎉</h1>

    <p>Your order #{orderId} has been paid for. List of products:</p>

    <hr />

    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.productItem.product.name} | {item.productItem.price} <EURO /> x {item.quantity} it.
          = {item.productItem.price * item.quantity} ₽
        </li>
      ))}
    </ul>
  </div>
);
