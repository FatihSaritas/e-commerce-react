import { Route, Routes } from 'react-router-dom';
// React Router DOM'dan `Route` ve `Routes` bileşenlerini içe aktarıyoruz.
// `Routes`, uygulama rotalarını tanımlamak için kullanılan bir kapsayıcı bileşendir.
// `Route`, her bir rotayı temsil eder ve belirli bir yolda hangi bileşenin render edileceğini belirler.

import HomePage from './pages/HomePage';
// Ana sayfa için tanımlanmış `HomePage` bileşenini içe aktarıyoruz.

import ShopPage from './pages/ShopPage';
// Mağaza sayfası için tanımlanmış `ShopPage` bileşenini içe aktarıyoruz.

import BlogPage from './pages/BlogPage';
// Blog sayfası için tanımlanmış `BlogPage` bileşenini içe aktarıyoruz.

import ContactPage from './pages/ContactPage';
// İletişim sayfası için tanımlanmış `ContactPage` bileşenini içe aktarıyoruz.

import CartPage from './pages/CartPage';
// Sepet sayfası için tanımlanmış `CartPage` bileşenini içe aktarıyoruz.

import AuthPage from './pages/AuthPage';
// Kimlik doğrulama (Giriş/Kayıt) sayfası için tanımlanmış `AuthPage` bileşenini içe aktarıyoruz.

import BlogDetailsPage from './pages/BlogDetailsPage';
// Blog detay sayfası için tanımlanmış `BlogDetailsPage` bileşenini içe aktarıyoruz.
// Bu sayfa, bir blog gönderisinin detaylarını gösterecek.

import ProductsDetailsPage from './pages/ProductsDetailsPage';
// Ürün detay sayfası için tanımlanmış `ProductsDetailsPage` bileşenini içe aktarıyoruz.
// Bu sayfa, belirli bir ürünün detaylarını gösterecek.

import UserPage from './pages/Admin/UserPage';
// Yönetici panelinde kullanıcı listesiyle ilgili işlemler için tanımlanmış `UserPage` bileşenini içe aktarıyoruz.

import Success from './pages/Success';

import CategoryPage from './pages/Admin/Categories/CategoryPage';
import UpdateCategoryPage from './pages/Admin/Categories/UpdateCategoryPage';
import CreateCategoryPage from './pages/Admin/Categories/CreateCategoryPage';
import CreateProductPage from './pages/Admin/Products/CreateProductPage';
import ProductPage from './pages/Admin/Products/ProductPage';
import UpdateProductPage from './pages/Admin/Products/UpdateProductPage';
import CouponPage from './pages/Admin/Coupons/CouponPage';
import CreateCouponPage from './pages/Admin/Coupons/CreateCouponPage';
import UpdateCouponPage from './pages/Admin/Coupons/UpdateCouponPage';
import OrderPage from './pages/Admin/OrderPage';
import DashboardPage from './pages/Admin/DashboardPage';

import './App.css';
// Uygulama için stil dosyasını içe aktarıyoruz. Bu dosya global CSS kurallarını içerir.

function App() {
  // `App` bileşeni, uygulamanın ana bileşenidir ve tüm rotaların tanımlandığı yerdir.
  return (
    <Routes>
      {/* Tüm rotalar bu `Routes` bileşeni içinde tanımlanır. */}

      <Route path="/" element={<HomePage />} />
      {/* Ana sayfa rotası. `/` yoluna gidildiğinde `HomePage` bileşeni render edilir. */}

      <Route path="/shop" element={<ShopPage />} />
      {/* Mağaza sayfası rotası. `/shop` yoluna gidildiğinde `ShopPage` bileşeni render edilir. */}

      <Route path="/blog" element={<BlogPage />} />
      {/* Blog sayfası rotası. `/blog` yoluna gidildiğinde `BlogPage` bileşeni render edilir. */}

      <Route path="/contact" element={<ContactPage />} />
      {/* İletişim sayfası rotası. `/contact` yoluna gidildiğinde `ContactPage` bileşeni render edilir. */}

      <Route path="/cart" element={<CartPage />} />
      {/* Sepet sayfası rotası. `/cart` yoluna gidildiğinde `CartPage` bileşeni render edilir. */}

      <Route path="/auth" element={<AuthPage />} />
      {/* Kimlik doğrulama sayfası rotası. `/auth` yoluna gidildiğinde `AuthPage` bileşeni render edilir. */}

      <Route path="/product/:id" element={<ProductsDetailsPage />} />
      {/* Ürün detay sayfası rotası. `/product/:id` yoluna gidildiğinde `ProductsDetailsPage` render edilir.
          `:id`, dinamik bir parametredir. Örneğin `/product/123` URL'sinde `id` değeri `123` olur. */}

      <Route path="/blog/:id" element={<BlogDetailsPage />} />
      {/* Blog detay sayfası rotası. `/blog/:id` yoluna gidildiğinde `BlogDetailsPage` render edilir.
          `:id`, dinamik bir parametredir. Örneğin `/blog/456` URL'sinde `id` değeri `456` olur. */}

      <Route path="/success" element={<Success />} />

      <Route path="/admin/*">
        {/* Yönetici paneli rotası. `/admin/*` yolu altındaki tüm rotalar bu kapsayıcı içinde tanımlanır. */}

        <Route path="users" element={<UserPage />} />
        {/* `/admin/users` yoluna gidildiğinde `AdminUserPage` bileşeni render edilir. */}
        <Route path="categories" element={<CategoryPage />} />
        {/* `/admin/users` yoluna gidildiğinde `AdminUserPage` bileşeni render edilir. */}
        <Route path="categories/create" element={<CreateCategoryPage />} />
        <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/create" element={<CreateProductPage />} />
        <Route path="products/update/:id" element={<UpdateProductPage />} />
        <Route path="coupons" element={<CouponPage />} />
        <Route path="coupons/create" element={<CreateCouponPage />} />
        <Route path="coupons/update/:id" element={<UpdateCouponPage />} />
        <Route path="orders" element={<OrderPage />} />
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
// `App` bileşenini dışa aktarıyoruz. Böylece bu bileşen `index.js` veya başka dosyalarda kullanılabilir.
