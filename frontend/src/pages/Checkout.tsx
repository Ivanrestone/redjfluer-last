import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Header from '../components/Header'

function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const [selectedDate, setSelectedDate] = useState(24)
  const [formData, setFormData] = useState({
    email: '',
    recipientFirstName: '',
    recipientLastName: '',
    deliveryAddress: '',
    city: '',
    state: '',
    zipCode: '',
    message: ''
  })

  const subtotal = getCartTotal()
  const deliveryFee = 15.00
  const taxes = subtotal * 0.08
  const total = subtotal + deliveryFee + taxes

  const handlePlaceOrder = () => {
    // Send order details as email/message
    const orderDetails = {
      ...formData,
      deliveryDate: selectedDate,
      items: cartItems,
      total: total.toFixed(2)
    }
    
    // For now, log to console - you can integrate email service later
    console.log('Order Details:', orderDetails)
    
    // Create mailto link for user to send order
    const subject = encodeURIComponent('New Order - FLORETTE Botanicals')
    const body = encodeURIComponent(
      `Order Details:\n\n` +
      `Email: ${formData.email}\n` +
      `Recipient Name: ${formData.recipientFirstName} ${formData.recipientLastName}\n` +
      `Delivery Address: ${formData.deliveryAddress}\n` +
      `City: ${formData.city}\n` +
      `State: ${formData.state}\n` +
      `Zip Code: ${formData.zipCode}\n` +
      `Delivery Date: Oct ${selectedDate}\n` +
      `Message: ${formData.message}\n\n` +
      `Items:\n${cartItems.map(item => `- ${item.name} (${item.size}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\n` +
      `Total: $${total.toFixed(2)}`
    )
    
    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`
    
    clearCart()
  }

  return (
    <div className="bg-surface text-on-surface font-body-md">
      <Header />
      <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: Checkout Details */}
          <div className="lg:col-span-8 space-y-12">
            {/* Section 1: Customer Information */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-label-caps text-label-caps uppercase">1. Customer Information</h2>
                <button className="text-[11px] underline font-label-caps hover:text-secondary-fixed-dim transition-colors">Log In for Faster Checkout</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <label className="font-label-caps text-[10px] uppercase text-on-surface-variant">Email Address</label>
                  <input 
                    className="w-full border-b border-primary bg-transparent py-3 focus:ring-0 font-body-md outline-none" 
                    placeholder="email@example.com" 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input className="w-4 h-4 rounded-none border-primary focus:ring-0" id="newsletter" type="checkbox"/>
                  <label className="text-body-md text-on-surface-variant" htmlFor="newsletter">Keep me updated on seasonal blooms</label>
                </div>
              </div>
            </section>

            {/* Section 2: Delivery Details */}
            <section>
              <h2 className="font-label-caps text-label-caps uppercase mb-8">2. Delivery Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <div className="relative">
                  <label className="font-label-caps text-[10px] uppercase text-on-surface-variant">Recipient First Name</label>
                  <input 
                    className="w-full border-b border-primary bg-transparent py-3 focus:ring-0 font-body-md outline-none" 
                    type="text"
                    value={formData.recipientFirstName}
                    onChange={(e) => setFormData({...formData, recipientFirstName: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <label className="font-label-caps text-[10px] uppercase text-on-surface-variant">Recipient Last Name</label>
                  <input 
                    className="w-full border-b border-primary bg-transparent py-3 focus:ring-0 font-body-md outline-none" 
                    type="text"
                    value={formData.recipientLastName}
                    onChange={(e) => setFormData({...formData, recipientLastName: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 relative">
                  <label className="font-label-caps text-[10px] uppercase text-on-surface-variant">Delivery Address</label>
                  <input 
                    className="w-full border-b border-primary bg-transparent py-3 focus:ring-0 font-body-md outline-none" 
                    placeholder="Street, Apt, Floor" 
                    type="text"
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <label className="font-label-caps text-[10px] uppercase text-on-surface-variant">City</label>
                  <input 
                    className="w-full border-b border-primary bg-transparent py-3 focus:ring-0 font-body-md outline-none" 
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="font-label-caps text-[10px] uppercase text-on-surface-variant">State</label>
                    <input 
                      className="w-full border-b border-primary bg-transparent py-3 focus:ring-0 font-body-md outline-none" 
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <label className="font-label-caps text-[10px] uppercase text-on-surface-variant">Zip Code</label>
                    <input 
                      className="w-full border-b border-primary bg-transparent py-3 focus:ring-0 font-body-md outline-none" 
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Delivery Date Selection */}
            <section>
              <h2 className="font-label-caps text-label-caps uppercase mb-8">3. Select Delivery Date</h2>
              <div className="bg-surface-container-low p-8 border border-outline-variant/20">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <span className="font-body-md">Earliest delivery: Tomorrow, Oct 24th</span>
                </div>
                {/* Mock Calendar Interface */}
                <div className="grid grid-cols-7 gap-2 text-center border-t border-outline-variant/30 pt-6">
                  <div className="text-[10px] font-label-caps opacity-50">S</div>
                  <div className="text-[10px] font-label-caps opacity-50">M</div>
                  <div className="text-[10px] font-label-caps opacity-50">T</div>
                  <div className="text-[10px] font-label-caps opacity-50">W</div>
                  <div className="text-[10px] font-label-caps opacity-50">T</div>
                  <div className="text-[10px] font-label-caps opacity-50">F</div>
                  <div className="text-[10px] font-label-caps opacity-50">S</div>
                  {/* Past days */}
                  <div className="py-3 text-outline text-body-md opacity-20">20</div>
                  <div className="py-3 text-outline text-body-md opacity-20">21</div>
                  <div className="py-3 text-outline text-body-md opacity-20">22</div>
                  {/* Selectable days */}
                  {[23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2].map(day => (
                    <div 
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`py-3 text-body-md cursor-pointer transition-colors ${
                        selectedDate === day 
                          ? 'bg-primary text-on-primary font-bold' 
                          : 'hover:bg-primary-fixed'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-[12px] italic text-on-surface-variant">Note: Same-day delivery cut-off is 11:00 AM EST.</p>
            </section>

            {/* Section 4: Additional Message */}
            <section>
              <h2 className="font-label-caps text-label-caps uppercase mb-8">4. Additional Message (Optional)</h2>
              <div className="bg-surface-container-low p-8 border border-outline-variant/20">
                <textarea 
                  className="w-full border-b border-primary bg-transparent py-3 focus:ring-0 font-body-md outline-none resize-none" 
                  rows={4}
                  placeholder="Any special requests or notes..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="bg-surface-container-low p-6 border border-outline-variant/20">
              <h2 className="font-headline-sm text-headline-sm mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 border-b border-outline-variant/30 pb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-20 bg-surface-variant overflow-hidden">
                      <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-body-md font-semibold text-primary text-sm">{item.name}</h3>
                        <p className="text-[11px] text-on-surface-variant">{item.size}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px]">Qty: {item.quantity}</span>
                        <span className="font-label-caps text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Calculations */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-body-md text-sm">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="font-label-caps">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-body-md text-sm">
                  <span className="text-on-surface-variant">Delivery Fee</span>
                  <span className="font-label-caps">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-body-md text-sm">
                  <span className="text-on-surface-variant">Taxes (Estimated)</span>
                  <span className="font-label-caps">${taxes.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-primary pt-4 mb-6">
                <span className="font-headline-sm">Total</span>
                <span className="font-headline-sm">${total.toFixed(2)}</span>
              </div>
              {/* CTA */}
              <button 
                onClick={handlePlaceOrder}
                className="w-full bg-primary text-on-primary py-4 font-label-caps uppercase tracking-[0.2em] hover:bg-transparent hover:text-primary border border-primary transition-all duration-300 group flex items-center justify-center gap-3 text-sm"
              >
                Send Order
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-2 text-lg">send</span>
              </button>
              <p className="mt-4 text-[11px] text-center text-on-surface-variant opacity-70">
                Order will be sent via email for processing
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline-variant/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-section-gap max-w-container-max mx-auto">
          <div className="md:col-span-1">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-6">FLORETTE</h2>
            <p className="font-body-md text-on-surface-variant pr-8">Artistry in bloom. We deliver botanical masterpieces designed for the modern romantic.</p>
          </div>
          <div>
            <h3 className="font-label-caps text-label-caps mb-6">Collections</h3>
            <ul className="space-y-3 font-body-md text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#">The Signature Series</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Minimalist Whites</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Midnight Blooms</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Limited Edition</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-label-caps text-label-caps mb-6">Company</h3>
            <ul className="space-y-3 font-body-md text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#">Our Story</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Artisan Care</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Sustainability</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Journal</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-label-caps text-label-caps mb-6">Customer Support</h3>
            <ul className="space-y-3 font-body-md text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#">Shipping & Returns</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="px-margin-desktop py-8 border-t border-outline-variant/10 text-center">
          <p className="font-body-md text-[13px] text-on-surface-variant">© 2024 Florette Botanicals. Artistry in Bloom.</p>
          <Link className="font-body-md text-[13px] text-on-surface-variant opacity-60 hover:opacity-100 transition-opacity ml-4" to="/admin">Admin</Link>
        </div>
      </footer>
    </div>
  )
}

export default Checkout
