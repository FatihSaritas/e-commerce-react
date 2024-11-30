import PropTypes from 'prop-types';
// PropTypes, bileşenin alacağı prop'ların türlerini tanımlamak için kullanılır.
// Burada, `reviewItem` prop'ının bir obje olacağını belirtiyoruz.

const ReviewItem = ({ reviewItem }) => {
  // `reviewItem` prop'ı bu bileşene geçirildiğinde, bu prop'ı alıyoruz.
  // `reviewItem` içerisinde `review` ve `user` gibi nesneler bulunuyor.

  const { review, user } = reviewItem;
  // `reviewItem` objesinin içindeki `review` ve `user` nesnelerini alıyoruz.

  const { text, createdAt, rating } = review;
  // `review` nesnesinden `text`, `createdAt` ve `rating` gibi alt özellikleri alıyoruz.

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // Tarih formatını ayarlıyoruz. Yıl, ay (tam isim) ve gün bilgilerini almak için.

  const formattedDate = new Date(createdAt).toLocaleDateString(
    'tr-TR',
    options,
  );
  // `createdAt` tarih bilgisini, Türkçe formatta (`tr-TR`) istediğimiz şekilde biçimlendiriyoruz.
  // Örneğin, "5 Kasım 2024" gibi bir format elde edilir.

  return (
    <li className="comment-item">
      {/* `comment-item` sınıfı, her bir yorumun içinde yer alacak olan liste öğesinin etrafını sarar. */}

      <div className="comment-avatar">
        {/* Kullanıcının avatarını gösterecek olan kapsayıcı div */}
        <img src={user.avatar} alt="" width={60} />
        {/* Kullanıcının avatarını `user.avatar` yoluyla alıp bir resim olarak gösteriyoruz. */}
      </div>

      <div className="comment-text">
        {/* Yorum metnini içeren kapsayıcı div */}

        <ul className="comment-star">
          {/* Yıldızları gösterecek bir liste */}
          {Array.from({ length: rating }, (_, index) => {
            // Yıldız sayısını `rating` değerine göre belirliyoruz.
            // `Array.from` ile belirtilen uzunluk kadar bir dizi oluşturuyoruz.
            return (
              <li key={index}>
                {/* Yıldız ikonu */}
                <i className="bi bi-star-fill"></i>
              </li>
            );
          })}
        </ul>

        <div className="comment-meta">
          {/* Yorumun kullanıcı adı ve tarihi gibi meta bilgileri */}
          <strong> {user.username}</strong>
          {/* Kullanıcının ismini gösteriyoruz. */}
          <span> - </span>
          {/* Kullanıcı adı ve tarih arasında bir tire işareti gösteriyoruz. */}
          <time>{formattedDate}</time>
          {/* Biçimlendirilmiş tarihi gösteriyoruz. */}
        </div>

        <div className="comment-description">
          {/* Yorum metnini içeren bölüm */}
          <p>{text}</p>
          {/* Kullanıcının yazdığı yorum metnini `text` ile gösteriyoruz. */}
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;
// Bileşeni dışa aktararak başka dosyalarda kullanılabilir hale getiriyoruz.

ReviewItem.propTypes = {
  reviewItem: PropTypes.object,
};
// `reviewItem` prop'ının bir obje olacağını belirtmek için `PropTypes` kullanıyoruz.
// Böylece, bu bileşene geçerli olmayan bir prop türü gönderildiğinde uyarı verir.
