import { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import './Gallery.css';

function PrevBtn({ onClick }) {
  //  bu settingsdeki özellikleri fonskiyonda belirttik işlemlerini classnameler daha önceki carousel kodları aklımız karışmasın sadece react slick ile yapmay ıöğrendik bu kısımda
  return (
    <button
      className="glide__arrow glide__arrow--left"
      data-glide-dir="<"
      onClick={onClick}
      style={{
        zIndex: '2',
      }}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

function NextBtn({ onClick }) {
  //  onClick olayınıda belirtmek zorundayız çünkü bir tıklama olayı
  return (
    <button
      className="glide__arrow glide__arrow--right"
      data-glide-dir=">"
      onClick={onClick}
      style={{
        zIndex: '2',
      }}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

NextBtn.propTypes = {
  onClick: PropTypes.func,
};

PrevBtn.propTypes = {
  onClick: PropTypes.func,
};

const Gallery = ({ singleProduct }) => {
  const [activeImg, setActiveImg] = useState({
    img: singleProduct.img[0],
    imgIndex: 0, // burada index ekleme sebebimiz activelik kısmında kullanmak için 3 fotoda sağ sol butonları gmzükmediğinde 4 lü fotoğraflarda da aynı urun koydugumuzda 2 sinede aktiflık border veriyor bunun önüne geçtik
  });

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={`${activeImg.img}`} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...sliderSettings}>
              {singleProduct.img.map((itemImg, index) => (
                <li
                  className="glide__slide glide__slide--active"
                  key={index}
                  onClick={() =>
                    setActiveImg({
                      img: itemImg, // bunuda thumbsın da id göre içinde sırada hangisi varsa o fotoyu ele aldık
                      imgIndex: index, // burda aktif olan indexi buyuk fotoya yansıtma amacımız indexe göre
                    })
                  }
                >
                  <img
                    src={`${itemImg}`}
                    alt=""
                    className={`img-fluid ${
                      activeImg.imgIndex === index ? 'active' : ''
                      // en son olarakda ana ekran fotoğrafında activeImg index bizim verdiğimiz index eşitse onu göster ona border ekle demiş olduk thumbslar içerisinde
                    } `}
                  />
                </li>
              ))}
            </Slider>
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls"></div>
      </div>
    </div>
  );
};

export default Gallery;

Gallery.propTypes = {
  singleProduct: PropTypes.object,
};
