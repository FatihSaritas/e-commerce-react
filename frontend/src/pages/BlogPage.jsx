import Blogs from '../components/Blogs/Blogs';
// 'Blogs' bileşenini içe aktarıyoruz. Bu bileşen, blog yazılarının listelenmesi veya tek tek blog detaylarının gösterilmesini sağlayan bileşendir.

const BlogPage = () => {
  // 'BlogPage' fonksiyonel bileşenini tanımlıyoruz. Bu bileşen, blog sayfasının içeriğini oluşturur.
  return (
    <div className="blog-page">
      {/* 'blog-page' sınıfına sahip bir 'div' öğesi içerisinde içerik render edilecek. */}
      <Blogs />
      {/* 'Blogs' bileşenini render ediyoruz. Bu bileşen, blog yazılarını listelemek için kullanılır. */}
    </div>
  );
};

export default BlogPage;
// 'BlogPage' bileşenini dışa aktarıyoruz. Böylece başka dosyalarda bu bileşen kullanılabilir (örneğin bir rota ile).
