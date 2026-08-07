import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('analytics')
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [analytics, setAnalytics] = useState<any>(null)
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [adminInfo, setAdminInfo] = useState<any>(null)
  const [availableImages, setAvailableImages] = useState<any[]>([])
  const [useExistingImages, setUseExistingImages] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const admin = localStorage.getItem('adminInfo')
    if (!token) {
      navigate('/admin/login')
    } else {
      setAdminInfo(JSON.parse(admin || '{}'))
      fetchAnalytics()
      fetchRecentOrders()
      fetchCustomers()
      fetchProducts()
    }
  }, [navigate])

  const fetchAvailableImages = async (category: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/images/${category}`)
      const data = await response.json()
      setAvailableImages(data.images || [])
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminInfo')
    navigate('/admin/login')
  }

  const fetchAnalytics = async () => {
    const token = localStorage.getItem('adminToken')
    try {
      const response = await fetch('http://localhost:3001/api/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    }
  }

  const fetchRecentOrders = async () => {
    const token = localStorage.getItem('adminToken')
    try {
      const response = await fetch('http://localhost:3001/api/orders/recent', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setRecentOrders(data)
    } catch (error) {
      console.error('Error fetching recent orders:', error)
    }
  }

  const fetchCustomers = async () => {
    const token = localStorage.getItem('adminToken')
    try {
      const response = await fetch('http://localhost:3001/api/customers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setCustomers(data)
    } catch (error) {
      console.error('Error fetching customers:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
      // Fallback to localStorage if API fails
      const savedProducts = localStorage.getItem('products')
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts))
      }
    }
  }

  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: 'Bouquets',
    description: '',
    images: [null, null, null] as (File | null)[],
    imagePreviews: ['', '', ''],
    captions: ['', '', '']
  })

  const handleImageUpload = (index: number) => (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      const newImages = [...productForm.images]
      const newPreviews = [...productForm.imagePreviews]
      newImages[index] = file
      newPreviews[index] = URL.createObjectURL(file)
      setProductForm({ ...productForm, images: newImages, imagePreviews: newPreviews })
    }
  }

  const handleCaptionChange = (index: number) => (e: any) => {
    const newCaptions = [...productForm.captions]
    newCaptions[index] = e.target.value
    setProductForm({ ...productForm, captions: newCaptions })
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let imageUrls = productForm.imagePreviews.filter(p => p !== '')

    // If there are new image files, upload them to the backend
    const newImages = productForm.images.filter(img => img !== null)
    if (newImages.length > 0) {
      const formData = new FormData()
      newImages.forEach((image) => {
        formData.append('images', image)
      })
      formData.append('category', productForm.category)
      formData.append('captions', JSON.stringify(productForm.captions))

      try {
        const response = await fetch('http://localhost:3001/api/upload-multiple', {
          method: 'POST',
          body: formData
        })

        const data = await response.json()
        if (data.success) {
          imageUrls = data.images.map((img: any) => img.imagePath)
        }
      } catch (error) {
        console.error('Upload error:', error)
      }
    } else if (editingProduct && editingProduct.images) {
      // If editing and no new images uploaded, keep the existing images
      imageUrls = editingProduct.images
    }

    // If no images at all, use default
    if (imageUrls.length === 0) {
      imageUrls = ['/Bouquets/5f470670cf477c2f0e6aa9e5eb09beb3.jpg']
    }

    const token = localStorage.getItem('adminToken')
    const productData = {
      name: productForm.name,
      price: parseFloat(productForm.price),
      category: productForm.category,
      description: productForm.description,
      images: imageUrls,
      captions: productForm.captions
    }

    try {
      let response
      if (editingProduct) {
        response = await fetch(`http://localhost:3001/api/products/${editingProduct._id || editingProduct.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(productData)
        })
      } else {
        response = await fetch('http://localhost:3001/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(productData)
        })
      }

      if (response.ok) {
        fetchProducts()
        setShowAddProduct(false)
        setProductForm({ name: '', price: '', category: 'Bouquets', description: '', images: [null, null, null], imagePreviews: ['', '', ''], captions: ['', '', ''] })
        setEditingProduct(null)
      }
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleDeleteProduct = async (id: string | number) => {
    const token = localStorage.getItem('adminToken')
    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchProducts()
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      images: [null, null, null],
      imagePreviews: product.images || [''],
      captions: product.captions || ['', '', '']
    })
    setShowAddProduct(true)
  }

  const navItems = [
    { id: 'analytics', label: 'Analytics', icon: 'analytics' },
    { id: 'orders', label: 'Orders', icon: 'shopping_cart' },
    { id: 'products', label: 'Products', icon: 'local_florist' },
    { id: 'customers', label: 'Customers', icon: 'group' },
    { id: 'discounts', label: 'Discounts', icon: 'sell' },
  ]


  return (
    <div className="bg-surface text-on-surface font-body-md overflow-hidden">
      <div className="flex h-screen w-full">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-outline-variant/30 flex flex-col h-full bg-surface z-50">
          <div className="p-8">
            <h1 className="font-headline-md text-headline-md tracking-tighter text-primary">REDJFLUER</h1>
          </div>
          <nav className="flex-1 px-4 space-y-2 mt-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-4 px-4 py-3 w-full transition-all duration-300 ${
                  activeNav === item.id
                    ? 'text-primary border-l-2 border-primary bg-surface-container-low'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-label-caps text-label-caps tracking-widest">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="p-8 border-t border-outline-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-[10px]">
                AD
              </div>
              <div>
                <p className="font-label-caps text-[10px] leading-tight">Admin User</p>
                <p className="text-[9px] text-on-surface-variant">Store Manager</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
          {/* Top App Bar */}
          <header className="sticky top-0 bg-surface/90 backdrop-blur-xl z-40 border-b border-outline-variant/30 px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4 max-w-md w-full">
              <span className="material-symbols-outlined text-on-surface-variant">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 w-full font-body-md text-body-md text-on-surface-variant placeholder:text-outline"
                placeholder="Search orders, clients..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-6">
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">notifications</button>
              <button
                onClick={handleLogout}
                className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
                title="Logout"
              >
                logout
              </button>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-8 max-w-container-max mx-auto w-full space-y-gutter">
            {activeNav === 'analytics' ? (
              <>
                {/* Welcome Section */}
                <section className="flex flex-col md:flex-row justify-between items-end gap-6">
                  <div>
                    <h2 className="font-headline-md text-headline-md text-primary">Executive Summary</h2>
                    <p className="font-body-md text-on-surface-variant">Real-time performance metrics for RedJFluer.</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-primary text-on-primary font-label-caps text-label-caps tracking-widest hover:bg-transparent hover:text-primary border border-primary transition-all duration-300">
                      Add New Product
                    </button>
                    <button className="px-6 py-3 border border-primary text-primary font-label-caps text-label-caps tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300">
                      Create Discount
                    </button>
                  </div>
                </section>

                {/* Stats Bento Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                  <div className="p-8 bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between h-48 group hover:border-primary transition-all">
                    <div className="flex justify-between items-start">
                      <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">Total Sales</p>
                      <span className="material-symbols-outlined text-primary">trending_up</span>
                    </div>
                    <div>
                      <p className="font-headline-md text-headline-md text-primary">${analytics?.totalSales?.toFixed(2) || '0.00'}</p>
                      <p className="text-xs text-on-tertiary-container mt-1">Total revenue</p>
                    </div>
                  </div>
                  <div className="p-8 bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between h-48 group hover:border-primary transition-all">
                    <div className="flex justify-between items-start">
                      <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">Total Orders</p>
                      <span className="material-symbols-outlined text-primary">inventory_2</span>
                    </div>
                    <div>
                      <p className="font-headline-md text-headline-md text-primary">{analytics?.totalOrders || 0}</p>
                      <p className="text-xs text-on-tertiary-container mt-1">All time orders</p>
                    </div>
                  </div>
                  <div className="p-8 bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between h-48 group hover:border-primary transition-all">
                    <div className="flex justify-between items-start">
                      <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">New Customers</p>
                      <span className="material-symbols-outlined text-primary">person_add</span>
                    </div>
                    <div>
                      <p className="font-headline-md text-headline-md text-primary">{analytics?.newCustomers || 0}</p>
                      <p className="text-xs text-on-tertiary-container mt-1">Last 30 days</p>
                    </div>
                  </div>
                </section>

                {/* Analytics Chart & Quick Actions */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
                  {/* Chart Placeholder Area */}
                  <div className="lg:col-span-2 p-8 border border-outline-variant/30 bg-surface-container-lowest">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="font-headline-sm text-headline-sm text-primary">Sales Velocity</h3>
                      <select className="bg-transparent border-b border-primary font-label-caps text-[10px] focus:ring-0 py-1">
                        <option>Last 30 Days</option>
                        <option>Last 6 Months</option>
                        <option>Year to Date</option>
                      </select>
                    </div>
                    <div className="w-full h-64 relative flex items-end justify-between gap-2 border-b border-outline-variant/30 pb-4">
                      <div className="w-full bg-primary/5 hover:bg-primary/20 transition-all h-[40%]" title="Day 1"></div>
                      <div className="w-full bg-primary/10 hover:bg-primary/20 transition-all h-[55%]" title="Day 2"></div>
                      <div className="w-full bg-primary/20 hover:bg-primary/20 transition-all h-[30%]" title="Day 3"></div>
                      <div className="w-full bg-primary/40 hover:bg-primary/20 transition-all h-[70%]" title="Day 4"></div>
                      <div className="w-full bg-primary hover:bg-primary/80 transition-all h-[95%]" title="Day 5"></div>
                      <div className="w-full bg-primary/30 hover:bg-primary/20 transition-all h-[50%]" title="Day 6"></div>
                      <div className="w-full bg-primary/15 hover:bg-primary/20 transition-all h-[45%]" title="Day 7"></div>
                    </div>
                    <div className="flex justify-between mt-4 font-label-caps text-[10px] text-on-surface-variant px-2">
                      <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                    </div>
                  </div>

                  {/* Quick Action Cards */}
                  <div className="space-y-6">
                    <div className="p-8 bg-primary text-on-primary border border-primary relative overflow-hidden group">
                      <div className="relative z-10">
                        <h4 className="font-headline-sm text-headline-sm mb-2">Inventory Alert</h4>
                        <p className="font-body-md text-on-primary-container mb-6 opacity-80">4 products are currently low on stock and need attention.</p>
                        <a className="font-label-caps text-label-caps border-b border-on-primary inline-block pb-1 hover:opacity-70 transition-opacity" href="#">Review Stock</a>
                      </div>
                      <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[120px] opacity-10 rotate-12">warning</span>
                    </div>
                    <div className="p-8 border border-outline-variant/30 hover:border-primary transition-all">
                      <h4 className="font-label-caps text-label-caps tracking-widest mb-4">Top Performer</h4>
                      {analytics?.topPerformer ? (
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-20 bg-surface-container-high relative overflow-hidden">
                            <img className="object-cover w-full h-full" alt={analytics.topPerformer.name} src={analytics.topPerformer.images?.[0] || '/Bouquets/5f470670cf477c2f0e6aa9e5eb09beb3.jpg'} />
                          </div>
                          <div>
                            <p className="font-headline-sm text-lg leading-tight mb-1">{analytics.topPerformer.name}</p>
                            <p className="text-xs text-on-surface-variant">{analytics.topPerformer.unitsSold || 0} units sold</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-on-surface-variant">No sales data yet</p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Recent Orders Table */}
                <section className="border border-outline-variant/30 bg-surface-container-low overflow-hidden">
                  <div className="px-8 py-6 flex justify-between items-center border-b border-outline-variant/30">
                    <h3 className="font-headline-sm text-headline-sm text-primary">Recent Orders</h3>
                    <button 
                      onClick={() => setActiveNav('orders')}
                      className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors"
                    >
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-surface-container-high border-b border-outline-variant/30">
                        <tr>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Order ID</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Customer</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Product</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Amount</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Status</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/20">
                        {recentOrders.map((order, index) => (
                          <tr key={index} className="hover:bg-surface-container-lowest transition-colors group">
                            <td className="px-8 py-6 font-body-md text-primary">{order.id}</td>
                            <td className="px-8 py-6 font-body-md">{order.customer}</td>
                            <td className="px-8 py-6 font-body-md text-on-surface-variant">{order.product}</td>
                            <td className="px-8 py-6 font-body-md">{order.amount}</td>
                            <td className="px-8 py-6">
                              <span className={`px-3 py-1 text-[9px] font-label-caps tracking-widest uppercase ${
                                order.status === 'Delivered'
                                  ? 'bg-primary text-on-primary'
                                  : order.status === 'Shipped'
                                    ? 'bg-secondary-container text-on-secondary-container'
                                    : 'bg-surface-container-highest text-on-surface-variant border border-outline-variant/30'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-8 py-6">
                              <button className="material-symbols-outlined text-outline hover:text-primary transition-colors">more_horiz</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            ) : activeNav === 'orders' ? (
              <>
                {/* Orders View */}
                <section className="flex flex-col md:flex-row justify-between items-end gap-6">
                  <div>
                    <h2 className="font-headline-md text-headline-md text-primary">Order Management</h2>
                    <p className="font-body-md text-on-surface-variant">View and manage all customer orders.</p>
                  </div>
                  <div className="flex gap-4">
                    <select className="bg-transparent border-b border-primary font-label-caps text-[10px] focus:ring-0 py-2">
                      <option>All Status</option>
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                  </div>
                </section>

                {/* Orders Table */}
                <section className="border border-outline-variant/30 bg-surface-container-low overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-surface-container-high border-b border-outline-variant/30">
                        <tr>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Order ID</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Customer</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Product</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Amount</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Date</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Status</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/20">
                        {recentOrders.map((order, index) => (
                          <tr key={index} className="hover:bg-surface-container-lowest transition-colors group">
                            <td className="px-8 py-6 font-body-md text-primary font-semibold">{order._id}</td>
                            <td className="px-8 py-6">
                              <p className="font-body-md">{order.customerName}</p>
                              <p className="text-xs text-on-surface-variant">{order.customerEmail}</p>
                            </td>
                            <td className="px-8 py-6 font-body-md text-on-surface-variant">{order.items?.[0]?.name || 'N/A'}</td>
                            <td className="px-8 py-6 font-body-md font-semibold">${order.total?.toFixed(2) || '0.00'}</td>
                            <td className="px-8 py-6 font-body-md text-on-surface-variant">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="px-8 py-6">
                              <select
                                value={order.status}
                                onChange={(e) => {
                                  const newOrders = [...recentOrders]
                                  newOrders[index].status = e.target.value
                                }}
                                className={`px-3 py-1 text-[9px] font-label-caps tracking-widest uppercase border-none focus:ring-0 cursor-pointer ${
                                  order.status === 'Delivered'
                                    ? 'bg-primary text-on-primary'
                                    : order.status === 'Shipped'
                                      ? 'bg-secondary-container text-on-secondary-container'
                                      : order.status === 'Processing'
                                        ? 'bg-surface-container-highest text-on-surface-variant border border-outline-variant/30'
                                        : 'bg-surface-container-low text-on-surface-variant border border-outline-variant/30'
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </td>
                            <td className="px-8 py-6">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="material-symbols-outlined text-outline hover:text-primary transition-colors"
                              >
                                visibility
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Order Detail Modal */}
                {selectedOrder && (
                  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-surface max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="p-8 border-b border-outline-variant/30 flex justify-between items-center">
                        <h3 className="font-headline-md text-headline-md text-primary">Order Details</h3>
                        <button 
                          onClick={() => setSelectedOrder(null)}
                          className="material-symbols-outlined text-outline hover:text-primary"
                        >
                          close
                        </button>
                      </div>
                      <div className="p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Order ID</p>
                            <p className="font-body-md text-primary font-semibold">{selectedOrder.id}</p>
                          </div>
                          <div>
                            <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Date</p>
                            <p className="font-body-md">{selectedOrder.date}</p>
                          </div>
                          <div>
                            <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Customer</p>
                            <p className="font-body-md">{selectedOrder.customer}</p>
                            <p className="text-sm text-on-surface-variant">{selectedOrder.email}</p>
                          </div>
                          <div>
                            <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Status</p>
                            <span className={`px-3 py-1 text-[9px] font-label-caps tracking-widest uppercase ${
                              selectedOrder.status === 'Delivered'
                                ? 'bg-primary text-on-primary'
                                : selectedOrder.status === 'Shipped'
                                  ? 'bg-secondary-container text-on-secondary-container'
                                  : selectedOrder.status === 'Processing'
                                    ? 'bg-surface-container-highest text-on-surface-variant border border-outline-variant/30'
                                    : 'bg-surface-container-low text-on-surface-variant border border-outline-variant/30'
                            }`}>
                              {selectedOrder.status}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Delivery Address</p>
                          <p className="font-body-md">{selectedOrder.address}</p>
                        </div>
                        <div className="border-t border-outline-variant/30 pt-6">
                          <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">Order Items</p>
                          <div className="flex items-center gap-4 p-4 bg-surface-container-low">
                            <div className="w-16 h-20 bg-surface-container-high"></div>
                            <div className="flex-1">
                              <p className="font-body-md font-semibold">{selectedOrder.product}</p>
                              <p className="text-sm text-on-surface-variant">Quantity: 1</p>
                            </div>
                            <p className="font-body-md font-semibold">{selectedOrder.amount}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center border-t border-outline-variant/30 pt-6">
                          <p className="font-headline-sm text-headline-sm">Total</p>
                          <p className="font-headline-sm text-headline-sm text-primary">{selectedOrder.amount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : activeNav === 'products' ? (
              <>
                {/* Products View */}
                <section className="flex flex-col md:flex-row justify-between items-end gap-6">
                  <div>
                    <h2 className="font-headline-md text-headline-md text-primary">Product Management</h2>
                    <p className="font-body-md text-on-surface-variant">Add, edit, and manage your product catalog.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingProduct(null)
                      setProductForm({ name: '', price: '', category: 'Bouquets', description: '', images: [null, null, null], imagePreviews: ['', '', ''], captions: ['', '', ''] })
                      setShowAddProduct(true)
                    }}
                    className="px-6 py-3 bg-primary text-on-primary font-label-caps text-label-caps tracking-widest hover:bg-transparent hover:text-primary border border-primary transition-all duration-300"
                  >
                    Add New Product
                  </button>
                </section>

                {/* Products Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                  {products.map((product) => (
                    <div key={product._id || product.id} className="border border-outline-variant/30 bg-surface-container-low overflow-hidden group hover:border-primary transition-all">
                      <div className="aspect-square bg-surface-container-high relative overflow-hidden">
                        <img
                          src={product.images?.[0] || product.image || '/Bouquets/5f470670cf477c2f0e6aa9e5eb09beb3.jpg'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-2 bg-surface/90 backdrop-blur-sm rounded-full hover:bg-primary hover:text-on-primary transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id || product.id)}
                            className="p-2 bg-surface/90 backdrop-blur-sm rounded-full hover:bg-error hover:text-on-error transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-headline-sm text-headline-sm text-primary line-clamp-1">{product.name}</h3>
                          <span className="font-body-md font-semibold">${product.price.toFixed(2)}</span>
                        </div>
                        <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-3">{product.category}</p>
                        <p className="font-body-md text-on-surface-variant text-sm line-clamp-2">{product.description}</p>
                      </div>
                    </div>
                  ))}
                </section>

                {/* Add/Edit Product Modal */}
                {showAddProduct && (
                  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-surface max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="p-8 border-b border-outline-variant/30 flex justify-between items-center">
                        <h3 className="font-headline-md text-headline-md text-primary">
                          {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h3>
                        <button
                          onClick={() => {
                            setShowAddProduct(false)
                            setEditingProduct(null)
                            setProductForm({ name: '', price: '', category: 'Bouquets', description: '', image: null, imagePreview: '' })
                          }}
                          className="material-symbols-outlined text-outline hover:text-primary"
                        >
                          close
                        </button>
                      </div>
                      <form onSubmit={handleProductSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 block">Product Name</label>
                            <input
                              type="text"
                              value={productForm.name}
                              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                              className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 font-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                              required
                            />
                          </div>
                          <div>
                            <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 block">Price ($)</label>
                            <input
                              type="number"
                              step="0.01"
                              value={productForm.price}
                              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                              className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 font-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 block">Category</label>
                          <select
                            value={productForm.category}
                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                            className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 font-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          >
                            <option value="Bouquets">Bouquets</option>
                            <option value="BoxWithFlowers">Box With Flowers</option>
                            <option value="VaseWithPlant">Vase With Plant</option>
                          </select>
                        </div>
                        <div>
                          <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 block">Description</label>
                          <textarea
                            value={productForm.description}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                            rows={4}
                            className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 font-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 block">Product Images (up to 3)</label>
                          
                          {/* Toggle between upload and select existing */}
                          <div className="flex gap-4 mb-4">
                            <button
                              type="button"
                              onClick={() => {
                                setUseExistingImages(false)
                                fetchAvailableImages(productForm.category)
                              }}
                              className={`px-4 py-2 text-sm font-label-caps tracking-widest transition-all ${
                                !useExistingImages
                                  ? 'bg-primary text-on-primary'
                                  : 'border border-outline-variant/30 text-on-surface-variant hover:border-primary'
                              }`}
                            >
                              Upload New
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setUseExistingImages(true)
                                fetchAvailableImages(productForm.category)
                              }}
                              className={`px-4 py-2 text-sm font-label-caps tracking-widest transition-all ${
                                useExistingImages
                                  ? 'bg-primary text-on-primary'
                                  : 'border border-outline-variant/30 text-on-surface-variant hover:border-primary'
                              }`}
                            >
                              Select from Folder
                            </button>
                          </div>

                          {useExistingImages ? (
                            // Select from existing images
                            <div className="grid grid-cols-4 gap-2 mb-4">
                              {availableImages.map((img: any) => (
                                <div
                                  key={img.path}
                                  onClick={() => {
                                    const newPreviews = [...productForm.imagePreviews]
                                    const firstEmptyIndex = newPreviews.findIndex(p => p === '')
                                    if (firstEmptyIndex !== -1) {
                                      newPreviews[firstEmptyIndex] = img.path
                                      setProductForm({ ...productForm, imagePreviews: newPreviews })
                                    }
                                  }}
                                  className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                                    productForm.imagePreviews.includes(img.path)
                                      ? 'border-primary'
                                      : 'border-outline-variant/30 hover:border-primary'
                                  }`}
                                >
                                  <img
                                    src={img.path}
                                    alt={img.filename}
                                    className="w-full h-20 object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            // Upload new images
                            <>
                              {[0, 1, 2].map((index) => (
                                <div key={index} className="mb-4 p-4 border border-outline-variant/30 rounded-lg">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(index)(e)}
                                    className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 font-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all mb-2"
                                  />
                                  <input
                                    type="text"
                                    placeholder={`Image ${index + 1} caption`}
                                    value={productForm.captions[index]}
                                    onChange={(e) => handleCaptionChange(index)(e)}
                                    className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-2 font-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all mb-2"
                                  />
                                  {productForm.imagePreviews[index] && (
                                    <div className="mt-2">
                                      <img
                                        src={productForm.imagePreviews[index]}
                                        alt={`Preview ${index + 1}`}
                                        className="w-24 h-24 object-cover rounded-lg border border-outline-variant/30"
                                      />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </>
                          )}
                          <p className="text-xs text-on-surface-variant mt-2">
                            {useExistingImages
                              ? 'Click images to select them for this product (max 3)'
                              : 'Upload up to 3 image files (JPG, PNG, etc.) with optional captions'
                            }
                          </p>
                        </div>
                        <div className="flex gap-4 pt-4">
                          <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-primary text-on-primary font-label-caps text-label-caps tracking-widest hover:bg-transparent hover:text-primary border border-primary transition-all duration-300"
                          >
                            {editingProduct ? 'Update Product' : 'Add Product'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddProduct(false)
                              setEditingProduct(null)
                              setProductForm({ name: '', price: '', category: 'Bouquets', description: '', images: [null, null, null], imagePreviews: ['', '', ''], captions: ['', '', ''] })
                            }}
                            className="px-6 py-3 border border-outline-variant/30 text-on-surface-variant font-label-caps text-label-caps tracking-widest hover:border-primary hover:text-primary transition-all duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </>
            ) : activeNav === 'customers' ? (
              <>
                {/* Customers View */}
                <section className="flex flex-col md:flex-row justify-between items-end gap-6">
                  <div>
                    <h2 className="font-headline-md text-headline-md text-primary">Customer Groups</h2>
                    <p className="font-body-md text-on-surface-variant">View and manage customer information.</p>
                  </div>
                </section>

                {/* Customers Table */}
                <section className="border border-outline-variant/30 bg-surface-container-low overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-surface-container-highest">
                        <tr>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Name</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Email</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Phone</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Address</th>
                          <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Joined Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/20">
                        {customers.length > 0 ? (
                          customers.map((customer, index) => (
                            <tr key={index} className="hover:bg-surface-container-lowest transition-colors">
                              <td className="px-8 py-6 font-body-md font-semibold">{customer.name}</td>
                              <td className="px-8 py-6 font-body-md text-on-surface-variant">{customer.email}</td>
                              <td className="px-8 py-6 font-body-md text-on-surface-variant">{customer.phone || 'N/A'}</td>
                              <td className="px-8 py-6 font-body-md text-on-surface-variant">{customer.address || 'N/A'}</td>
                              <td className="px-8 py-6 font-body-md text-on-surface-variant">{new Date(customer.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-8 py-12 text-center text-on-surface-variant">No customers yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="font-body-md text-on-surface-variant">This section is under construction.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-auto border-t border-outline-variant/30 py-8 px-margin-desktop bg-surface-container-low">
            <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-body-md text-body-md text-on-surface-variant opacity-60">© 2026 RedJFluer. Artistry in Bloom.</p>
              <div className="flex gap-8">
                <a className="font-label-caps text-[10px] tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a>
                <a className="font-label-caps text-[10px] tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Documentation</a>
                <a className="font-label-caps text-[10px] tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">API Keys</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default Admin
