import Proptypes from 'prop-types';
// React'te prop türlerini doğrulamak için kullanılan 'prop-types' paketini içe aktarıyoruz.
// Bu paket, bileşenin aldığı prop'ların türlerini denetler ve geliştiricinin hataları yakalamasını sağlar.

import { useState } from 'react';
// React'teki 'useState' hook'unu içe aktarıyoruz.
// Bu hook, bileşenin durumunu (state) yönetmemizi sağlar.

import Footer from '../components/Layout/Footer/Footer';
// Uygulamanın alt kısmında kullanılacak olan Footer bileşenini içe aktarıyoruz.

import Header from '../components/Layout/Header/Header';
// Uygulamanın üst kısmında kullanılacak olan Header bileşenini içe aktarıyoruz.

import Search from '../components/Modals/Search/Search';
// Arama modalini içe aktarıyoruz. Bu modal arama için kullanılacak.

import Dialog from '../components/Modals/Dialog/Dialog';
// Dialog modalini içe aktarıyoruz. Bu modal genel olarak bir uyarı ya da bilgi sunmak için kullanılabilir.

import { useEffect } from 'react';
// React'teki 'useEffect' hook'unu içe aktarıyoruz.
// Bu hook, bileşen her render olduğunda çalışacak işlemler için kullanılır.

const MainLayout = ({ children }) => {
  // MainLayout bileşeni, tüm sayfa düzenini sağlayan bileşendir.
  // 'children' prop'u, bu bileşenin içine yerleştirilen içeriği temsil eder.

  const [isSearchShow, setIsSearchShow] = useState(false);
  // 'isSearchShow' durumu arama modalinin görünür olup olmadığını kontrol eder.
  // Başlangıçta 'false' olarak ayarlanır, yani arama modalı görünmez.

  const [isDialogShow, setIsDialogShow] = useState(false);
  // 'isDialogShow' durumu, dialog modalinin görünür olup olmadığını kontrol eder.
  // Başlangıçta 'false' olarak ayarlanır, yani dialog modalı görünmez.

  useEffect(() => {
    // useEffect hook'u, bileşen render olduktan sonra çalışacak bir işlem tanımlar.

    const dialogStatus = localStorage.getItem('dialog')
      ? JSON.parse(localStorage.getItem('dialog'))
      : localStorage.setItem('dialog', JSON.stringify(true));
    // LocalStorage'den 'dialog' adlı öğeyi alıyoruz.
    // Eğer 'dialog' mevcutsa, bunu JSON.parse ile bir boolean değere dönüştürüyoruz.
    // Eğer yoksa, 'dialog' öğesini true olarak localStorage'a kaydediyoruz.

    setTimeout(() => {
      setIsDialogShow(dialogStatus);
      // 2 saniye sonra, 'dialog' durumunu 'setIsDialogShow' ile güncelliyoruz.
      // Eğer 'dialog' durumunun değeri true ise dialog modalı gösterilir.
    }, 2000);
    // 2 saniye bekleme süresi ekliyoruz. Bu süre zarfında modalın gösterilmesi sağlanır.
  }, []);
  // useEffect'in ikinci parametresi boş bir dizi olduğu için, bu efekt yalnızca bileşenin ilk render'ında çalışır.

  return (
    <div className="main-layout">
      {/* Ana düzenin etrafına sarılan div. */}

      <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow} />
      {/* Dialog bileşenini render ediyoruz. 'isDialogShow' ile gösterilip gösterilmeyeceği kontrol ediliyor. */}

      <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
      {/* Search bileşenini render ediyoruz. 'isSearchShow' ile görünürlük kontrol ediliyor. */}

      <Header setIsSearchShow={setIsSearchShow} />
      {/* Header bileşenini render ediyoruz. 'setIsSearchShow' prop'u ile Header, arama modalini açabilir. */}

      {children}
      {/* MainLayout bileşeninin içine geçen çocuk bileşenleri (content) render ediyoruz. */}

      <Footer />
      {/* Footer bileşenini render ediyoruz. Sayfanın alt kısmında yer alacak içerik */}
    </div>
  );
};

export default MainLayout;
// MainLayout bileşenini dışa aktarıyoruz, böylece başka dosyalarda kullanılabilir.

MainLayout.propTypes = {
  children: Proptypes.node,
  // 'children' prop'unun bir React node (yani herhangi bir bileşen veya HTML öğesi) olduğunu belirtiyoruz.
  // PropTypes, 'children' prop'unun tipinin doğruluğunu kontrol eder.
};

// bu yapı eslint düzenini oturtmak için kullanılır tip belirtmesi için genelde yapılır.
