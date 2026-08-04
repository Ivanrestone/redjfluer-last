import { Link, useParams } from 'react-router-dom'

function Product() {
  const { id } = useParams()

  const products = [
    // Bouquets
    { id: 1, name: 'Midnight Velvet', price: '$145.00', category: 'Bouquets', image: '/Bouquets/5f470670cf477c2f0e6aa9e5eb09beb3.jpg', description: 'A luxury floral arrangement with dark calla lilies and deep purple hydrangeas in a matte black vase. High-contrast and dramatic lighting.' },
    { id: 2, name: 'Rose Elegance', price: '$125.00', category: 'Bouquets', image: '/Bouquets/62b19dfc90fc8efe38fefefeaf06aed8.jpg', description: 'Classic red roses arranged with delicate greenery in an elegant glass vase.' },
    { id: 3, name: 'Pastel Dreams', price: '$135.00', category: 'Bouquets', image: '/Bouquets/674d716d284ebc4a2e34edd597456f16.jpg', description: 'Soft pastel peonies and roses in a cream-colored ceramic vase.' },
    { id: 4, name: 'Lavender Bliss', price: '$115.00', category: 'Bouquets', image: '/Bouquets/91a81b1aba67cf0ba032f31b46976846.jpg', description: 'Lavender and purple blooms with eucalyptus accents.' },
    { id: 5, name: 'Sunset Glow', price: '$155.00', category: 'Bouquets', image: '/Bouquets/ad5903ee1299c87b4ea63220bbec4af0.jpg', description: 'Warm sunset hues with orange and pink roses.' },
    { id: 6, name: 'Summer Solstice', price: '$165.00', category: 'Bouquets', image: '/Bouquets/c2eb77c637230072d854f88191331dad.jpg', description: 'Bright summer flowers in a vibrant arrangement.' },
    { id: 7, name: 'Garden Party', price: '$140.00', category: 'Bouquets', image: '/Bouquets/deb272fbafa3125b0b39c2d754c73666.jpg', description: 'Mixed garden flowers in a rustic basket.' },
    // Flower Boxes
    { id: 8, name: 'Velvet Rose Box', price: '$180.00', category: 'Flower Boxes', image: '/BoxWithFlowers/27612b8d2ee543549d3be8fb7258c0f6.jpg', description: 'Luxury velvet box with premium roses.' },
    { id: 9, name: 'Pink Paradise', price: '$195.00', category: 'Flower Boxes', image: '/BoxWithFlowers/2d69e76d6fe4b4c1d939928f03199826.jpg', description: 'Pink floral arrangement in an elegant box.' },
    { id: 10, name: 'Elegant White', price: '$175.00', category: 'Flower Boxes', image: '/BoxWithFlowers/338fa0aac56fd8f177b7c0c6d98da193.jpg', description: ' White flowers in a sophisticated box.' },
    { id: 11, name: 'Romantic Red', price: '$200.00', category: 'Flower Boxes', image: '/BoxWithFlowers/3c77806568ab868dd4cad5f6738f5d59.jpg', description: 'Red roses in a romantic gift box.' },
    { id: 12, name: 'Pastel Harmony', price: '$185.00', category: 'Flower Boxes', image: '/BoxWithFlowers/40c03a219ed4b620006840ba3ba8523b.jpg', description: 'Pastel flowers in a harmonious arrangement.' },
    { id: 13, name: 'Luxury Gold', price: '$220.00', category: 'Flower Boxes', image: '/BoxWithFlowers/4e3cd3b5d1d4f43628809c441c394391.jpg', description: 'Gold-accented floral box with premium blooms.' },
    { id: 14, name: 'Blush Beauty', price: '$190.00', category: 'Flower Boxes', image: '/BoxWithFlowers/5320543dac1a21f11fc19510a7aa9bf8.jpg', description: 'Blush pink flowers in a beautiful box.' },
    { id: 15, name: 'Classic Charm', price: '$170.00', category: 'Flower Boxes', image: '/BoxWithFlowers/77cb73c253d273c4f21227411c8c27c9.jpg', description: 'Classic floral arrangement in a charming box.' },
    { id: 16, name: 'Sweet Peony', price: '$165.00', category: 'Flower Boxes', image: '/BoxWithFlowers/8401582e05f17cb515a854073a426bf3.jpg', description: 'Peonies in a sweet gift box.' },
    { id: 17, name: 'Daisy Delight', price: '$150.00', category: 'Flower Boxes', image: '/BoxWithFlowers/8c66c11f12bfde1711e72990f75f9c6f.jpg', description: 'Daisies in a delightful arrangement.' },
    { id: 18, name: 'Garden Fresh', price: '$160.00', category: 'Flower Boxes', image: '/BoxWithFlowers/953992a4c1ac56646864bbb7780b777d.jpg', description: 'Fresh garden flowers in a box.' },
    { id: 19, name: 'Spring Bloom', price: '$155.00', category: 'Flower Boxes', image: '/BoxWithFlowers/aabb9061d414e23967c59a1f8eac512c.jpg', description: 'Spring flowers in a blooming box.' },
    { id: 20, name: 'Floral Fantasy', price: '$210.00', category: 'Flower Boxes', image: '/BoxWithFlowers/b3dec93b3871b6c2be6aff62a309bf3a.jpg', description: 'Fantasy floral arrangement in a luxury box.' },
    { id: 21, name: 'Rose Garden', price: '$195.00', category: 'Flower Boxes', image: '/BoxWithFlowers/b952e52e0b311cc78c31f346b1f8249b.jpg', description: 'Rose garden in a gift box.' },
    { id: 22, name: 'Eternal Love', price: '$205.00', category: 'Flower Boxes', image: '/BoxWithFlowers/f1724a19b98c14376aa8e80d894f6b30.jpg', description: 'Eternal love represented in flowers.' },
    { id: 23, name: 'Golden Hour', price: '$215.00', category: 'Flower Boxes', image: '/BoxWithFlowers/f5202108e15f742c9ac42619f3444ab8.jpg', description: 'Golden hour inspired floral box.' },
    // Plants in Vases
    { id: 24, name: 'Monstera Elegance', price: '$95.00', category: 'Plants in Vases', image: '/VaseWithPlant/64ccdf1005165dcb06355e147127fa9b.jpg', description: 'Monstera plant in an elegant vase.' },
    { id: 25, name: 'Fiddle Leaf', price: '$110.00', category: 'Plants in Vases', image: '/VaseWithPlant/671746f94e2a24fa3ec0115c0c4bd841.jpg', description: 'Fiddle leaf fig in a decorative vase.' },
    { id: 26, name: 'Snake Plant', price: '$75.00', category: 'Plants in Vases', image: '/VaseWithPlant/7663e4943b0e5d2b02627c489d64f9af.jpg', description: 'Snake plant in a modern vase.' },
    { id: 27, name: 'Peace Lily', price: '$85.00', category: 'Plants in Vases', image: '/VaseWithPlant/7e9a6c39805e17c5eea3115985b1efab.jpg', description: 'Peace lily in a classic vase.' },
    { id: 28, name: 'Pothos Beauty', price: '$65.00', category: 'Plants in Vases', image: '/VaseWithPlant/98074d12d9846ec16c5a1cffe00e11b2.jpg', description: 'Pothos plant in a beautiful vase.' },
    { id: 29, name: 'Rubber Plant', price: '$90.00', category: 'Plants in Vases', image: '/VaseWithPlant/a90d35f7efaa57c687da6fa43fc2405e.jpg', description: 'Rubber plant in a stylish vase.' },
    { id: 30, name: 'Dracaena Grace', price: '$105.00', category: 'Plants in Vases', image: '/VaseWithPlant/aa532d7cf58cd126c5f2e0f0a8fb0dc3.jpg', description: 'Dracaena in a graceful vase.' },
    { id: 31, name: 'Bamboo Zen', price: '$80.00', category: 'Plants in Vases', image: '/VaseWithPlant/c1e4b766cddc6b0cb5d6cde7cb3db99d.jpg', description: 'Bamboo in a zen-inspired vase.' },
    { id: 32, name: 'Succulent Garden', price: '$55.00', category: 'Plants in Vases', image: '/VaseWithPlant/d5eb9fe46892d2ecc37681cb1fc8efbc.jpg', description: 'Succulent garden in a decorative vase.' },
    { id: 33, name: 'Orchid Elegance', price: '$120.00', category: 'Plants in Vases', image: '/VaseWithPlant/d701d602bd218fe5c2a93d42e607eecb.jpg', description: 'Orchid in an elegant vase.' },
    { id: 34, name: 'Philodendron', price: '$70.00', category: 'Plants in Vases', image: '/VaseWithPlant/f582929d4e5d6318b944bfe029764873.jpg', description: 'Philodendron in a modern vase.' },
  ]

  const product = products.find(p => p.id === parseInt(id || '0'))

  if (!product) {
    return (
      <div className="bg-surface text-on-surface font-body-md pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
        <p>Product not found</p>
      </div>
    )
  }

  return (
    <div className="bg-surface text-on-surface font-body-md pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto">
          <Link className="font-headline-md text-headline-md tracking-tighter text-primary" to="/">REDJFLUER</Link>
          <nav className="hidden md:flex items-center space-x-12">
            <Link className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary" to="/shop">Shop</Link>
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
        <Link className="hover:text-primary" to="/shop">Shop</Link>
        <span className="text-[10px] opacity-40">/</span>
        <span className="text-primary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="aspect-[4/5] bg-surface-container overflow-hidden">
          <img className="w-full h-full object-cover" alt={product.name} src={product.image} />
        </div>
        <div className="space-y-8">
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">{product.category}</p>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4 italic">{product.name}</h1>
            <p className="font-label-caps text-label-caps text-2xl">{product.price}</p>
          </div>
          <p className="font-body-md text-on-surface-variant leading-relaxed">{product.description}</p>
          <div className="space-y-4">
            <button className="w-full bg-primary text-on-primary py-4 font-label-caps text-label-caps hover:bg-secondary transition-colors duration-300">
              ADD TO CART
            </button>
            <button className="w-full border border-primary text-primary py-4 font-label-caps text-label-caps hover:bg-primary hover:text-on-primary transition-colors duration-300">
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
