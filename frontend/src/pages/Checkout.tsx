import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Header from '../components/Header'

function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [formData, setFormData] = useState({
    email: '',
    recipientName: '',
    phone: '',
    deliveryAddress: '',
    city: '',
    state: '',
    zipCode: '',
    message: ''
  })

  // Calendar logic
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateDisabled = (day: number) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return checkDate < today
  }

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false
    return selectedDate.getDate() === day &&
           selectedDate.getMonth() === currentMonth.getMonth() &&
           selectedDate.getFullYear() === currentMonth.getFullYear()
  }

  const handleDateSelect = (day: number) => {
    if (isDateDisabled(day)) return
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth)
  const today = new Date()
  const earliestDelivery = new Date(today)
  earliestDelivery.setDate(today.getDate() + 1)

  const subtotal = getCartTotal()
  const deliveryFee = 15.00
  const taxes = 0
  const total = subtotal + deliveryFee + taxes

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [orderSummary, setOrderSummary] = useState({ subtotal: 0, deliveryFee: 0, taxes: 0, total: 0 })

  const handlePlaceOrder = async () => {
    // Validate required fields
    if (!formData.email || !formData.recipientName || !formData.deliveryAddress || !selectedDate) {
      alert('Please fill in all required fields and select a delivery date')
      return
    }

    setIsSubmitting(true)

    const orderData = {
      customerName: formData.recipientName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      deliveryAddress: formData.deliveryAddress,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      deliveryDate: selectedDate ? formatDate(selectedDate) : 'Not selected',
      additionalMessage: formData.message,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        size: item.size,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      })),
      subtotal,
      deliveryFee,
      total
    }

    try {
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })

      const data = await response.json()

      if (response.ok) {
        setOrderId(data.orderId)
        setOrderSummary({ subtotal, deliveryFee, taxes, total })
        setOrderSuccess(true)
        clearCart()
      } else {
        alert('Failed to place order. Please try again.')
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-surface text-on-surface font-body-md">
      <Header />
      <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">

        {/* Order Success / Receipt */}
        {orderSuccess ? (
          <div className="max-w-md mx-auto">
            <div className="bg-surface-container-low p-4 border border-outline-variant/30 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
              </div>
              <h2 className="font-body-sm font-semibold text-primary mb-2">Order Placed Successfully!</h2>
              <p className="text-xs text-on-surface-variant mb-4">
                Thank you for your order. We've received your request and will begin processing it shortly.
              </p>

              {/* Order Receipt */}
              <div className="bg-surface p-3 border border-outline-variant/20 text-left mb-4">
                <h3 className="text-[10px] font-label-caps uppercase mb-3 text-primary">Order Receipt</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[10px] text-on-surface-variant">Order ID:</span>
                    <span className="text-xs font-medium">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-on-surface-variant">Customer Email:</span>
                    <span className="text-xs font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-on-surface-variant">Recipient:</span>
                    <span className="text-xs font-medium">{formData.recipientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-on-surface-variant">Delivery Date:</span>
                    <span className="text-xs font-medium">{selectedDate ? formatDate(selectedDate) : 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-on-surface-variant">Delivery Address:</span>
                    <span className="text-xs font-medium text-right max-w-xs">
                      {formData.deliveryAddress}, {formData.city}, {formData.state} {formData.zipCode}
                    </span>
                  </div>
                  <div className="border-t border-outline-variant/30 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-[10px] text-on-surface-variant">Subtotal:</span>
                      <span className="text-xs">${orderSummary.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] text-on-surface-variant">Delivery Fee:</span>
                      <span className="text-xs">${orderSummary.deliveryFee.toFixed(2)}</span>
                    </div>
                    {orderSummary.taxes > 0 && (
                      <div className="flex justify-between">
                        <span className="text-[10px] text-on-surface-variant">Taxes:</span>
                        <span className="text-xs">${orderSummary.taxes.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-primary mt-1 pt-1 border-t border-primary/50">
                      <span className="text-xs">Total:</span>
                      <span className="text-sm">${orderSummary.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] text-on-surface-variant">
                  A confirmation email has been sent to <span className="font-medium">{formData.email}</span>
                </p>
                <Link
                  to="/"
                  className="inline-block px-4 py-2 bg-primary text-on-primary font-label-caps uppercase tracking-[0.2em] hover:bg-transparent hover:text-primary border border-primary transition-all duration-300 text-xs"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: Checkout Details */}
          <div className="lg:col-span-8 space-y-6">
            {/* Section 1: Customer Information */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-label-caps text-label-caps uppercase">1. Customer Information</h2>
                <button className="text-[11px] underline font-label-caps hover:text-secondary-fixed-dim transition-colors">Log In for Faster Checkout</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="font-label-caps text-[10px] uppercase text-on-surface-variant">Email Address *</label>
                  <input
                    className="w-full border-b border-primary bg-transparent py-2 focus:ring-0 font-body-md outline-none"
                    placeholder="email@example.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="relative">
                  <label className="font-label-caps text-[10px] uppercase text-on-surface-variant">Phone Number (Optional)</label>
                  <input
                    className="w-full border-b border-primary bg-transparent py-2 focus:ring-0 font-body-md outline-none"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input className="w-4 h-4 rounded-none border-primary focus:ring-0" id="newsletter" type="checkbox"/>
                  <label className="text-body-md text-on-surface-variant" htmlFor="newsletter">Keep me updated on seasonal blooms</label>
                </div>
              </div>
            </section>

            {/* Section 2: Delivery Details */}
            <section>
              <h2 className="font-label-caps text-label-caps uppercase mb-4">2. Delivery Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div className="md:col-span-2 relative">
                  <label className="font-label-caps text-[10px] uppercase text-on-surface-variant">Recipient Name</label>
                  <input
                    className="w-full border-b border-primary bg-transparent py-2 focus:ring-0 font-body-md outline-none"
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 relative">
                  <label className="font-label-caps text-[10px] uppercase text-on-surface-variant">Delivery Address</label>
                  <input
                    className="w-full border-b border-primary bg-transparent py-2 focus:ring-0 font-body-md outline-none"
                    placeholder="Street, Apt, Floor"
                    type="text"
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <label className="font-label-caps text-[10px] uppercase text-on-surface-variant">City</label>
                  <input 
                    className="w-full border-b border-primary bg-transparent py-2 focus:ring-0 font-body-md outline-none" 
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="font-label-caps text-[10px] uppercase text-on-surface-variant">State</label>
                    <input 
                      className="w-full border-b border-primary bg-transparent py-2 focus:ring-0 font-body-md outline-none" 
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <label className="font-label-caps text-[10px] uppercase text-on-surface-variant">Zip Code</label>
                    <input 
                      className="w-full border-b border-primary bg-transparent py-2 focus:ring-0 font-body-md outline-none" 
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
              <h2 className="font-label-caps text-label-caps uppercase mb-4">3. Select Delivery Date</h2>
              <div className="bg-surface-container-low p-4 border border-outline-variant/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <span className="font-body-md">Earliest delivery: {formatDate(earliestDelivery)}</span>
                </div>
                {/* Real Calendar Interface */}
                <div className="border-t border-outline-variant/30 pt-4">
                  {/* Month Navigation */}
                  <div className="flex justify-between items-center mb-4">
                    <button 
                      onClick={handlePreviousMonth}
                      className="p-1 hover:bg-primary-fixed transition-colors"
                    >
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <h3 className="font-headline-sm text-headline-sm text-primary">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button 
                      onClick={handleNextMonth}
                      className="p-1 hover:bg-primary-fixed transition-colors"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {/* Day Headers */}
                    <div className="text-[9px] font-label-caps opacity-50 py-1">S</div>
                    <div className="text-[9px] font-label-caps opacity-50 py-1">M</div>
                    <div className="text-[9px] font-label-caps opacity-50 py-1">T</div>
                    <div className="text-[9px] font-label-caps opacity-50 py-1">W</div>
                    <div className="text-[9px] font-label-caps opacity-50 py-1">T</div>
                    <div className="text-[9px] font-label-caps opacity-50 py-1">F</div>
                    <div className="text-[9px] font-label-caps opacity-50 py-1">S</div>
                    {/* Empty cells for days before first day of month */}
                    {[...Array(firstDayOfMonth)].map((_, i) => (
                      <div key={`empty-${i}`} className="py-1"></div>
                    ))}
                    {/* Days of the month */}
                    {[...Array(daysInMonth)].map((_, i) => {
                      const day = i + 1
                      const disabled = isDateDisabled(day)
                      const selected = isDateSelected(day)
                      return (
                        <div
                          key={day}
                          onClick={() => handleDateSelect(day)}
                          className={`py-1.5 text-body-md cursor-pointer transition-colors ${
                            disabled 
                              ? 'text-outline opacity-20 cursor-not-allowed' 
                              : selected
                                ? 'bg-primary text-on-primary font-bold' 
                                : 'hover:bg-primary-fixed'
                          }`}
                        >
                          {day}
                        </div>
                      )
                    })}
                  </div>
                  {/* Selected Date Display */}
                  {selectedDate && (
                    <div className="mt-4 pt-3 border-t border-outline-variant/30">
                      <p className="font-body-md text-primary">
                        Selected: {formatDate(selectedDate)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-3 text-[11px] italic text-on-surface-variant">Note: Same-day delivery cut-off is 11:00 AM EST.</p>
            </section>

            {/* Section 4: Additional Message */}
            <section>
              <h2 className="font-label-caps text-label-caps uppercase mb-4">4. Additional Message (Optional)</h2>
              <div className="bg-surface-container-low p-4 border border-outline-variant/20">
                <textarea 
                  className="w-full border-b border-primary bg-transparent py-2 focus:ring-0 font-body-md outline-none resize-none" 
                  rows={3}
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
                disabled={isSubmitting}
                className="w-full bg-primary text-on-primary py-4 font-label-caps uppercase tracking-[0.2em] hover:bg-transparent hover:text-primary border border-primary transition-all duration-300 group flex items-center justify-center gap-3 text-sm disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Send Order'}
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-2 text-lg">send</span>
              </button>
              <p className="mt-4 text-[11px] text-center text-on-surface-variant opacity-70">
                Order will be saved and sent to admin for processing
              </p>
            </div>
          </div>
        </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline-variant/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-section-gap max-w-container-max mx-auto">
          <div className="md:col-span-1">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-6">REDJFLUER</h2>
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
          <p className="font-body-md text-[13px] text-on-surface-variant">© 2026 REDJFLUER</p>
          <Link className="font-body-md text-[13px] text-on-surface-variant opacity-60 hover:opacity-100 transition-opacity ml-4" to="/admin">Admin</Link>
        </div>
      </footer>
    </div>
  )
}

export default Checkout
