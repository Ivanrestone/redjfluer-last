import { useState } from 'react'

function Admin() {
  const [activeNav, setActiveNav] = useState('analytics')
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const navItems = [
    { id: 'analytics', label: 'Analytics', icon: 'analytics' },
    { id: 'orders', label: 'Orders', icon: 'shopping_cart' },
    { id: 'products', label: 'Products', icon: 'local_florist' },
    { id: 'customers', label: 'Customers', icon: 'group' },
    { id: 'discounts', label: 'Discounts', icon: 'sell' },
  ]

  const orders = [
    { id: '#FL-8921', customer: 'Eleanor Vance', email: 'eleanor@example.com', product: 'Velvet Orchid Bouquet', amount: '$185.00', status: 'Delivered', date: 'Oct 20, 2026', address: '123 Garden Lane, NY 10001' },
    { id: '#FL-8922', customer: 'Julien Sorel', email: 'julien@example.com', product: 'Arctic Lily Minimalist', amount: '$120.00', status: 'Shipped', date: 'Oct 21, 2026', address: '456 Rose Avenue, NY 10002' },
    { id: '#FL-8923', customer: 'Clarissa Dalloway', email: 'clarissa@example.com', product: 'The Royal Garden Box', amount: '$350.00', status: 'Pending', date: 'Oct 22, 2026', address: '789 Blossom Street, NY 10003' },
    { id: '#FL-8924', customer: 'Elizabeth Bennet', email: 'elizabeth@example.com', product: 'Midnight Rose Bouquet', amount: '$145.00', status: 'Processing', date: 'Oct 22, 2026', address: '321 Pride Road, NY 10004' },
    { id: '#FL-8925', customer: 'Mr. Darcy', email: 'darcy@example.com', product: 'Pastel Dreams', amount: '$135.00', status: 'Pending', date: 'Oct 23, 2026', address: '654 Pemberley Way, NY 10005' },
  ]

  const recentOrders = orders.slice(0, 3)

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
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">settings</button>
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
                      <p className="font-headline-md text-headline-md text-primary">$42,930.50</p>
                      <p className="text-xs text-on-tertiary-container mt-1">+12.5% from last month</p>
                    </div>
                  </div>
                  <div className="p-8 bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between h-48 group hover:border-primary transition-all">
                    <div className="flex justify-between items-start">
                      <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">Total Orders</p>
                      <span className="material-symbols-outlined text-primary">inventory_2</span>
                    </div>
                    <div>
                      <p className="font-headline-md text-headline-md text-primary">843</p>
                      <p className="text-xs text-on-tertiary-container mt-1">12 pending shipments</p>
                    </div>
                  </div>
                  <div className="p-8 bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between h-48 group hover:border-primary transition-all">
                    <div className="flex justify-between items-start">
                      <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">New Customers</p>
                      <span className="material-symbols-outlined text-primary">person_add</span>
                    </div>
                    <div>
                      <p className="font-headline-md text-headline-md text-primary">156</p>
                      <p className="text-xs text-on-tertiary-container mt-1">+48 this week</p>
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
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-20 bg-surface-container-high relative overflow-hidden">
                          <img className="object-cover w-full h-full" alt="Midnight Rose" src="/Bouquets/5f470670cf477c2f0e6aa9e5eb09beb3.jpg" />
                        </div>
                        <div>
                          <p className="font-headline-sm text-lg leading-tight mb-1">Midnight Rose</p>
                          <p className="text-xs text-on-surface-variant">124 units sold this week</p>
                        </div>
                      </div>
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
                        {orders.map((order, index) => (
                          <tr key={index} className="hover:bg-surface-container-lowest transition-colors group">
                            <td className="px-8 py-6 font-body-md text-primary font-semibold">{order.id}</td>
                            <td className="px-8 py-6">
                              <p className="font-body-md">{order.customer}</p>
                              <p className="text-xs text-on-surface-variant">{order.email}</p>
                            </td>
                            <td className="px-8 py-6 font-body-md text-on-surface-variant">{order.product}</td>
                            <td className="px-8 py-6 font-body-md font-semibold">{order.amount}</td>
                            <td className="px-8 py-6 font-body-md text-on-surface-variant">{order.date}</td>
                            <td className="px-8 py-6">
                              <select
                                value={order.status}
                                onChange={(e) => {
                                  const newOrders = [...orders]
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
