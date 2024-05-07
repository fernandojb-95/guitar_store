import Footer from "./components/Footer";
import Header from "./components/Header";
import Product from "./components/Product";
import useCart from "./hooks/useCart";

function App() {

  const {
    cart,
    addToCart,
    deleteCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    products,
    isEmpty,
    totalPrice
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        deleteCart={deleteCart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        isEmpty={isEmpty}
        totalPrice={totalPrice}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {products.map((guitar, i) => (
            <Product key={i} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
