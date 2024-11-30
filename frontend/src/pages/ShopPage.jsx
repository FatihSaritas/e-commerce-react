import { Fragment } from 'react';
// React'ten 'Fragment' bileşenini içe aktarıyoruz.
// 'Fragment', gereksiz bir DOM elemanı eklemeden, birden fazla öğeyi döndürmemizi sağlar.

import Categories from '../components/Categories/Categories';
// 'Categories' bileşenini içe aktarıyoruz. Bu bileşen, ürün kategorilerini listelemek için kullanılır.

import Products from '../components/Products/Products';
// 'Products' bileşenini içe aktarıyoruz. Bu bileşen, ürünleri listelemek için kullanılır.

import CampaignSingle from '../components/CampaignSingle/CampaignSingle';
// 'CampaignSingle' bileşenini içe aktarıyoruz. Bu bileşen, tek bir kampanya detayını göstermek için kullanılır.

const ShopPage = () => {
  // ShopPage fonksiyonel bileşenini tanımlıyoruz. Bu bileşen, mağaza sayfasını temsil eder.

  return (
    <Fragment>
      {/* Fragment kullanılarak, gereksiz bir HTML element eklemeden, 
          birden fazla bileşeni bir arada döndürüyoruz. */}
      <Categories />
      {/* 'Categories' bileşenini render ediyoruz. Bu bileşen, kategori listesi veya seçim alanı gösterebilir. */}

      <Products />
      {/* 'Products' bileşenini render ediyoruz. Bu bileşen, ürünleri listeleyecektir. */}

      <CampaignSingle />
      {/* 'CampaignSingle' bileşenini render ediyoruz. Bu bileşen, tek bir kampanyanın detaylarını gösterebilir. */}

      <Products />
      {/* 'Products' bileşenini tekrar render ediyoruz. Bu, birden fazla ürün listesi veya farklı kategoriler olabilir. */}
    </Fragment>
  );
};

export default ShopPage;
// 'ShopPage' bileşenini dışa aktarıyoruz, böylece başka bir dosyada kullanılabilir.
