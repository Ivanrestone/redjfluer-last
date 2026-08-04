import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart()
  const [giftMessage, setGiftMessage] = useState('')
  const [promoCode, setPromoCode] = useState('')

  const handleUpdateQuantity = (id: number, change: number) => {
    const item = cartItems.find(i => i.id === id)
    if (item) {
      updateQuantity(id, Math.max(1, item.quantity + change))
    }
  }

  const subtotal = getCartTotal()
  const cartCount = getCartCount()

  return (
    <div className="bg-surface text-on-surface font-body-md">
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto">
          <Link className="font-headline-md text-headline-md tracking-tighter text-primary" to="/">REDJFLUER</Link>
          <nav className="hidden md:flex items-center space-x-12">
            <Link className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary" to="/">Home</Link>
            <Link className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary" to="/shop">Shop</Link>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary" href="#">About</a>
          </nav>
          <div className="flex items-center space-x-6">
            <button><span className="material-symbols-outlined">search</span></button>
            <Link to="/account"><span className="material-symbols-outlined">person</span></Link>
            <button className="hidden sm:block"><span className="material-symbols-outlined">favorite</span></button>
            <Link to="/cart" className="relative">
              <span className="material-symbols-outlined">shopping_bag</span>
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <h1 className="font-display-lg text-display-lg mb-12 text-center md:text-left">Your Selection</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-body-md text-on-surface-variant mb-8">Your cart is empty</p>
            <Link to="/shop" className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary hover:text-secondary transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-12">
              <div className="border-b border-outline-variant/30 pb-4 hidden md:grid grid-cols-6 gap-4">
                <div className="col-span-3 font-label-caps text-label-caps text-on-surface-variant">PRODUCT</div>
                <div className="col-span-1 font-label-caps text-label-caps text-on-surface-variant text-center">QUANTITY</div>
                <div className="col-span-2 font-label-caps text-label-caps text-on-surface-variant text-right">TOTAL</div>
              </div>

              {cartItems.map(item => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center">
                  <div className="col-span-3 flex gap-6">
                    <div className="w-24 md:w-32 aspect-[1/1.25] bg-surface-container overflow-hidden">
                      <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-headline-sm text-headline-sm mb-1">{item.name}</h3>
                      <p className="font-body-md text-on-surface-variant mb-4">{item.size}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-on-surface-variant font-label-caps text-[10px] underline underline-offset-4 hover:text-primary text-left"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    <div className="flex items-center border border-outline-variant/50 px-3 py-2">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="hover:text-secondary"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="mx-4 font-body-md">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="hover:text-secondary"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 text-right hidden md:block">
                    <span className="font-label-caps text-body-lg">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}

              {/* Gift Message */}
              <div className="pt-12 border-t border-outline-variant/30">
                <label className="font-label-caps text-label-caps block mb-4">GIFT MESSAGE (OPTIONAL)</label>
                <textarea 
                  className="w-full bg-transparent border-b border-primary font-body-md py-4 focus:ring-0 focus:border-secondary resize-none transition-all duration-300"
                  placeholder="Enter your note here..."
                  rows={4}
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                />
              </div>

              <Link to="/shop" className="inline-flex items-center gap-2 font-label-caps text-label-caps hover:text-secondary transition-colors duration-300 group">
                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                CONTINUE SHOPPING
              </Link>
            </div>

            {/* Order Summary Sidebar */}
            <aside className="lg:col-span-4 bg-surface-container-low p-8 md:p-12 sticky top-32">
              <h2 className="font-headline-sm text-headline-sm mb-8">Summary</h2>
              <div className="space-y-6 mb-8 pb-8 border-b border-outline-variant/30">
                <div className="flex justify-between font-body-md">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body-md">
                  <span className="text-on-surface-variant">Shipping</span>
                  <span className="text-on-surface-variant italic">Calculated at next step</span>
                </div>
                <div className="pt-4">
                  <label className="font-label-caps text-[10px] block mb-2">PROMO CODE</label>
                  <div className="flex gap-2">
                    <input 
                      className="flex-grow bg-transparent border-b border-outline-variant py-2 font-body-md focus:border-primary transition-colors"
                      placeholder="FLORETTE10"
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button className="font-label-caps text-[10px] text-primary hover:text-secondary transition-colors">APPLY</button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end mb-10">
                <span className="font-label-caps text-label-caps">ESTIMATED TOTAL</span>
                <span className="font-headline-md text-headline-md">${subtotal.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="w-full bg-primary text-on-primary font-label-caps py-6 hover:bg-transparent hover:text-primary border border-primary transition-all duration-300 ease-in-out block text-center">
                CHECKOUT
              </Link>
              <p className="mt-6 text-center font-body-md text-[12px] text-on-surface-variant opacity-60">
                Complimentary premium packaging included with every order.
              </p>
            </aside>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container border-t border-outline-variant/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-section-gap max-w-container-max mx-auto">
          <div className="space-y-6">
            <span className="font-headline-sm text-headline-sm text-primary">FLORETTE</span>
            <p className="font-body-md text-on-surface-variant">Elevating spaces through sculptural botanical artistry.</p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-label-caps text-label-caps mb-2">QUICK LINKS</span>
            <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors" to="/shop">Shop All</Link>
            <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Our Story</a>
            <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Shipping & Returns</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-label-caps text-label-caps mb-2">LEGAL</span>
            <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Cookie Policy</a>
          </div>
          <div className="space-y-6">
            <span className="font-label-caps text-label-caps mb-2">NEWSLETTER</span>
            <p className="font-body-md text-on-surface-variant">Join the circle for exclusive floral previews.</p>
            <div className="flex border-b border-primary pb-2">
              <input className="bg-transparent border-none p-0 focus:ring-0 w-full font-body-md" placeholder="email@example.com" type="email" />
              <button className="material-symbols-outlined text-primary">east</button>
            </div>
          </div>
        </div>
        <div className="px-margin-desktop py-8 border-t border-outline-variant/10 max-w-container-max mx-auto flex justify-between items-center">
          <p className="font-body-md text-on-surface-variant text-[12px]">© 2024 Florette Botanicals. Artistry in Bloom.</p>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">public</span>
            <span className="material-symbols-outlined text-on-surface-variant text-xl">language</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Cart
