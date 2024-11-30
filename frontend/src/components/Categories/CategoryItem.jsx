import PropTypes from 'prop-types'; // Prop tiplerini kontrol etmek için `prop-types` kütüphanesini içe aktarıyoruz.
import './CategoryItem.css'; // Bu bileşen için yazılmış CSS dosyasını içe aktarıyoruz.

const CategoryItem = ({ category }) => {
  // `CategoryItem` adında bir React fonksiyon bileşeni tanımlıyoruz, `category` adında bir prop alıyor.
  return (
    <li className="category-item">
      {/* Her bir kategori öğesini temsil eden liste elemanı */}
      <a href="#">
        <img src={category.img} alt="" className="category-image" />{' '}
        {/* Kategori resmini gösteriyoruz, `src` değeri `category` prop'undaki `img` alanından geliyor */}
        <span className="category-title">{category.name}</span>{' '}
        {/* Kategorinin adını gösteriyoruz, `category` prop'undaki `name` alanını kullanıyoruz */}
      </a>
    </li>
  );
};

export default CategoryItem; // `CategoryItem` bileşenini dışa aktararak başka dosyalarda kullanılabilir hale getiriyoruz.

CategoryItem.propTypes = {
  // Bileşenin aldığı prop'ların veri tipini kontrol ediyoruz.
  category: PropTypes.object, // `category` prop'unun bir nesne olması gerektiğini belirtiyoruz.
};
