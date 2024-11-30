import Cart from '../components/Cart/Cart';
// 'Cart' bileşenini içe aktarıyoruz. Bu bileşen, kullanıcının sepetindeki ürünleri ve sepet işlemlerini gösterir.

const CartPage = () => {
  // 'CartPage' fonksiyonel bileşenini tanımlıyoruz. Bu bileşen, sepet sayfasının içeriğini oluşturur.
  return <Cart />;
  // 'Cart' bileşenini render ediyoruz. Bu bileşen, kullanıcıya sepetin içeriğini gösterir, örneğin ürünler, miktarlar, toplam fiyat vb.
};

export default CartPage;
// 'CartPage' bileşenini dışa aktarıyoruz. Böylece bu bileşen, diğer dosyalarda kullanılabilir (örneğin, bir rotada).
