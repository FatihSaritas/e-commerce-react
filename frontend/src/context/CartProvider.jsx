import { useEffect, useState } from 'react';
// React'ten `useEffect` ve `useState` hook'larını içeri aktarır. `useState` bileşenin durumunu yönetmek için, `useEffect` yan etkileri (side effects) yönetmek için kullanılır.

import { CartContext } from './CartContext';
// `CartContext`'i, sepetle ilgili durumu sağlayacak context'i içeri aktarır.

import PropTypes from 'prop-types';
// `PropTypes`, bileşenlere prop'ların türünü belirtmek için kullanılır. Bu, daha güvenli ve anlaşılır bir kod sağlar.

const CartProvider = ({ children }) => {
  // `CartProvider` fonksiyonel bileşenini tanımlar. `children` prop'u, `CartProvider` bileşenine verilen içeriği temsil eder.

  const [cartItems, setCartItems] = useState(
    // `cartItems`, sepetin içindeki ürünleri saklamak için kullanılan state'tir.
    // Başlangıçta, `localStorage`'dan sepet verisi alınır, eğer yoksa boş bir dizi atanır.
    localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  );

  useEffect(() => {
    // `useEffect` hook'u, `cartItems` değiştiğinde tetiklenir ve sepet verisini `localStorage`'a kaydeder.
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  // `cartItems` her değiştiğinde, `localStorage`'a kaydedilmesi sağlanır.

  const addToCart = (cartItem) => {
    // `addToCart` fonksiyonu, sepete yeni bir ürün ekler.
    setCartItems((prevCart) => [
      // `prevCart`, önceki sepetin değerini alır ve ona yeni öğeyi ekler.
      ...prevCart,
      {
        ...cartItem,
        // `cartItem`'i kopyalar, `quantity` varsa, yoksa 1 olarak ayarlar.
        quantity: cartItem.quantity ? cartItem.quantity : 1,
      },
    ]);
  };

  const removeFromCart = (itemId) => {
    // `removeFromCart`, sepetten bir ürünü `itemId`'ye göre siler.
    const filteredCartItems = cartItems.filter((cartItem) => {
      // `filter`, `cartItems` dizisindeki öğeleri filtreler. `cartItem._id`'sı, verilen `itemId` ile eşleşmeyenleri tutar.
      return cartItem._id !== itemId;
    });

    setCartItems(filteredCartItems);
    // Filtrelenmiş sepeti yeni `cartItems` olarak ayarlar.
  };

  return (
    <CartContext.Provider
      value={{
        cartItems, // `cartItems`'ı sağla.
        setCartItems, // `setCartItems`'ı sağla, sepeti güncelleyebilmek için.
        addToCart, // `addToCart` fonksiyonunu sağla, sepete ürün eklemek için.
        removeFromCart, // `removeFromCart` fonksiyonunu sağla, sepetteki ürünü silmek için.
      }}
    >
      {children}
      {/* `children`'i render eder, yani `CartProvider` bileşeninin içinde yer alan tüm bileşenler, yukarıdaki context verilerine erişebilir. */}
    </CartContext.Provider>
  );
};

export default CartProvider;
// `CartProvider` bileşenini dışa aktarır.

CartProvider.propTypes = {
  children: PropTypes.node, // `children` prop'unun herhangi bir React node (bileşen veya öğe) olmasını bekler.
};
