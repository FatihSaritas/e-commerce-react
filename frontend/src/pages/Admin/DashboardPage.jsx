import { Row, Col, Card, Statistic } from 'antd';
// Ant Design'den `Row`, `Col`, `Card` ve `Statistic` bileşenleri projeye dahil ediliyor.
// Bu bileşenler düzenleme ve istatistik göstermek için kullanılır.

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
// `recharts` kütüphanesinden grafik bileşenleri içe aktarılıyor.
// Çizgi grafikleri oluşturmak için gerekli bileşenler kullanılır.

const DashboardPage = () => {
  // Dashboard bileşeni tanımlanıyor.

  const productSalesData = [
    // Ürün satışlarıyla ilgili örnek veri. Her ayın adı ve satılan ürün sayısı bulunuyor.
    { name: 'Ocak', satilanUrunSayisi: 20 },
    { name: 'Şubat', satilanUrunSayisi: 15 },
    { name: 'Mart', satilanUrunSayisi: 5 },
    { name: 'Nisan', satilanUrunSayisi: 25 },
    { name: 'Mayıs', satilanUrunSayisi: 30 },
    { name: 'Haziran', satilanUrunSayisi: 17 },
  ];

  const customerData = [
    // Müşteri sayılarıyla ilgili örnek veri. Her ayın adı ve müşteri sayısı bulunuyor.
    { name: 'Ocak', musteriSayisi: 30 },
    { name: 'Şubat', musteriSayisi: 15 },
    { name: 'Mart', musteriSayisi: 20 },
    { name: 'Nisan', musteriSayisi: 10 },
    { name: 'Mayıs', musteriSayisi: 25 },
    { name: 'Haziran', musteriSayisi: 9 },
  ];

  return (
    <div>
      {/* Ana bileşenin dönüştürdüğü içerik. */}
      <Row gutter={16}>
        {/* Ant Design `Row` düzen bileşeni. İçindeki kolonlar arasındaki boşluk `gutter` ile belirlenir. */}
        <Col span={8}>
          {/* `Col` bileşeni, 12 birimlik bir düzen sisteminde 8 birim genişlik kaplar. */}
          <Card>
            {/* `Card` bileşeni, istatistikleri göstermek için kullanılıyor. */}
            <Statistic title="Toplam Ürün Satışı" value={12} />
            {/* `Statistic` bileşeni, başlık ve değer gösterir. Burada toplam satılan ürün sayısı gösteriliyor. */}
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Toplam Müşteri Sayısı" value={5} />
            {/* Toplam müşteri sayısını gösteriyor. */}
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Toplam Gelir" value={7321} prefix="$" />
            {/* Toplam geliri gösteriyor. `prefix` ile para birimi sembolü ekleniyor. */}
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: '20px' }}>
        {/* Yeni bir kart, üst tarafında 20px boşluk bırakılarak çiziliyor. */}
        <h2>Son Aydaki Ürün Satış Artışı</h2>
        {/* Kartın başlığı. */}
        <LineChart
          width={600}
          height={600}
          data={productSalesData}
          margin={{ top: 5, right: 30, bottom: 5 }}
        >
          {/* Çizgi grafiği oluşturuluyor. `width` ve `height` boyutlarını belirler. */}
          <XAxis dataKey="name" />
          {/* X ekseni için verideki `name` alanı kullanılır. Ay isimleri gösterilecek. */}
          <YAxis />
          {/* Y ekseni otomatik olarak ayarlanır. */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* Arka plan ızgarası, kesik çizgilerle gösterilir. */}
          <Tooltip />
          {/* Grafik üzerinde veri noktasına gelindiğinde bilgi göstermek için kullanılır. */}
          <Legend />
          {/* Grafiğin açıklama kısmı. */}
          <Line
            type="monotone"
            dataKey="satilanUrunSayisi"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* Çizgi grafiği tanımlanır. Verideki `satilanUrunSayisi` alanı kullanılır. 
          Çizginin rengi `stroke` ile belirtilir ve aktif nokta yarıçapı `activeDot` ile belirlenir. */}
        </LineChart>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        {/* Yeni bir kart, üst tarafında 20px boşluk bırakılarak çiziliyor. */}
        <h2>Son Aydaki Müşteri Artışı</h2>
        {/* Kartın başlığı. */}
        <LineChart
          width={600}
          height={300}
          data={customerData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {/* Çizgi grafiği oluşturuluyor. Farklı veri kümesi için kullanılıyor. */}
          <XAxis dataKey="name" />
          {/* X ekseni için verideki `name` alanı kullanılır. Ay isimleri gösterilecek. */}
          <YAxis />
          {/* Y ekseni otomatik olarak ayarlanır. */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* Arka plan ızgarası, kesik çizgilerle gösterilir. */}
          <Tooltip />
          {/* Grafik üzerinde veri noktasına gelindiğinde bilgi göstermek için kullanılır. */}
          <Legend />
          {/* Grafiğin açıklama kısmı. */}
          <Line
            type="monotone"
            dataKey="musteriSayisi"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
          {/* Çizgi grafiği tanımlanır. Verideki `musteriSayisi` alanı kullanılır. 
          Çizginin rengi `stroke` ile belirtilir ve aktif nokta yarıçapı `activeDot` ile belirlenir. */}
        </LineChart>
      </Card>
    </div>
  );
};

export default DashboardPage;
// `DashboardPage` bileşeni dışa aktarılır, başka dosyalarda kullanılabilir.
