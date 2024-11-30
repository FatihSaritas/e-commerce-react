import ReviewForm from './ReviewForm'; // Yorum ekleme formu bileşenini içe aktarır.
import ReviewsItem from './ReviewsItem'; // Her bir yorumu temsil eden bileşeni içe aktarır.
import PropTypes from 'prop-types'; // Propsların doğru türde olmasını kontrol etmek için PropTypes kütüphanesini kullanır.
import './Reviews.css'; // Bu bileşene özel stilleri içe aktarır.
import { useEffect, useState } from 'react'; // React'in Hook'larını kullanmak için import eder.
import { message } from 'antd'; // Kullanıcıya bilgi mesajları göstermek için Ant Design'dan 'message' bileşeni.

const Reviews = ({ active, singleProduct, setSingleProduct }) => {
  // Reviews bileşeni, aktif sekme ve ürün bilgisi için props alır.
  const [users, setUsers] = useState([]); // Kullanıcı bilgilerini tutmak için bir state tanımlar.
  const apiUrl = import.meta.env.VITE_API_BASE_URL; // Çevre değişkenlerinden API temel URL'sini alır.
  const thisReview = []; // Her yorum ve ilgili kullanıcı bilgilerini saklamak için boş bir dizi oluşturur.

  useEffect(() => {
    // Bileşen yüklendiğinde çalışacak bir yan etki oluşturur.
    const fetchUsers = async () => {
      // Kullanıcı bilgilerini almak için asenkron bir fonksiyon.
      try {
        const response = await fetch(`${apiUrl}/api/users`); // API'ye kullanıcı verisi almak için GET isteği gönderir.

        if (response.ok) {
          // Eğer yanıt başarılıysa...
          const data = await response.json(); // Yanıtı JSON formatında ayrıştırır.
          setUsers(data); // Kullanıcı bilgilerini state'e kaydeder.
        } else {
          message.error('Veri getirme başarısız.'); // Hata durumunda kullanıcıya bir mesaj gösterir.
        }
      } catch (error) {
        // Bir hata meydana gelirse...
        console.log('Veri hatası:', error); // Hatanın konsola yazdırılmasını sağlar.
      }
    };
    fetchUsers(); // Kullanıcı verilerini almak için fetchUsers fonksiyonunu çağırır.
  }, [apiUrl]); // Sadece `apiUrl` değiştiğinde bu useEffect çalışır.

  singleProduct && // Eğer bir ürün seçilmişse...
    singleProduct.reviews.forEach((review) => {
      // Ürünün yorumlarını tek tek işler.
      const matchingUsers = users?.filter((user) => user._id === review.user); // Yorum sahibini kullanıcı listesinde arar.

      matchingUsers.forEach((matchingUser) => {
        // Eşleşen her kullanıcı için...
        thisReview.push({
          // Yorum ve kullanıcı bilgisini `thisReview` dizisine ekler.
          review: review,
          user: matchingUser,
        });
      });
    });

  return (
    <div className={`tab-panel-reviews ${active}`}>
      {' '}
      {/* Aktif sekmeye bağlı olarak bir CSS sınıfı ekler. */}
      {singleProduct && singleProduct.reviews.length > 0 ? ( // Eğer ürünün yorumları varsa...
        <>
          <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>{' '}
          {/* Örnek bir başlık gösterir. */}
          <div className="comments">
            {' '}
            {/* Yorumlar için bir kapsayıcı. */}
            <ol className="comment-list">
              {' '}
              {/* Yorumları liste olarak görüntüler. */}
              {thisReview.map(
                (
                  item,
                  index, // Tüm yorumları döngüyle işler.
                ) => (
                  <ReviewsItem key={index} item={item} reviewItem={item} /> // Her yorumu `ReviewsItem` bileşeni ile gösterir.
                ),
              )}
            </ol>
          </div>
        </>
      ) : (
        <h3>Hiç yorum yok...</h3> // Yorum yoksa kullanıcıya bir mesaj gösterir.
      )}
      <div className="review-form-wrapper">
        {' '}
        {/* Yorum ekleme formu için bir kapsayıcı. */}
        <h2>Add a review</h2> {/* Form başlığı. */}
        <ReviewForm
          singleProduct={singleProduct} // Yorum formuna ürün bilgilerini prop olarak gönderir.
          setSingleProduct={setSingleProduct} // Ürün bilgilerini güncellemek için bir fonksiyon gönderir.
        />
      </div>
    </div>
  );
};

export default Reviews; // Bileşeni dışa aktarır.

Reviews.propTypes = {
  // Bileşenin alacağı propsların türlerini belirtir.
  active: PropTypes.string, // Aktif sekme bilgisi string olmalı.
  singleProduct: PropTypes.object, // Ürün bilgisi bir nesne olmalı.
  setSingleProduct: PropTypes.func, // Ürün bilgilerini güncelleyen bir fonksiyon olmalı.
};
