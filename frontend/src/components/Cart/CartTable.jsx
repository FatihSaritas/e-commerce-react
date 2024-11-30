import { useContext } from 'react'; // useContext hook'u, CartContext'teki değerlere erişim sağlamak için kullanılıyor.
import CartItem from './CartItem'; // CartItem bileşeni, her bir ürünü tablo satırı olarak göstermek için import edildi.
import { CartContext } from '../../context/CartContext'; // CartContext, sepet verilerine erişmek amacıyla kullanılıyor.

const CartTable = () => {
  // CartContext'ten `cartItems` verisini almak için useContext hook'u kullanıldı.
  const { cartItems } = useContext(CartContext);

  return (
    <table className="shop-table">
      <thead>
        <tr>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-name">Product</th>
          <th className="product-price">Price</th>
          <th className="product-quantity">Quantity</th>
          <th className="product-subtotal">Subtotal</th>
        </tr>
      </thead>
      <tbody className="cart-wrapper">
        {/* cartItems dizisindeki her bir ürün için bir CartItem bileşeni render ediliyor.
            Her CartItem bileşenine, `cartItem` prop'u olarak ürün bilgisi aktarılıyor. */}
        {cartItems.map((item) => (
          <CartItem cartItem={item} key={item._id} /> // `key` olarak ürün ID'si kullanılıyor, bu sayede her ürünün benzersiz olduğu belirtiliyor.
        ))}
      </tbody>
    </table>
  );
};

export default CartTable; // CartTable bileşeni dışa aktarılır, böylece diğer bileşenlerde kullanılabilir.
