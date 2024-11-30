import Contact from '../components/Contact/Contact';
// Contact bileşenini içe aktarıyoruz. Bu bileşen, kullanıcı ile iletişim kurmak için bir form veya iletişim bilgileri sunar.

const ContactPage = () => {
  // 'ContactPage' fonksiyonel bileşenini tanımlıyoruz. Bu bileşen, iletişim sayfasının içeriğini oluşturur.
  return <Contact />;
  // Contact bileşenini render ediyoruz. Bu, iletişim sayfasında kullanıcıya gösterilecek içeriği sağlar.
};

export default ContactPage;
// ContactPage bileşenini dışa aktarıyoruz. Böylece bu bileşen, diğer dosyalarda kullanılabilir (örneğin, bir rotada).
