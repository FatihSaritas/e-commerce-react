import { useState } from 'react'; // useState hook'unu import ederek bileşen içinde form verilerini yönetmemizi sağlar.
import { message } from 'antd'; // Ant Design kütüphanesinden message fonksiyonunu import ediyoruz, mesaj göstermek için kullanacağız.
import { useNavigate } from 'react-router-dom'; // useNavigate hook'unu import ederek sayfa yönlendirmelerini yapmamıza olanak tanıyoruz.

const Register = () => {
  // Register adlı bir React fonksiyonel bileşeni oluşturuyoruz.
  const [formData, setFormData] = useState({
    // formData adlı bir state oluşturuyoruz, başlangıçta form alanları boş olarak ayarlanıyor.
    username: '', // Kullanıcı adı alanı
    email: '', // Email alanı
    password: '', // Şifre alanı
  });
  const navigate = useNavigate(); // useNavigate hook'u ile navigate fonksiyonunu kullanarak sayfa yönlendirmesi yapacağız.
  const apiUrl = import.meta.env.VITE_API_BASE_URL; //.env frontend kısmından url http kısmını cekiyoruz.

  const handleInputChange = (e) => {
    // Formdaki inputların değişimlerini yönetmek için handleInputChange fonksiyonunu tanımlıyoruz.
    const { name, value } = e.target; // Event'ten gelen input elemanının name ve value özelliklerini alıyoruz.
    setFormData({ ...formData, [name]: value }); // formData state'ini kopyalıyoruz ve değişen inputun name özelliğine göre yeni değeri güncelliyoruz.
  };

  const handleRegister = async (e) => {
    // Kayıt işlemi için asenkron bir handleRegister fonksiyonu oluşturuyoruz.
    e.preventDefault(); // Formun varsayılan yenileme davranışını engelliyoruz.
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        // API'ye POST isteği göndererek kayıt işlemi yapıyoruz.
        method: 'POST', // İsteğin HTTP metodunu POST olarak belirtiyoruz.
        headers: {
          'Content-Type': 'application/json', // Gönderilen verilerin JSON formatında olduğunu belirtiyoruz.
        },
        body: JSON.stringify(formData), // formData'yı JSON formatına çevirerek isteğin gövdesine ekliyoruz.
      });

      if (response.ok) {
        // Eğer yanıt başarılıysa (200-299 arası durum kodu)
        const data = await response.json(); // JSON formatındaki veriyi elde ediyoruz.
        // const { password, ...rest } = data; // (Bu satır yorum satırı yapılmış) Şifreyi hariç tutarak diğer verileri elde etmek için kullanılıyor.

        localStorage.setItem('user', JSON.stringify(data)); // Kullanıcı verilerini localStorage'a kaydediyoruz.
        message.success('Kayıt başarılı.'); // Başarı mesajı gösteriyoruz.
        navigate('/'); // Başarılı kayıt sonrasında kullanıcıyı ana sayfaya yönlendiriyoruz.
      } else {
        message.error('Kayıt başarısız.'); // Yanıt başarısızsa hata mesajı gösteriyoruz.
      }
    } catch (error) {
      // Eğer bir hata oluşursa
      console.log('Giriş hatası:', error); // Hata mesajını konsola yazdırıyoruz.
    }
  };

  return (
    <div className="account-column">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        {' '}
        {/* Form gönderildiğinde handleRegister fonksiyonunu çağırıyoruz */}
        <div>
          <label>
            <span>
              Username <span className="required">*</span>
            </span>
            <input type="text" onChange={handleInputChange} name="username" />
            {/* Kullanıcı adı için input, handleInputChange ile güncellenir */}
          </label>
        </div>
        <div>
          <label>
            <span>
              Email address <span className="required">*</span>
            </span>
            <input type="email" onChange={handleInputChange} name="email" />
            {/* Email için input, handleInputChange ile güncellenir */}
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input
              type="password"
              onChange={handleInputChange}
              name="password"
            />
            {/* Şifre için input, handleInputChange ile güncellenir */}
          </label>
        </div>
        <div className="privacy-policy-text remember">
          <p>
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our <a href="#">privacy policy.</a>
          </p>
          <button className="btn btn-sm">Register</button>
          {/* Formu göndermek için bir buton, handleRegister fonksiyonunu tetikler */}
        </div>
      </form>
    </div>
  );
};

export default Register; // Register bileşenini dışa aktarıyoruz, böylece başka dosyalarda kullanabiliriz.
