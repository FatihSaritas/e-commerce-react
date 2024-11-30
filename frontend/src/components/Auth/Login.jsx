import { message } from 'antd'; // Ant Design kütüphanesinden mesaj gösterme fonksiyonunu içe aktarıyoruz.
import { useState } from 'react'; // React'in `useState` hook'unu içe aktarıyoruz.
import { useNavigate } from 'react-router-dom'; // Sayfalar arası yönlendirme için React Router'ın `useNavigate` fonksiyonunu içe aktarıyoruz.

const Login = () => {
  // form verilerini saklamak için `formData` adında bir state oluşturuyoruz ve başlangıç değerini email ve password alanlarıyla boş bırakıyoruz.
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Sayfa yönlendirmeleri yapmak için `navigate` fonksiyonunu tanımlıyoruz.
  const apiUrl = import.meta.env.VITE_API_BASE_URL; // Çevre değişkenlerinden API URL'sini alıyoruz.

  // Giriş formu inputlarındaki değişiklikleri izleyen bir fonksiyon.
  const handleInputChange = (e) => {
    const { name, value } = e.target; // O anki inputun name ve value değerlerini alıyoruz.
    setFormData({ ...formData, [name]: value }); // `formData` state'ini güncelliyoruz; her input değiştiğinde formData'ya ekleniyor.
  };

  // Form gönderildiğinde giriş yapma işlemini gerçekleştiren fonksiyon.
  const handleLogin = async (e) => {
    e.preventDefault(); // Formun kendi kendine sayfayı yenilemesini engelliyoruz.
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        // API'ye POST isteği gönderiyoruz.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON formatında veri gönderileceğini belirtiyoruz.
        },
        body: JSON.stringify(formData), // formData'yı JSON formatına çevirip isteğe ekliyoruz.
      });

      if (response.ok) {
        // Eğer yanıt başarılıysa (status code 200)
        const data = await response.json(); // Yanıt verisini JSON formatında alıyoruz.
        localStorage.setItem('user', JSON.stringify(data)); // Kullanıcı verisini `localStorage`'a kaydediyoruz.
        message.success('Giriş başarılı.'); // Başarı mesajı gösteriyoruz.

        if (data.role === 'admin') {
          // Kullanıcının rolü 'admin' ise
          window.location.href = '/admin'; // Admin sayfasına yönlendiriyoruz.
        } else {
          navigate('/'); // Aksi takdirde ana sayfaya yönlendiriyoruz.
        }
      } else {
        message.error('Giriş başarısız.'); // Giriş başarısızsa hata mesajı gösteriyoruz.
      }
    } catch (error) {
      console.log('Giriş hatası:', error); // Hata oluşursa konsola hata mesajı yazıyoruz.
    }
  };

  return (
    <div className="account-column">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {' '}
        {/* Form submit edildiğinde `handleLogin` fonksiyonunu çağırıyoruz. */}
        <div>
          <label>
            <span>
              Username or email address <span className="required">*</span>
            </span>
            <input type="text" name="email" onChange={handleInputChange} />{' '}
            {/* Email input alanı */}
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input
              type="password"
              name="password"
              onChange={handleInputChange} // Kullanıcı parola alanına her veri girdiğinde `handleInputChange` fonksiyonunu çağırıyoruz.
            />
          </label>
        </div>
        <p className="remember">
          <label>
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <button className="btn btn-sm">Login</button> {/* Giriş butonu */}
        </p>
        <a href="#" className="form-link">
          Lost your password?
        </a>
      </form>
    </div>
  );
};

export default Login; // `Login` bileşenini diğer dosyalarda kullanılabilmesi için dışa aktarıyoruz.
