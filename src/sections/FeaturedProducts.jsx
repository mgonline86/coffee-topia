import products from "../data/featuredProducts.json";
export default function FeaturedProducts() {
  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.slug}>
            <h1>{product.title}</h1>
          </div>
        );
      })}
    </div>
  );
}
