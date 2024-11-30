import Auth from '../components/Auth/Auth';
// 'Auth' bileşenini içe aktarıyoruz. Bu bileşen, kullanıcı giriş ve kayıt işlemleri için gerekli olan
// form ve işlevselliği içeriyor.

const AuthPage = () => {
  // 'AuthPage' fonksiyonel bileşenini tanımlıyoruz. Bu bileşen, giriş ya da kayıt sayfasını temsil eder.
  return <Auth />;
  // 'Auth' bileşenini render ediyoruz. Bu bileşen, kullanıcı giriş veya kayıt işlemleri için
  // gerekli olan formu ve arayüzü gösterecek.
};

export default AuthPage;
// 'AuthPage' bileşenini dışa aktarıyoruz. Böylece başka dosyalar veya bileşenler tarafından
// bu sayfa kullanılabilir.
