import React from 'react';
// React'i içe aktarıyoruz. React, bileşenler oluşturmak için gereklidir ve JSX sözdizimini kullanabilmek için gereklidir.
import Sliders from '../components/Slider/Sliders';
// Sliders bileşenini içe aktarıyoruz. Bu bileşen, genellikle görsel veya içerik kaydırıcılarını (carousel) göstermek için kullanılır.
import Categories from '../components/Categories/Categories';
// Kategoriler bileşenini içe aktarıyoruz. Bu bileşen, ürün kategorilerini listelemek veya göstermek için kullanılır.
import Products from '../components/Products/Products';
// Ürünler bileşenini içe aktarıyoruz. Bu bileşen, ana sayfada ürünlerin listesini görüntülemek için kullanılır.
import Campaigns from '../components/Campaigns/Campaigns';
// Kampanyalar bileşenini içe aktarıyoruz. Bu bileşen, sayfada mevcut kampanyaları veya özel teklifleri gösterebilir.
import Blogs from '../components/Blogs/Blogs';
// Bloglar bileşenini içe aktarıyoruz. Bu bileşen, sayfada blog yazıları veya makaleleri göstermek için kullanılır.
import Brands from '../components/Brands/Brands';
// Markalar bileşenini içe aktarıyoruz. Bu bileşen, belirli markaları tanıtmak ve göstermek için kullanılır.
import CampaignSingle from '../components/CampaignSingle/CampaignSingle';
// Tek bir kampanyayı görüntüleyen bileşeni içe aktarıyoruz. Bu bileşen genellikle tek bir kampanyanın detaylarını göstermek için kullanılır.

const HomePage = () => {
  // 'HomePage' fonksiyonel bileşenini tanımlıyoruz. Bu bileşen, ana sayfanın içeriğini oluşturur.

  return (
    <React.Fragment>
      {/* React.Fragment, bir bileşenin birden fazla öğe döndürmesine olanak tanır, ancak DOM'a ekstra bir öğe eklemez. */}
      <Sliders />
      {/* Sliders bileşenini render ediyoruz. Bu, ana sayfada kaydırıcıyı gösterecektir. */}
      <Categories />
      {/* Categories bileşenini render ediyoruz. Bu, ürün kategorilerini ana sayfada gösterecek. */}
      <Products />
      {/* Products bileşenini render ediyoruz. Bu, ana sayfada ürünleri listeleyecek. */}
      <Campaigns />
      {/* Campaigns bileşenini render ediyoruz. Bu, mevcut kampanyaları veya promosyonları gösterecek. */}
      <Products />
      {/* Products bileşenini tekrar render ediyoruz. Bu, ikinci bir ürün listesi veya başka bir kategori göstermek için olabilir. */}
      <Blogs />
      {/* Blogs bileşenini render ediyoruz. Bu, ana sayfada blog içeriklerini gösterecek. */}
      <Brands />
      {/* Brands bileşenini render ediyoruz. Bu, sayfada markaları listeleyecek. */}
      <CampaignSingle />
      {/* CampaignSingle bileşenini render ediyoruz. Bu, tek bir kampanyayı veya promosyonu detaylı olarak gösterecek. */}
    </React.Fragment>
  );
};

export default HomePage;
// HomePage bileşenini dışa aktarıyoruz. Böylece bu bileşeni diğer dosyalarda kullanabiliriz (örneğin, rotalarda).
