import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function AdminLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('adminToken', data.token)
        localStorage.setItem('adminInfo', JSON.stringify(data.admin))
        navigate('/admin')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (error) {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen">
      <Header />
      <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
        <div className="max-w-md mx-auto">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-2 text-center">Admin Login</h1>
          <p className="font-body-md text-on-surface-variant text-center mb-12">Sign in to access the dashboard</p>

          {error && (
            <div className="bg-error-container text-on-error-container p-4 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="font-label-caps text-[10px] uppercase text-on-surface-variant mb-2 block">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 font-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="font-label-caps text-[10px] uppercase text-on-surface-variant mb-2 block">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 font-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-4 font-label-caps uppercase tracking-[0.2em] hover:bg-transparent hover:text-primary border border-primary transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-on-surface-variant">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/admin/register')}
              className="text-primary hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </main>
    </div>
  )
}

export default AdminLogin
