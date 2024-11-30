import { createContext } from 'react';
// `createContext`, React'te yeni bir context oluşturmak için kullanılır. Bu, verileri bileşenler arasında paylaşmak için kullanılır.

export const CartContext = createContext();
// `CartContext`, sepetle ilgili verilerin yönetileceği context'i oluşturur.
// `createContext()` boş bir context döner, ancak bu context'i daha sonra bileşenlerde `CartProvider` ile kullanabiliriz.
// `export` ifadesi ile `CartContext` dışarıya aktarılır, böylece diğer dosyalarda kullanılabilir.
