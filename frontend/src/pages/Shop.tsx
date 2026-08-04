import { Link } from 'react-router-dom'
import { useState } from 'react'

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All Collections')

  const products = [
    // Bouquets
    { id: 1, name: 'Midnight Velvet', price: '$145.00', category: 'Bouquets', image: '/Bouquets/5f470670cf477c2f0e6aa9e5eb09beb3.jpg' },
    { id: 2, name: 'Rose Elegance', price: '$125.00', category: 'Bouquets', image: '/Bouquets/62b19dfc90fc8efe38fefefeaf06aed8.jpg' },
    { id: 3, name: 'Pastel Dreams', price: '$135.00', category: 'Bouquets', image: '/Bouquets/674d716d284ebc4a2e34edd597456f16.jpg' },
    { id: 4, name: 'Lavender Bliss', price: '$115.00', category: 'Bouquets', image: '/Bouquets/91a81b1aba67cf0ba032f31b46976846.jpg' },
    { id: 5, name: 'Sunset Glow', price: '$155.00', category: 'Bouquets', image: '/Bouquets/ad5903ee1299c87b4ea63220bbec4af0.jpg' },
    { id: 6, name: 'Summer Solstice', price: '$165.00', category: 'Bouquets', image: '/Bouquets/c2eb77c637230072d854f88191331dad.jpg' },
    { id: 7, name: 'Garden Party', price: '$140.00', category: 'Bouquets', image: '/Bouquets/deb272fbafa3125b0b39c2d754c73666.jpg' },
    // Flower Boxes
    { id: 8, name: 'Velvet Rose Box', price: '$180.00', category: 'Flower Boxes', image: '/BoxWithFlowers/27612b8d2ee543549d3be8fb7258c0f6.jpg' },
    { id: 9, name: 'Pink Paradise', price: '$195.00', category: 'Flower Boxes', image: '/BoxWithFlowers/2d69e76d6fe4b4c1d939928f03199826.jpg' },
    { id: 10, name: 'Elegant White', price: '$175.00', category: 'Flower Boxes', image: '/BoxWithFlowers/338fa0aac56fd8f177b7c0c6d98da193.jpg' },
    { id: 11, name: 'Romantic Red', price: '$200.00', category: 'Flower Boxes', image: '/BoxWithFlowers/3c77806568ab868dd4cad5f6738f5d59.jpg' },
    { id: 12, name: 'Pastel Harmony', price: '$185.00', category: 'Flower Boxes', image: '/BoxWithFlowers/40c03a219ed4b620006840ba3ba8523b.jpg' },
    { id: 13, name: 'Luxury Gold', price: '$220.00', category: 'Flower Boxes', image: '/BoxWithFlowers/4e3cd3b5d1d4f43628809c441c394391.jpg' },
    { id: 14, name: 'Blush Beauty', price: '$190.00', category: 'Flower Boxes', image: '/BoxWithFlowers/5320543dac1a21f11fc19510a7aa9bf8.jpg' },
    { id: 15, name: 'Classic Charm', price: '$170.00', category: 'Flower Boxes', image: '/BoxWithFlowers/77cb73c253d273c4f21227411c8c27c9.jpg' },
    { id: 16, name: 'Sweet Peony', price: '$165.00', category: 'Flower Boxes', image: '/BoxWithFlowers/8401582e05f17cb515a854073a426bf3.jpg' },
    { id: 17, name: 'Daisy Delight', price: '$150.00', category: 'Flower Boxes', image: '/BoxWithFlowers/8c66c11f12bfde1711e72990f75f9c6f.jpg' },
    { id: 18, name: 'Garden Fresh', price: '$160.00', category: 'Flower Boxes', image: '/BoxWithFlowers/953992a4c1ac56646864bbb7780b777d.jpg' },
    { id: 19, name: 'Spring Bloom', price: '$155.00', category: 'Flower Boxes', image: '/BoxWithFlowers/aabb9061d414e23967c59a1f8eac512c.jpg' },
    { id: 20, name: 'Floral Fantasy', price: '$210.00', category: 'Flower Boxes', image: '/BoxWithFlowers/b3dec93b3871b6c2be6aff62a309bf3a.jpg' },
    { id: 21, name: 'Rose Garden', price: '$195.00', category: 'Flower Boxes', image: '/BoxWithFlowers/b952e52e0b311cc78c31f346b1f8249b.jpg' },
    { id: 22, name: 'Eternal Love', price: '$205.00', category: 'Flower Boxes', image: '/BoxWithFlowers/f1724a19b98c14376aa8e80d894f6b30.jpg' },
    { id: 23, name: 'Golden Hour', price: '$215.00', category: 'Flower Boxes', image: '/BoxWithFlowers/f5202108e15f742c9ac42619f3444ab8.jpg' },
    // Plants in Vases
    { id: 24, name: 'Monstera Elegance', price: '$95.00', category: 'Plants in Vases', image: '/VaseWithPlant/64ccdf1005165dcb06355e147127fa9b.jpg' },
    { id: 25, name: 'Fiddle Leaf', price: '$110.00', category: 'Plants in Vases', image: '/VaseWithPlant/671746f94e2a24fa3ec0115c0c4bd841.jpg' },
    { id: 26, name: 'Snake Plant', price: '$75.00', category: 'Plants in Vases', image: '/VaseWithPlant/7663e4943b0e5d2b02627c489d64f9af.jpg' },
    { id: 27, name: 'Peace Lily', price: '$85.00', category: 'Plants in Vases', image: '/VaseWithPlant/7e9a6c39805e17c5eea3115985b1efab.jpg' },
    { id: 28, name: 'Pothos Beauty', price: '$65.00', category: 'Plants in Vases', image: '/VaseWithPlant/98074d12d9846ec16c5a1cffe00e11b2.jpg' },
    { id: 29, name: 'Rubber Plant', price: '$90.00', category: 'Plants in Vases', image: '/VaseWithPlant/a90d35f7efaa57c687da6fa43fc2405e.jpg' },
    { id: 30, name: 'Dracaena Grace', price: '$105.00', category: 'Plants in Vases', image: '/VaseWithPlant/aa532d7cf58cd126c5f2e0f0a8fb0dc3.jpg' },
    { id: 31, name: 'Bamboo Zen', price: '$80.00', category: 'Plants in Vases', image: '/VaseWithPlant/c1e4b766cddc6b0cb5d6cde7cb3db99d.jpg' },
    { id: 32, name: 'Succulent Garden', price: '$55.00', category: 'Plants in Vases', image: '/VaseWithPlant/d5eb9fe46892d2ecc37681cb1fc8efbc.jpg' },
    { id: 33, name: 'Orchid Elegance', price: '$120.00', category: 'Plants in Vases', image: '/VaseWithPlant/d701d602bd218fe5c2a93d42e607eecb.jpg' },
    { id: 34, name: 'Philodendron', price: '$70.00', category: 'Plants in Vases', image: '/VaseWithPlant/f582929d4e5d6318b944bfe029764873.jpg' },
  ]

  const categories = ['All Collections', 'Bouquets', 'Flower Boxes', 'Plants in Vases']

  const filteredProducts = selectedCategory === 'All Collections' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="bg-surface text-on-surface font-body-md pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto">
          <Link className="font-headline-md text-headline-md tracking-tighter text-primary" to="/">REDJFLUER</Link>
          <nav className="hidden md:flex items-center space-x-12">
            <Link className="font-label-caps text-label-caps text-primary border-b border-primary pb-1" to="/shop">Shop</Link>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary" href="#">Collections</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary" href="#">About</a>
          </nav>
          <div className="flex items-center space-x-6">
            <button><span className="material-symbols-outlined">search</span></button>
            <Link to="/account"><span className="material-symbols-outlined">person</span></Link>
            <Link to="/cart" className="relative">
              <span className="material-symbols-outlined">shopping_bag</span>
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] w-4 h-4 flex items-center justify-center rounded-full">2</span>
            </Link>
          </div>
        </div>
      </header>

      <nav className="flex items-center space-x-4 font-label-caps text-label-caps text-on-surface-variant mb-12">
        <Link className="hover:text-primary" to="/">Home</Link>
        <span className="text-[10px] opacity-40">/</span>
        <span className="text-primary">Shop All Botanicals</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-40 space-y-12">
            <section>
              <h3 className="font-label-caps text-label-caps text-primary mb-6">Categories</h3>
              <ul className="space-y-4">
                {categories.map(category => (
                  <li key={category}>
                    <button 
                      onClick={() => setSelectedCategory(category)}
                      className={`font-body-md ${
                        selectedCategory === category 
                          ? 'text-primary font-semibold' 
                          : 'text-on-surface-variant hover:text-primary'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </aside>

        <div className="flex-grow">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/20">
            <p className="font-body-md text-on-surface-variant"><span className="font-semibold text-primary">{filteredProducts.length}</span> arrangements found</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="group cursor-pointer">
                <div className="aspect-[1/1.25] mb-6 overflow-hidden bg-surface-container relative">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                    alt={product.name}
                    src={product.image}
                  />
                  <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-primary p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="material-symbols-outlined">shopping_bag</span>
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">{product.category}</p>
                  <h3 className="font-headline-sm text-headline-sm mb-1">{product.name}</h3>
                  <p className="font-label-caps text-label-caps">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
