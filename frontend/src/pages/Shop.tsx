import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Header from '../components/Header'

function Shop() {
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('All Collections')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Newest')
  const { addToCart } = useCart()

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && ['Bouquets', 'Flower Boxes', 'Plants in Vases'].includes(categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  const products = [
    // Bouquets
    { id: 1, name: 'Midnight Velvet', price: 145.00, category: 'Bouquets', image: '/Bouquets/5f470670cf477c2f0e6aa9e5eb09beb3.jpg', limited: true },
    { id: 2, name: 'Rose Elegance', price: 125.00, category: 'Bouquets', image: '/Bouquets/62b19dfc90fc8efe38fefefeaf06aed8.jpg' },
    { id: 3, name: 'Pastel Dreams', price: 135.00, category: 'Bouquets', image: '/Bouquets/674d716d284ebc4a2e34edd597456f16.jpg' },
    { id: 4, name: 'Lavender Bliss', price: 115.00, category: 'Bouquets', image: '/Bouquets/91a81b1aba67cf0ba032f31b46976846.jpg' },
    { id: 5, name: 'Sunset Glow', price: 155.00, category: 'Bouquets', image: '/Bouquets/ad5903ee1299c87b4ea63220bbec4af0.jpg' },
    { id: 6, name: 'Summer Solstice', price: 165.00, category: 'Bouquets', image: '/Bouquets/c2eb77c637230072d854f88191331dad.jpg' },
    { id: 7, name: 'Garden Party', price: 140.00, category: 'Bouquets', image: '/Bouquets/deb272fbafa3125b0b39c2d754c73666.jpg' },
    // Flower Boxes
    { id: 8, name: 'Velvet Rose Box', price: 180.00, category: 'Flower Boxes', image: '/BoxWithFlowers/27612b8d2ee543549d3be8fb7258c0f6.jpg' },
    { id: 9, name: 'Pink Paradise', price: 195.00, category: 'Flower Boxes', image: '/BoxWithFlowers/2d69e76d6fe4b4c1d939928f03199826.jpg' },
    { id: 10, name: 'Elegant White', price: 175.00, category: 'Flower Boxes', image: '/BoxWithFlowers/338fa0aac56fd8f177b7c0c6d98da193.jpg' },
    { id: 11, name: 'Romantic Red', price: 200.00, category: 'Flower Boxes', image: '/BoxWithFlowers/3c77806568ab868dd4cad5f6738f5d59.jpg' },
    { id: 12, name: 'Pastel Harmony', price: 185.00, category: 'Flower Boxes', image: '/BoxWithFlowers/40c03a219ed4b620006840ba3ba8523b.jpg' },
    { id: 13, name: 'Luxury Gold', price: 220.00, category: 'Flower Boxes', image: '/BoxWithFlowers/4e3cd3b5d1d4f43628809c441c394391.jpg' },
    { id: 14, name: 'Blush Beauty', price: 190.00, category: 'Flower Boxes', image: '/BoxWithFlowers/5320543dac1a21f11fc19510a7aa9bf8.jpg' },
    { id: 15, name: 'Classic Charm', price: 170.00, category: 'Flower Boxes', image: '/BoxWithFlowers/77cb73c253d273c4f21227411c8c27c9.jpg' },
    { id: 16, name: 'Sweet Peony', price: 165.00, category: 'Flower Boxes', image: '/BoxWithFlowers/8401582e05f17cb515a854073a426bf3.jpg' },
    { id: 17, name: 'Daisy Delight', price: 150.00, category: 'Flower Boxes', image: '/BoxWithFlowers/8c66c11f12bfde1711e72990f75f9c6f.jpg' },
    { id: 18, name: 'Garden Fresh', price: 160.00, category: 'Flower Boxes', image: '/BoxWithFlowers/953992a4c1ac56646864bbb7780b777d.jpg' },
    { id: 19, name: 'Spring Bloom', price: 155.00, category: 'Flower Boxes', image: '/BoxWithFlowers/aabb9061d414e23967c59a1f8eac512c.jpg' },
    { id: 20, name: 'Floral Fantasy', price: 210.00, category: 'Flower Boxes', image: '/BoxWithFlowers/b3dec93b3871b6c2be6aff62a309bf3a.jpg' },
    { id: 21, name: 'Rose Garden', price: 195.00, category: 'Flower Boxes', image: '/BoxWithFlowers/b952e52e0b311cc78c31f346b1f8249b.jpg' },
    { id: 22, name: 'Eternal Love', price: 205.00, category: 'Flower Boxes', image: '/BoxWithFlowers/f1724a19b98c14376aa8e80d894f6b30.jpg' },
    { id: 23, name: 'Golden Hour', price: 215.00, category: 'Flower Boxes', image: '/BoxWithFlowers/f5202108e15f742c9ac42619f3444ab8.jpg' },
    // Plants in Vases
    { id: 24, name: 'Monstera Elegance', price: 95.00, category: 'Plants in Vases', image: '/VaseWithPlant/64ccdf1005165dcb06355e147127fa9b.jpg' },
    { id: 25, name: 'Fiddle Leaf', price: 110.00, category: 'Plants in Vases', image: '/VaseWithPlant/671746f94e2a24fa3ec0115c0c4bd841.jpg' },
    { id: 26, name: 'Snake Plant', price: 75.00, category: 'Plants in Vases', image: '/VaseWithPlant/7663e4943b0e5d2b02627c489d64f9af.jpg' },
    { id: 27, name: 'Peace Lily', price: 85.00, category: 'Plants in Vases', image: '/VaseWithPlant/7e9a6c39805e17c5eea3115985b1efab.jpg' },
    { id: 28, name: 'Pothos Beauty', price: 65.00, category: 'Plants in Vases', image: '/VaseWithPlant/98074d12d9846ec16c5a1cffe00e11b2.jpg' },
    { id: 29, name: 'Rubber Plant', price: 90.00, category: 'Plants in Vases', image: '/VaseWithPlant/a90d35f7efaa57c687da6fa43fc2405e.jpg' },
    { id: 30, name: 'Dracaena Grace', price: 105.00, category: 'Plants in Vases', image: '/VaseWithPlant/aa532d7cf58cd126c5f2e0f0a8fb0dc3.jpg' },
    { id: 31, name: 'Bamboo Zen', price: 80.00, category: 'Plants in Vases', image: '/VaseWithPlant/c1e4b766cddc6b0cb5d6cde7cb3db99d.jpg' },
    { id: 32, name: 'Succulent Garden', price: 55.00, category: 'Plants in Vases', image: '/VaseWithPlant/d5eb9fe46892d2ecc37681cb1fc8efbc.jpg' },
    { id: 33, name: 'Orchid Elegance', price: 120.00, category: 'Plants in Vases', image: '/VaseWithPlant/d701d602bd218fe5c2a93d42e607eecb.jpg' },
    { id: 34, name: 'Philodendron', price: 70.00, category: 'Plants in Vases', image: '/VaseWithPlant/f582929d4e5d6318b944bfe029764873.jpg' },
  ]

  const categories = ['All Collections', 'Bouquets', 'Flower Boxes', 'Plants in Vases', 'Roses', 'Gifts', 'Luxury Collections']

  const filteredProducts = selectedCategory === 'All Collections' 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products.filter(p => p.category === selectedCategory && p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price
    if (sortBy === 'Price: High to Low') return b.price - a.price
    return a.id - b.id
  })

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      size: 'Classic',
      price: product.price,
      image: product.image
    })
  }

  return (
    <div className="bg-surface text-on-surface font-body-md">
      <Header />
      <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
        {/* Breadcrumbs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <nav className="flex items-center space-x-4 font-label-caps text-label-caps text-on-surface-variant">
            <Link className="hover:text-primary transition-colors" to="/">Home</Link>
            <span className="text-[10px] opacity-40">/</span>
            <span className="text-primary">Shop All Botanicals</span>
          </nav>
          <div className="relative w-full md:w-80 group">
            <input 
              className="w-full bg-transparent border-none border-b border-primary py-2 pr-10 focus:ring-0 font-body-md text-on-surface placeholder:text-outline/50 transition-all" 
              placeholder="Search arrangements..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-outline group-hover:text-primary transition-colors">search</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-gutter">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-40 space-y-12">
              {/* Category Section */}
              <section>
                <h3 className="font-label-caps text-label-caps text-primary mb-6">Categories</h3>
                <ul className="space-y-4">
                  {categories.map(category => (
                    <li key={category}>
                      <button 
                        onClick={() => setSelectedCategory(category)}
                        className={`font-body-md flex items-center justify-between w-full group ${
                          selectedCategory === category 
                            ? 'text-primary font-semibold' 
                            : 'text-on-surface-variant hover:text-primary transition-colors'
                        }`}
                      >
                        <span>{category}</span>
                        {selectedCategory === category ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        ) : (
                          <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Color Section */}
              <section>
                <h3 className="font-label-caps text-label-caps text-primary mb-6">Color Palette</h3>
                <div className="grid grid-cols-5 gap-3">
                  <button className="w-6 h-6 rounded-full bg-[#FFFFFF] border border-outline/20 hover:scale-110 transition-transform" title="White"></button>
                  <button className="w-6 h-6 rounded-full bg-[#FFD7D7] hover:scale-110 transition-transform" title="Blush"></button>
                  <button className="w-6 h-6 rounded-full bg-[#E30B5C] hover:scale-110 transition-transform" title="Crimson"></button>
                  <button className="w-6 h-6 rounded-full bg-[#FFB347] hover:scale-110 transition-transform" title="Peach"></button>
                  <button className="w-6 h-6 rounded-full bg-[#5D3FD3] hover:scale-110 transition-transform" title="Violet"></button>
                </div>
              </section>

              {/* Promotional Card */}
              <div className="bg-surface-container p-6 relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="font-label-caps text-[10px] text-on-surface-variant mb-2">Exclusive</p>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-4 leading-tight">Same Day Artistry</h4>
                  <a className="text-[11px] font-semibold border-b border-primary pb-0.5 hover:opacity-70 transition-opacity" href="#">Learn More</a>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                  <span className="material-symbols-outlined text-8xl">local_florist</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-grow">
            {/* Sorting Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/20">
              <p className="font-body-md text-on-surface-variant"><span className="font-semibold text-primary">{sortedProducts.length}</span> arrangements found</p>
              <div className="flex items-center space-x-4">
                <span className="font-label-caps text-[10px] text-on-surface-variant">Sort By:</span>
                <select 
                  className="bg-transparent border-none font-label-caps text-label-caps text-primary focus:ring-0 cursor-pointer py-0"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Best Selling</option>
                </select>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-gutter gap-y-16">
              {sortedProducts.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} className="product-card group cursor-pointer block">
                  <div className="relative aspect-[4/5] bg-surface-container overflow-hidden mb-6">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt={product.name}
                      src={product.image}
                    />
                    <div className="product-actions absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2 opacity-0 translate-y-4 transition-all duration-300">
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          handleAddToCart(product)
                        }}
                        className="w-full bg-primary text-on-primary py-3 font-label-caps text-label-caps hover:bg-transparent hover:text-primary border border-primary transition-all duration-300"
                      >
                        Add to Bag
                      </button>
                      <button 
                        onClick={(e) => e.preventDefault()}
                        className="w-full bg-white/90 backdrop-blur text-primary py-3 font-label-caps text-label-caps hover:bg-primary hover:text-on-primary transition-all duration-300"
                      >
                        Quick View
                      </button>
                    </div>
                    {product.limited && (
                      <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 font-label-caps text-[10px]">Limited Edition</div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-1">{product.name}</h3>
                    <p className="font-label-caps text-label-caps text-on-surface-variant">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <nav className="mt-24 flex items-center justify-center space-x-2">
              <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center font-label-caps text-label-caps border border-primary text-primary">1</button>
              <button className="w-10 h-10 flex items-center justify-center font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors">3</button>
              <span className="px-2 text-on-surface-variant">...</span>
              <button className="w-10 h-10 flex items-center justify-center font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors">8</button>
              <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </nav>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container border-t border-outline-variant/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-section-gap max-w-container-max mx-auto">
          <div className="space-y-6">
            <a className="font-headline-sm text-headline-sm text-primary mb-8 block" href="#">FLORETTE</a>
            <p className="font-body-md text-on-surface-variant leading-relaxed max-w-xs">
              Curating nature's finest expressions into botanical art for the modern home.
            </p>
            <div className="flex space-x-4">
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
            </div>
          </div>
          <div>
            <h4 className="font-label-caps text-label-caps text-primary mb-8">Shop</h4>
            <ul className="space-y-4">
              <li><Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors" to="/shop">Shop All</Link></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Best Sellers</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Subscription</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-caps text-label-caps text-primary mb-8">Company</h4>
            <ul className="space-y-4">
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Our Story</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Shipping & Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-caps text-label-caps text-primary mb-8">The Journal</h4>
            <p className="font-body-md text-on-surface-variant mb-6">Join our floral society for seasonal drops and botanical insights.</p>
            <form className="relative group">
              <input className="w-full bg-transparent border-none border-b border-primary py-2 pr-10 focus:ring-0 font-body-md" placeholder="Email Address" type="email"/>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary font-semibold text-xs tracking-widest uppercase" type="submit">Join</button>
            </form>
          </div>
        </div>
        <div className="px-margin-desktop py-8 border-t border-outline-variant/10 max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body-md text-[13px] text-on-surface-variant opacity-60"> 2024 Florette Botanicals. Artistry in Bloom.</p>
          <div className="flex space-x-8">
            <a className="font-body-md text-[13px] text-on-surface-variant opacity-60 hover:opacity-100 transition-opacity" href="#">Privacy Policy</a>
            <a className="font-body-md text-[13px] text-on-surface-variant opacity-60 hover:opacity-100 transition-opacity" href="#">Terms of Service</a>
            <Link className="font-body-md text-[13px] text-on-surface-variant opacity-60 hover:opacity-100 transition-opacity" to="/admin">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Shop
