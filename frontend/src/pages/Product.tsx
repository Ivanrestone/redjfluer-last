import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import Header from '../components/Header'

function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('Classic')
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null)
  const [deliveryDate, setDeliveryDate] = useState('')
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStyle, setAnimationStyle] = useState({})
  const addButtonRef = useRef<HTMLButtonElement>(null)

  // Scroll to top on mount or when product changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const products = [
    // Bouquets
    { id: 1, name: 'Midnight Velvet', price: 145.00, category: 'Bouquets', images: ['/Bouquets/5f470670cf477c2f0e6aa9e5eb09beb3.jpg'], description: 'A whisper of midnight in a garden of velvet. Crafted for the soul that finds beauty in the silent poetry of a single bloom.' },
    { id: 2, name: 'Rose Elegance', price: 125.00, category: 'Bouquets', images: ['/Bouquets/62b19dfc90fc8efe38fefefeaf06aed8.jpg', '/Bouquets/674d716d284ebc4a2e34edd597456f16.jpg', '/Bouquets/91a81b1aba67cf0ba032f31b46976846.jpg'], description: 'Classic elegance redefined. Timeless roses arranged with delicate greenery in an elegant glass vessel.' },
    { id: 3, name: 'Pastel Dreams', price: 135.00, category: 'Bouquets', images: ['/Bouquets/674d716d284ebc4a2e34edd597456f16.jpg', '/Bouquets/91a81b1aba67cf0ba032f31b46976846.jpg', '/Bouquets/ad5903ee1299c87b4ea63220bbec4af0.jpg'], description: 'Soft pastel peonies and roses in a cream-colored ceramic vase. A dreamy composition for the romantic soul.' },
    { id: 4, name: 'Lavender Bliss', price: 115.00, category: 'Bouquets', images: ['/Bouquets/91a81b1aba67cf0ba032f31b46976846.jpg', '/Bouquets/ad5903ee1299c87b4ea63220bbec4af0.jpg', '/Bouquets/c2eb77c637230072d854f88191331dad.jpg'], description: 'Lavender and purple blooms with eucalyptus accents. A calming arrangement for peaceful moments.' },
    { id: 5, name: 'Sunset Glow', price: 155.00, category: 'Bouquets', images: ['/Bouquets/ad5903ee1299c87b4ea63220bbec4af0.jpg', '/Bouquets/c2eb77c637230072d854f88191331dad.jpg', '/Bouquets/deb272fbafa3125b0b39c2d754c73666.jpg'], description: 'Warm sunset hues with orange and pink roses. Capturing the golden hour in floral form.' },
    { id: 6, name: 'Summer Solstice', price: 165.00, category: 'Bouquets', images: ['/Bouquets/c2eb77c637230072d854f88191331dad.jpg', '/Bouquets/deb272fbafa3125b0b39c2d754c73666.jpg', '/Bouquets/5f470670cf477c2f0e6aa9e5eb09beb3.jpg'], description: 'Bright summer flowers in a vibrant arrangement. Celebrating the longest days of the year.' },
    { id: 7, name: 'Garden Party', price: 140.00, category: 'Bouquets', images: ['/Bouquets/deb272fbafa3125b0b39c2d754c73666.jpg', '/Bouquets/5f470670cf477c2f0e6aa9e5eb09beb3.jpg', '/Bouquets/62b19dfc90fc8efe38fefefeaf06aed8.jpg'], description: 'Mixed garden flowers in a rustic basket. Perfect for outdoor gatherings and celebrations.' },
    // Flower Boxes
    { id: 8, name: 'Velvet Rose Box', price: 180.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/27612b8d2ee543549d3be8fb7258c0f6.jpg', '/BoxWithFlowers/2d69e76d6fe4b4c1d939928f03199826.jpg', '/BoxWithFlowers/338fa0aac56fd8f177b7c0c6d98da193.jpg'], description: 'Luxury velvet box with premium roses. The ultimate expression of romantic elegance.' },
    { id: 9, name: 'Pink Paradise', price: 195.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/2d69e76d6fe4b4c1d939928f03199826.jpg', '/BoxWithFlowers/338fa0aac56fd8f177b7c0c6d98da193.jpg', '/BoxWithFlowers/3c77806568ab868dd4cad5f6738f5d59.jpg'], description: 'Pink floral arrangement in an elegant box. A paradise of soft pinks and delicate blooms.' },
    { id: 10, name: 'Elegant White', price: 175.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/338fa0aac56fd8f177b7c0c6d98da193.jpg', '/BoxWithFlowers/3c77806568ab868dd4cad5f6738f5d59.jpg', '/BoxWithFlowers/40c03a219ed4b620006840ba3ba8523b.jpg'], description: 'White flowers in a sophisticated box. Pure elegance in monochromatic beauty.' },
    { id: 11, name: 'Romantic Red', price: 200.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/3c77806568ab868dd4cad5f6738f5d59.jpg', '/BoxWithFlowers/40c03a219ed4b620006840ba3ba8523b.jpg', '/BoxWithFlowers/4e3cd3b5d1d4f43628809c441c394391.jpg'], description: 'Red roses in a romantic gift box. The perfect declaration of love and passion.' },
    { id: 12, name: 'Pastel Harmony', price: 185.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/40c03a219ed4b620006840ba3ba8523b.jpg', '/BoxWithFlowers/4e3cd3b5d1d4f43628809c441c394391.jpg', '/BoxWithFlowers/5320543dac1a21f11fc19510a7aa9bf8.jpg'], description: 'Pastel flowers in a harmonious arrangement. Soft colors working in perfect unity.' },
    { id: 13, name: 'Luxury Gold', price: 220.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/4e3cd3b5d1d4f43628809c441c394391.jpg', '/BoxWithFlowers/5320543dac1a21f11fc19510a7aa9bf8.jpg', '/BoxWithFlowers/77cb73c253d273c4f21227411c8c27c9.jpg'], description: 'Gold-accented floral box with premium blooms. Opulence and sophistication combined.' },
    { id: 14, name: 'Blush Beauty', price: 190.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/5320543dac1a21f11fc19510a7aa9bf8.jpg', '/BoxWithFlowers/77cb73c253d273c4f21227411c8c27c9.jpg', '/BoxWithFlowers/8401582e05f17cb515a854073a426bf3.jpg'], description: 'Blush pink flowers in a beautiful box. Delicate beauty in every petal.' },
    { id: 15, name: 'Classic Charm', price: 170.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/77cb73c253d273c4f21227411c8c27c9.jpg', '/BoxWithFlowers/8401582e05f17cb515a854073a426bf3.jpg', '/BoxWithFlowers/8c66c11f12bfde1711e72990f75f9c6f.jpg'], description: 'Classic floral arrangement in a charming box. Timeless beauty for any occasion.' },
    { id: 16, name: 'Sweet Peony', price: 165.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/8401582e05f17cb515a854073a426bf3.jpg', '/BoxWithFlowers/8c66c11f12bfde1711e72990f75f9c6f.jpg', '/BoxWithFlowers/953992a4c1ac56646864bbb7780b777d.jpg'], description: 'Peonies in a sweet gift box. The queen of flowers in luxurious presentation.' },
    { id: 17, name: 'Daisy Delight', price: 150.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/8c66c11f12bfde1711e72990f75f9c6f.jpg', '/BoxWithFlowers/953992a4c1ac56646864bbb7780b777d.jpg', '/BoxWithFlowers/aabb9061d414e23967c59a1f8eac512c.jpg'], description: 'Daisies in a delightful arrangement. Cheerful blooms bringing joy to any space.' },
    { id: 18, name: 'Garden Fresh', price: 160.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/953992a4c1ac56646864bbb7780b777d.jpg', '/BoxWithFlowers/aabb9061d414e23967c59a1f8eac512c.jpg', '/BoxWithFlowers/b3dec93b3871b6c2be6aff62a309bf3a.jpg'], description: 'Fresh garden flowers in a box. Bringing the outdoors in with style.' },
    { id: 19, name: 'Spring Bloom', price: 155.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/aabb9061d414e23967c59a1f8eac512c.jpg', '/BoxWithFlowers/b3dec93b3871b6c2be6aff62a309bf3a.jpg', '/BoxWithFlowers/b952e52e0b311cc78c31f346b1f8249b.jpg'], description: 'Spring flowers in a blooming box. Celebrating new beginnings and fresh starts.' },
    { id: 20, name: 'Floral Fantasy', price: 210.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/b3dec93b3871b6c2be6aff62a309bf3a.jpg', '/BoxWithFlowers/b952e52e0b311cc78c31f346b1f8249b.jpg', '/BoxWithFlowers/f1724a19b98c14376aa8e80d894f6b30.jpg'], description: 'Fantasy floral arrangement in a luxury box. Imagination blooms in every detail.' },
    { id: 21, name: 'Rose Garden', price: 195.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/b952e52e0b311cc78c31f346b1f8249b.jpg', '/BoxWithFlowers/f1724a19b98c14376aa8e80d894f6b30.jpg', '/BoxWithFlowers/f5202108e15f742c9ac42619f3444ab8.jpg'], description: 'Rose garden in a gift box. A garden of roses captured in elegant presentation.' },
    { id: 22, name: 'Eternal Love', price: 205.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/f1724a19b98c14376aa8e80d894f6b30.jpg', '/BoxWithFlowers/f5202108e15f742c9ac42619f3444ab8.jpg', '/BoxWithFlowers/27612b8d2ee543549d3be8fb7258c0f6.jpg'], description: 'Eternal love represented in flowers. A timeless symbol of enduring affection.' },
    { id: 23, name: 'Golden Hour', price: 215.00, category: 'Flower Boxes', images: ['/BoxWithFlowers/f5202108e15f742c9ac42619f3444ab8.jpg', '/BoxWithFlowers/27612b8d2ee543549d3be8fb7258c0f6.jpg', '/BoxWithFlowers/2d69e76d6fe4b4c1d939928f03199826.jpg'], description: 'Golden hour inspired floral box. Capturing the magic of sunset in floral art.' },
    // Plants in Vases
    { id: 24, name: 'Monstera Elegance', price: 95.00, category: 'Plants in Vases', images: ['/VaseWithPlant/64ccdf1005165dcb06355e147127fa9b.jpg', '/VaseWithPlant/671746f94e2a24fa3ec0115c0c4bd841.jpg', '/VaseWithPlant/7663e4943b0e5d2b02627c489d64f9af.jpg'], description: 'Monstera plant in an elegant vase. Tropical sophistication for modern spaces.' },
    { id: 25, name: 'Fiddle Leaf', price: 110.00, category: 'Plants in Vases', images: ['/VaseWithPlant/671746f94e2a24fa3ec0115c0c4bd841.jpg', '/VaseWithPlant/7663e4943b0e5d2b02627c489d64f9af.jpg', '/VaseWithPlant/7e9a6c39805e17c5eea3115985b1efab.jpg'], description: 'Fiddle leaf fig in a decorative vase. Statement greenery for discerning tastes.' },
    { id: 26, name: 'Snake Plant', price: 75.00, category: 'Plants in Vases', images: ['/VaseWithPlant/7663e4943b0e5d2b02627c489d64f9af.jpg', '/VaseWithPlant/7e9a6c39805e17c5eea3115985b1efab.jpg', '/VaseWithPlant/98074d12d9846ec16c5a1cffe00e11b2.jpg'], description: 'Snake plant in a modern vase. Architectural beauty with minimal care requirements.' },
    { id: 27, name: 'Peace Lily', price: 85.00, category: 'Plants in Vases', images: ['/VaseWithPlant/7e9a6c39805e17c5eea3115985b1efab.jpg', '/VaseWithPlant/98074d12d9846ec16c5a1cffe00e11b2.jpg', '/VaseWithPlant/a90d35f7efaa57c687da6fa43fc2405e.jpg'], description: 'Peace lily in a classic vase. Serene elegance bringing tranquility to any room.' },
    { id: 28, name: 'Pothos Beauty', price: 65.00, category: 'Plants in Vases', images: ['/VaseWithPlant/98074d12d9846ec16c5a1cffe00e11b2.jpg', '/VaseWithPlant/a90d35f7efaa57c687da6fa43fc2405e.jpg', '/VaseWithPlant/aa532d7cf58cd126c5f2e0f0a8fb0dc3.jpg'], description: 'Pothos plant in a beautiful vase. Cascading greenery with effortless charm.' },
    { id: 29, name: 'Rubber Plant', price: 90.00, category: 'Plants in Vases', images: ['/VaseWithPlant/a90d35f7efaa57c687da6fa43fc2405e.jpg', '/VaseWithPlant/aa532d7cf58cd126c5f2e0f0a8fb0dc3.jpg', '/VaseWithPlant/c1e4b766cddc6b0cb5d6cde7cb3db99d.jpg'], description: 'Rubber plant in a stylish vase. Bold foliage making a sophisticated statement.' },
    { id: 30, name: 'Dracaena Grace', price: 105.00, category: 'Plants in Vases', images: ['/VaseWithPlant/aa532d7cf58cd126c5f2e0f0a8fb0dc3.jpg', '/VaseWithPlant/c1e4b766cddc6b0cb5d6cde7cb3db99d.jpg', '/VaseWithPlant/d5eb9fe46892d2ecc37681cb1fc8efbc.jpg'], description: 'Dracaena in a graceful vase. Architectural elegance with tropical flair.' },
    { id: 31, name: 'Bamboo Zen', price: 80.00, category: 'Plants in Vases', images: ['/VaseWithPlant/c1e4b766cddc6b0cb5d6cde7cb3db99d.jpg', '/VaseWithPlant/d5eb9fe46892d2ecc37681cb1fc8efbc.jpg', '/VaseWithPlant/d701d602bd218fe5c2a93d42e607eecb.jpg'], description: 'Bamboo in a zen-inspired vase. Eastern tranquility in botanical form.' },
    { id: 32, name: 'Succulent Garden', price: 55.00, category: 'Plants in Vases', images: ['/VaseWithPlant/d5eb9fe46892d2ecc37681cb1fc8efbc.jpg', '/VaseWithPlant/d701d602bd218fe5c2a93d42e607eecb.jpg', '/VaseWithPlant/f582929d4e5d6318b944bfe029764873.jpg'], description: 'Succulent garden in a decorative vase. Desert beauty in compact elegance.' },
    { id: 33, name: 'Orchid Elegance', price: 120.00, category: 'Plants in Vases', images: ['/VaseWithPlant/d701d602bd218fe5c2a93d42e607eecb.jpg', '/VaseWithPlant/f582929d4e5d6318b944bfe029764873.jpg', '/VaseWithPlant/64ccdf1005165dcb06355e147127fa9b.jpg'], description: 'Orchid in an elegant vase. Exotic beauty with timeless sophistication.' },
    { id: 34, name: 'Philodendron', price: 70.00, category: 'Plants in Vases', images: ['/VaseWithPlant/f582929d4e5d6318b944bfe029764873.jpg', '/VaseWithPlant/64ccdf1005165dcb06355e147127fa9b.jpg', '/VaseWithPlant/671746f94e2a24fa3ec0115c0c4bd841.jpg'], description: 'Philodendron in a modern vase. Lush greenery with contemporary appeal.' },
  ]

  const product = products.find(p => p.id === parseInt(id || '0'))

  const handleAddToCart = () => {
    if (!addButtonRef.current) return

    const buttonRect = addButtonRef.current.getBoundingClientRect()
    const cartIcon = document.querySelector('a[href="/cart"]') as HTMLElement
    const cartRect = cartIcon?.getBoundingClientRect()

    if (cartRect) {
      setIsAnimating(true)
      setAnimationStyle({
        position: 'fixed',
        left: `${buttonRect.left + buttonRect.width / 2}px`,
        top: `${buttonRect.top + buttonRect.height / 2}px`,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-primary)',
        zIndex: 9999,
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translate(-50%, -50%) scale(1)',
      })

      // Add to cart
      addToCart({
        id: product!.id,
        name: product!.name,
        size: selectedSize,
        price: product!.price,
        image: product!.images[0]
      })

      // Start animation after a small delay
      setTimeout(() => {
        setAnimationStyle({
          ...animationStyle,
          left: `${cartRect.left + cartRect.width / 2}px`,
          top: `${cartRect.top + cartRect.height / 2}px`,
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: '0',
        })
      }, 50)

      // End animation
      setTimeout(() => {
        setIsAnimating(false)
      }, 850)
    }
  }

  const handleBuyNow = () => {
    addToCart({
      id: product!.id,
      name: product!.name,
      size: selectedSize,
      price: product!.price,
      image: product!.images[0]
    })
    navigate('/checkout')
  }

  if (!product) {
    return (
      <div className="bg-surface text-on-surface font-body-md pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
        <p>Product not found</p>
      </div>
    )
  }

  const sizes = ['Classic', 'Grand', 'Luxe']
  const reviews = [
    { name: 'Julianne R.', rating: 5, text: 'The presentation was breathtaking. It felt more like receiving a piece of art than a bouquet.' },
    { name: 'Marc A.', rating: 5, text: 'Exceeded all expectations. The scent filled my entire apartment for days. Pure luxury.' },
    { name: 'Sophia W.', rating: 5, text: 'The delivery was on time and the box was in pristine condition. Worth every penny.' },
  ]

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="bg-surface text-on-surface font-body-md">
      {/* Flying cart animation */}
      {isAnimating && (
        <div style={animationStyle as React.CSSProperties} />
      )}
      
      <Header />
      <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
        {/* Product Section: Bento-inspired grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
            {/* Main Image */}
            <div className="w-full aspect-[4/5] bg-surface-container overflow-hidden group cursor-zoom-in">
              <img 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                alt={product.name}
                src={product.images[selectedImage]}
              />
            </div>
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto no-scrollbar md:w-32">
              {product.images.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-24 md:w-full aspect-[4/5] bg-surface-container border cursor-pointer transition-all ${
                    selectedImage === idx 
                      ? 'border-primary opacity-100' 
                      : 'border-transparent opacity-60 hover:opacity-100 hover:border-primary'
                  }`}
                >
                  <img className="w-full h-full object-cover" alt={`${product.name} view ${idx + 1}`} src={img} />
                </div>
              ))}
            </div>
          </div>

          {/* Details Column (5 cols) */}
          <div className="lg:col-span-5 lg:pl-12 flex flex-col gap-8">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest block mb-4">SIGNATURE COLLECTION</span>
              <h1 className="font-headline-md text-display-lg-mobile md:text-headline-md text-primary mb-2">{product.name}</h1>
              <p className="font-label-caps text-headline-sm text-primary">{product.price}</p>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant italic">
              "{product.description}"
            </p>

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="font-label-caps text-label-caps text-primary">SELECT ARRANGEMENT SIZE</h3>
              <div className="grid grid-cols-3 gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border py-4 font-label-caps text-label-caps transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-on-primary'
                        : 'border-outline hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>



            {/* Actions */}
            <div className="flex flex-col gap-4 pt-4">
              <button 
                ref={addButtonRef}
                onClick={handleAddToCart}
                className="bg-primary text-on-primary py-5 font-label-caps text-label-caps hover:bg-transparent hover:text-primary border border-primary transition-all"
              >
                ADD TO CART
              </button>
              <button 
                onClick={handleBuyNow}
                className="bg-secondary-container text-on-secondary-container py-5 font-label-caps text-label-caps hover:opacity-90 transition-all"
              >
                BUY NOW
              </button>
            </div>

            {/* Accordion */}
            <div className="border-t border-outline-variant/30 mt-8">
              <div className="py-6 border-b border-outline-variant/30 cursor-pointer" onClick={() => setExpandedAccordion(expandedAccordion === 0 ? null : 0)}>
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-label-caps">FLOWER CARE</span>
                  <span className={`material-symbols-outlined transition-transform ${expandedAccordion === 0 ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
                {expandedAccordion === 0 && (
                  <div className="pt-6 font-body-md text-on-surface-variant space-y-4 leading-relaxed">
                    <p>Keep your flowers in a cool, dry place away from direct sunlight. Our arrangements are treated to maintain their vibrancy for up to 14 days.</p>
                    <p>Avoid touching the petals directly to preserve the natural oils and prevent wilting.</p>
                  </div>
                )}
              </div>
              <div className="py-6 border-b border-outline-variant/30 cursor-pointer" onClick={() => setExpandedAccordion(expandedAccordion === 1 ? null : 1)}>
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-label-caps">SHIPPING & RETURNS</span>
                  <span className={`material-symbols-outlined transition-transform ${expandedAccordion === 1 ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
                {expandedAccordion === 1 && (
                  <div className="pt-6 font-body-md text-on-surface-variant space-y-4 leading-relaxed">
                    <p>Complimentary white-glove delivery within the metropolitan area. Same-day delivery available for orders placed before 12 PM.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>


        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-section-gap">
            <h2 className="font-headline-md text-headline-md text-primary mb-12 text-center">You May Also Love</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {relatedProducts.map(related => (
                <Link key={related.id} to={`/product/${related.id}`} className="group cursor-pointer">
                  <div className="aspect-[1/1.25] overflow-hidden bg-surface-container mb-6">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={related.name} src={related.images[0]} />
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-1">{related.name}</h3>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">{related.price}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline-variant/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-section-gap max-w-container-max mx-auto">
          <div className="md:col-span-1">
            <a className="font-headline-sm text-headline-sm text-primary mb-8 block" href="#">FLORETTE</a>
            <p className="font-body-md text-on-surface-variant leading-relaxed max-w-xs">
              Curating nature's finest masterpieces for the modern aesthete. Based in Paris, shipping globally.
            </p>
          </div>
          <div>
            <h4 className="font-label-caps text-label-caps text-primary mb-8">SHOP</h4>
            <ul className="space-y-4">
              <li><Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors" to="/shop">Shop All</Link></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Our Story</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Shipping & Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-caps text-label-caps text-primary mb-8">LEGAL</h4>
            <ul className="space-y-4">
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-caps text-label-caps text-primary mb-8">NEWSLETTER</h4>
            <div className="relative">
              <input className="w-full bg-transparent border-b border-primary py-3 font-body-md outline-none focus:border-secondary transition-colors" placeholder="Email Address" type="email" />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 font-label-caps text-label-caps text-primary hover:text-secondary transition-colors">JOIN</button>
            </div>
          </div>
        </div>
        <div className="px-margin-desktop py-8 border-t border-outline-variant/10 max-w-container-max mx-auto text-center">
          <p className="font-body-md text-on-surface-variant text-[12px]">© 2024 Florette Botanicals. Artistry in Bloom.</p>
        </div>
      </footer>
    </div>
  )
}

export default Product
