import BlogDetails from '../components/BlogDetails/BlogDetails';
// 'BlogDetails' bileşenini içe aktarıyoruz. Bu bileşen, bir blog yazısının detaylarını göstermek için kullanılır.

const BlogDetailsPage = () => {
  // 'BlogDetailsPage' fonksiyonel bileşenini tanımlıyoruz. Bu bileşen, blog yazısının detay sayfasını oluşturur.
  return <BlogDetails />;
  // 'BlogDetails' bileşenini render ediyoruz. Bu bileşen, bir blog yazısının içeriğini ve detaylarını gösterir.
};

export default BlogDetailsPage;
// 'BlogDetailsPage' bileşenini dışa aktarıyoruz. Böylece başka dosyalarda bu bileşen kullanılabilir.
