import MainLayout from './MainLayout';
// 'MainLayout' bileşenini içe aktarıyoruz. Bu bileşen, genel kullanıcı arayüzü düzenini sağlar.

import AdminLayout from './AdminLayout';
// 'AdminLayout' bileşenini içe aktarıyoruz. Bu bileşen, yönetici paneli için özel bir düzen sağlar.

const isAdmin = window.location.pathname.startsWith('/admin');
// `window.location.pathname`, tarayıcının şu anki URL yolunu alır.
// `startsWith('/admin')` ifadesi, URL'nin '/admin' ile başlayıp başlamadığını kontrol eder.
// Eğer URL '/admin' ile başlıyorsa, `isAdmin` true olacak; aksi takdirde false olur.

export const Layout = isAdmin ? AdminLayout : MainLayout;
// Eğer `isAdmin` true ise, yani URL '/admin' ile başlıyorsa, 'AdminLayout' bileşeni seçilir.
// Eğer `isAdmin` false ise, yani URL '/admin' ile başlamıyorsa, 'MainLayout' bileşeni seçilir.
// Bu, kullanıcıya bağlı olarak farklı düzenlerin kullanılmasını sağlar.
