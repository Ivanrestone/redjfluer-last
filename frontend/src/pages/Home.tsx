import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  useEffect(() => {
    // Header scroll effect - transparent at top, solid when scrolling
    const handleScroll = () => {
      const header = document.getElementById('main-header')
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('bg-surface/90', 'backdrop-blur-xl', 'border-b', 'border-outline-variant/30', 'shadow-sm', 'py-2')
          header.classList.remove('py-4')
        } else {
          header.classList.remove('bg-surface/90', 'backdrop-blur-xl', 'border-b', 'border-outline-variant/30', 'shadow-sm', 'py-2')
          header.classList.add('py-4')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Horizontal scroll button logic
    const scrollContainer = document.querySelector('.overflow-x-auto') as HTMLElement
    if (!scrollContainer) return

    let isDown = false
    let startX: number
    let scrollLeft: number

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true
      startX = e.pageX - scrollContainer.offsetLeft
      scrollLeft = scrollContainer.scrollLeft
    }

    const handleMouseLeave = () => {
      isDown = false
    }

    const handleMouseUp = () => {
      isDown = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - scrollContainer.offsetLeft
      const walk = (x - startX) * 2
      scrollContainer.scrollLeft = scrollLeft - walk
    }

    scrollContainer.addEventListener('mousedown', handleMouseDown)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)
    scrollContainer.addEventListener('mouseup', handleMouseUp)
    scrollContainer.addEventListener('mousemove', handleMouseMove)

    return () => {
      scrollContainer.removeEventListener('mousedown', handleMouseDown)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
      scrollContainer.removeEventListener('mouseup', handleMouseUp)
      scrollContainer.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden m-0 p-0 w-full">
        {/* TopNavBar */}
        <header className="fixed top-0 w-full z-50 transition-all duration-300" id="main-header">
          <nav className="flex justify-between items-center px-6 md:px-margin-desktop py-4 h-20 w-full">
            {/* Brand Logo */}
            <Link className="font-headline-md text-headline-md tracking-tighter text-primary dark:text-on-primary" to="/">REDJFLUER</Link>
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link className="font-label-caps text-label-caps text-primary dark:text-on-primary border-b border-primary pb-1" to="/shop">Shop</Link>
              <a className="font-label-caps text-label-caps text-on-surface-variant dark:text-on-tertiary-container hover:text-primary transition-colors duration-300" href="#">Collections</a>
              <a className="font-label-caps text-label-caps text-on-surface-variant dark:text-on-tertiary-container hover:text-primary transition-colors duration-300" href="#">About</a>
            </div>
            {/* Trailing Icons */}
            <div className="flex items-center gap-5 md:gap-6">
              <button className="hover:opacity-70 transition-opacity duration-300">
                <span className="material-symbols-outlined">search</span>
              </button>
              <Link className="hover:opacity-70 transition-opacity duration-300" to="/account">
                <span className="material-symbols-outlined">person</span>
              </Link>
              <button className="hover:opacity-70 transition-opacity duration-300 hidden sm:block">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <Link className="hover:opacity-70 transition-opacity duration-300 relative" to="/cart">
                <span className="material-symbols-outlined">shopping_bag</span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full"></span>
              </Link>
            </div>
          </nav>
        </header>
        <main>
          {/* Hero Section */}
          <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('cover.jpg')" }}></div>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="relative z-10 px-6 md:px-margin-desktop max-w-container-max mx-auto w-full text-white">
              <div className="max-w-2xl">
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-8 italic">Artistry in Bloom</h1>
                <p className="font-body-lg text-body-lg mb-10 text-white/90 max-w-lg">Bespoke botanical creations for the discerning soul. Experience nature elevated to an art form.</p>
                <Link className="inline-block bg-white text-primary px-12 py-5 font-label-caps text-label-caps hover:bg-transparent hover:text-white border border-white transition-all duration-500 ease-in-out" to="/shop">
                  SHOP NOW
                </Link>
              </div>
            </div>
          </section>

          {/* Featured Categories */}
          <section className="w-full py-10 bg-surface">
            <div className="max-w-container-max mx-auto px-margin-desktop">
              <div className="text-center mb-16 js-scroll-fade">
                <h2 className="font-headline-md text-primary mb-4">Curated Collections</h2>
                <p className="font-body-md text-on-surface-variant max-w-lg mx-auto">Discover our meticulously designed collections, each tailored for a specific expression of sentiment.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Category 1 */}
                <a className="group block relative overflow-hidden h-[500px] bg-surface-container js-scroll-fade" href="#">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="A lavish luxury bouquet featuring pastel peonies, delicate roses, and soft greenery in a high-end glass vase against a creamy background, soft natural lighting." src="Bouquets/91a81b1aba67cf0ba032f31b46976846.jpg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex flex-col justify-end p-8">
                    <h3 className="font-headline-sm text-on-primary mb-2">Bouquets</h3>
                    <span className="font-label-caps text-on-primary/80 tracking-widest group-hover:text-on-primary transition-colors flex items-center gap-2">EXPLORE <span className="material-symbols-outlined text-[16px]">arrow_forward</span></span>
                  </div>
                </a>
                {/* Category 2 */}
                <a className="group block relative overflow-hidden h-[500px] bg-surface-container mt-0 md:mt-12 js-scroll-fade delay-100" href="#">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="A sophisticated velvet hat box filled with perfectly arranged, vibrant red signature roses, set on a polished marble surface with soft shadows." src="BoxWithFlowers/27612b8d2ee543549d3be8fb7258c0f6.jpg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex flex-col justify-end p-8">
                    <h3 className="font-headline-sm text-on-primary mb-2">Flower Boxes</h3>
                    <span className="font-label-caps text-on-primary/80 tracking-widest group-hover:text-on-primary transition-colors flex items-center gap-2">EXPLORE <span className="material-symbols-outlined text-[16px]">arrow_forward</span></span>
                  </div>
                </a>
                {/* Category 3 */}
                <a className="group block relative overflow-hidden h-[500px] bg-surface-container js-scroll-fade delay-200" href="#">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Close up of a single, flawless eternal rose in a minimalist acrylic display case, highlighting the velvety texture of the petals, moody and elegant lighting." src="VaseWithPlant/7663e4943b0e5d2b02627c489d64f9af.jpg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex flex-col justify-end p-8">
                    <h3 className="font-headline-sm text-on-primary mb-2">Plants in Vases</h3>
                    <span className="font-label-caps text-on-primary/80 tracking-widest group-hover:text-on-primary transition-colors flex items-center gap-2">EXPLORE <span className="material-symbols-outlined text-[16px]">arrow_forward</span></span>
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* New Arrivals (Horizontal Scroll) */}
          <section className="py-5 overflow-hidden">
            <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto mb-12 flex justify-between items-end">
              <div>
                <span className="font-label-caps text-label-caps text-on-surface-variant block mb-4">JUST REVEALED</span>
                <h2 className="font-headline-md text-headline-md">New Arrivals</h2>
              </div>
              <a className="font-label-caps text-label-caps border-b border-primary pb-1" href="#">VIEW ALL</a>
            </div>
            <div className="flex overflow-x-auto gap-gutter px-6 md:px-margin-desktop no-scrollbar pb-8">
              {/* Scroll Items */}
              <div className="flex-none w-[300px] md:w-[400px]">
                <div className="aspect-[4/5] bg-surface-container mb-6 overflow-hidden">
                  <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="A vertical portrait of a minimalist floral arrangement called 'The Muse', featuring a single dramatic protea surrounded by architectural greenery in a sleek ceramic vase. High-end lifestyle photography style with soft natural window light and neutral tones." src="/Bouquets/5f470670cf477c2f0e6aa9e5eb09beb3.jpg" />
                </div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">NEW SEASON</p>
                <h3 className="font-headline-sm text-headline-sm mb-2">The Muse</h3>
                <p className="font-label-caps text-label-caps">$145.00</p>
              </div>
              <div className="flex-none w-[300px] md:w-[400px]">
                <div className="aspect-[4/5] bg-surface-container mb-6 overflow-hidden">
                  <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Close up of a vibrant spring bouquet titled 'Verdana' with lilac, tulips, and green berries. The arrangement is organic and loose, sitting on a white marble table in a bright, airy room with soft morning sunlight casting gentle shadows." src="/Bouquets/62b19dfc90fc8efe38fefefeaf06aed8.jpg" />
                </div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">LIMITED RELEASE</p>
                <h3 className="font-headline-sm text-headline-sm mb-2">Verdana</h3>
                <p className="font-label-caps text-label-caps">$120.00</p>
              </div>
              <div className="flex-none w-[300px] md:w-[400px]">
                <div className="aspect-[4/5] bg-surface-container mb-6 overflow-hidden">
                  <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Elegant arrangement of white hydrangeas and pale peach roses in a crystal vase. The lighting is high-key and soft, creating an ethereal, romantic mood. Pristine white background, luxury minimalism aesthetic." src="/Bouquets/674d716d284ebc4a2e34edd597456f16.jpg" />
                </div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">ARTISAN CHOICE</p>
                <h3 className="font-headline-sm text-headline-sm mb-2">Ethereal White</h3>
                <p className="font-label-caps text-label-caps">$165.00</p>
              </div>
              <div className="flex-none w-[300px] md:w-[400px]">
                <div className="aspect-[4/5] bg-surface-container mb-6 overflow-hidden">
                  <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="A wild and textured floral composition with dried pampas grass, burnt orange carnations, and dark foliage. Warm, autumnal color palette with golden hour lighting on a textured plaster wall." src="/Bouquets/ad5903ee1299c87b4ea63220bbec4af0.jpg" />
                </div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">SIGNATURE SERIES</p>
                <h3 className="font-headline-sm text-headline-sm mb-2">Terra Soul</h3>
                <p className="font-label-caps text-label-caps">$135.00</p>
              </div>
            </div>
          </section>

          {/* Featured Collections (Bento Style) */}
          <section className="py-section-gap bg-surface-container-low">
            <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto">
              <div className="text-center mb-16">
                <span className="font-label-caps text-label-caps text-on-surface-variant tracking-[0.3em] block mb-4 uppercase">Curation</span>
                <h2 className="font-headline-md text-headline-md italic">The Editorial Edit</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto">
                {/* Summer Solstice */}
                <div className="md:col-span-8 group relative overflow-hidden aspect-[16/9] cursor-pointer">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[1.5s]" style={{ backgroundImage: "url('/Bouquets/c2eb77c637230072d854f88191331dad.jpg')" }}></div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <h3 className="font-headline-md text-headline-md mb-2">Summer Solstice</h3>
                    <p className="font-label-caps text-label-caps opacity-0 group-hover:opacity-100 transition-opacity duration-500 underline underline-offset-8">EXPLORE COLLECTION</p>
                  </div>
                </div>
                {/* The Wedding Edit */}
                <div className="md:col-span-4 group relative overflow-hidden aspect-[4/5] cursor-pointer">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[1.5s]" style={{ backgroundImage: "url('/Bouquets/674d716d284ebc4a2e34edd597456f16.jpg')" }}></div>
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-500"></div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <h3 className="font-headline-sm text-headline-sm mb-2">The Wedding Edit</h3>
                    <p className="font-label-caps text-label-caps opacity-0 group-hover:opacity-100 transition-opacity duration-500 underline underline-offset-8">VIEW MORE</p>
                  </div>
                </div>
                {/* Classic Roses (Full width variant) */}
                <div className="md:col-span-12 group relative overflow-hidden aspect-[21/9] cursor-pointer mt-8">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[1.5s]" style={{ backgroundImage: "url('/Bouquets/91a81b1aba67cf0ba032f31b46976846.jpg')" }}></div>
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                    <h3 className="font-display-lg text-display-lg-mobile md:text-headline-md lg:text-display-lg mb-4 italic">Classic Roses</h3>
                    <p className="font-label-caps text-label-caps border border-white px-8 py-3 hover:bg-white hover:text-primary transition-colors">SHOP TIMELESS</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Sellers */}
          <section className="py-section-gap">
            <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto">
              <div className="flex items-center justify-between mb-16">
                <h2 className="font-headline-md text-headline-md">The Best Sellers</h2>
                <p className="font-body-md text-on-surface-variant max-w-xs text-right hidden md:block">Our most coveted arrangements, favored by our bloom circle for their timeless appeal.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                {/* Product Card 1 */}
                <div className="group cursor-pointer">
                  <div className="aspect-[1/1.25] mb-6 overflow-hidden bg-surface-container relative">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="A luxury floral arrangement titled 'Midnight Velvet' with dark calla lilies and deep purple hydrangeas in a matte black vase. The lighting is high-contrast and dramatic, set against a dark textured wall. Premium aesthetic." src="/Bouquets/5f470670cf477c2f0e6aa9e5eb09beb3.jpg" />
                    <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-primary p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm mb-1">Midnight Velvet</h3>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">SCULPTURAL</p>
                  <p className="font-label-caps text-label-caps">$180.00</p>
                </div>
                {/* Product Card 2 */}
                <div className="group cursor-pointer">
                  <div className="aspect-[1/1.25] mb-6 overflow-hidden bg-surface-container relative">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="Delicate arrangement named 'Morning Mist' with white sweet peas, baby's breath, and pale blue thistles in a frosted glass bowl. Light, airy, and ethereal lighting with a soft-focus background." src="/Bouquets/62b19dfc90fc8efe38fefefeaf06aed8.jpg" />
                    <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-primary p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm mb-1">Morning Mist</h3>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">DELICATE</p>
                  <p className="font-label-caps text-label-caps">$95.00</p>
                </div>
                {/* Product Card 3 */}
                <div className="group cursor-pointer">
                  <div className="aspect-[1/1.25] mb-6 overflow-hidden bg-surface-container relative">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="Lush bouquet 'Golden Hour' with apricot roses, dahlias, and dried grasses. Warm, glowing sunset lighting on a rustic wooden table. Editorial photography style." src="/Bouquets/674d716d284ebc4a2e34edd597456f16.jpg" />
                    <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-primary p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm mb-1">Golden Hour</h3>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">WARM</p>
                  <p className="font-label-caps text-label-caps">$130.00</p>
                </div>
                {/* Product Card 4 */}
                <div className="group cursor-pointer">
                  <div className="aspect-[1/1.25] mb-6 overflow-hidden bg-surface-container relative">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="Modern arrangement 'Pure Zen' with a single orchid stem and smooth river stones in a minimalist tray. Very clean lines, neutral colors, and soft shadow work." src="/Bouquets/ad5903ee1299c87b4ea63220bbec4af0.jpg" />
                    <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-primary p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm mb-1">Pure Zen</h3>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">MINIMAL</p>
                  <p className="font-label-caps text-label-caps">$110.00</p>
                </div>
              </div>
            </div>
          </section>

          {/* Same Day Delivery Banner */}
          <section className="bg-secondary-container text-on-secondary-container py-16">
            <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full border border-on-secondary-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined !text-3xl">local_shipping</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm font-bold mb-1">Freshness, Delivered Today.</h2>
                  <p className="font-body-md opacity-80">Order by 12pm for same-day boutique delivery in your city.</p>
                </div>
              </div>
              <a className="bg-primary text-on-primary px-10 py-4 font-label-caps text-label-caps hover:bg-transparent hover:text-primary border border-primary transition-all duration-300" href="#">
                CHECK AVAILABILITY
              </a>
            </div>
          </section>

          {/* Instagram Gallery */}
          <section className="py-section-gap">
            <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto mb-12 text-center">
              <h2 className="font-headline-sm text-headline-sm mb-2 italic">Follow Our Journey</h2>
              <p className="font-label-caps text-label-caps text-on-surface-variant">@FLORETTEBOTANICALS</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <div className="aspect-square overflow-hidden cursor-pointer relative group">
                <img className="w-full h-full object-cover" alt="Instagram preview: A close up of a florist's hands carefully arranging delicate petals. Aesthetic, warm tones, lifestyle photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf9EbiXDyB1JPeF8dHLFVuiS-LF-S2jEIOJKv-lV1uim2MAHlv_V6NYBlDOappmKyzdxrw_8VP2wDmQSi4tMsRrsapIzA4vacOmO5Mfmd3gJtIFGS5pim0JZc-6ISOnoLAcKS86mlxQr4i38yK-x-4YjPCoMqyntMeYcDtoO59cG1htM2AP1-wcuyUm-TBTS79bZxmM-q_ZTFkswPc5G3IwB8Okjh3Rdh8RLdSyZCfjIKD4J6-EVp8GQ" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">favorite</span>
                </div>
              </div>
              <div className="aspect-square overflow-hidden cursor-pointer relative group">
                <img className="w-full h-full object-cover" alt="Instagram preview: A minimalist storefront of a luxury flower shop with large glass windows and elegant signage. Clean, modern architecture." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwXnNonbXRkcTXJmKmQLAzLe4KHZqsovFNG1ghHJ2enXZEJgiLN2lv3xKjmDjyvz4wI47J8GDO7SVkcYk_ItoNMOEzLdwbG8Ne5f_VWzLI566GZVkItVC8o0M74awloA-DxfU13ZIznVvvSOoYMejT8h318H6tT0xoySun_9x7l9ZYlmINIeGPVuIlYvG2UWr6wmnbNDPF4G5cQZPghfxxTEX-DB4LWEC-OvEUmlskd28aEMWFxRDssA" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">favorite</span>
                </div>
              </div>
              <div className="aspect-square overflow-hidden cursor-pointer relative group">
                <img className="w-full h-full object-cover" alt="Instagram preview: A bouquet sitting on the passenger seat of a vintage car. Nostalgic, cinematic feel, warm sunlight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9QnW_OXXq2lEYTOWcNoNS5NtaWdZgnwILG4ouf5QW_CVh3C9OIUc9FN0MvN5CSub99ubtJ2A8mfszUFtgvVvq4jjGg-r__UQRrVk-KhwWYvA9TL4RQJp9ravnFGpB_sZGZrdingmFKRtAGDNJ8ZvNe7uAjaqY1o6WT2lY_ZA9X36a_m759wUIrs2G17YPhSs7jE2zggqwbNCbLFdXH1RWSfdJeZNItoGKu8YykGLfutWir-1M_TAqBg" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">favorite</span>
                </div>
              </div>
              <div className="aspect-square overflow-hidden cursor-pointer relative group">
                <img className="w-full h-full object-cover" alt="Instagram preview: A top-down view of a flower arrangement on a textured stone table next to a cup of coffee and an open book." src="https://lh3.googleusercontent.com/aida-public/AB6AXuALMcKz2uIBacV_8jYyFUCHBIqPpMYfa2rYQ1hKc5HUoJ-Lx31ZewHHYNFmpXqOjiipFvVWtsjooBpUr2wxZckhvkpAg-PTBKAmOhwIthCXlFO9bq_eX-KPyGTxrqFszzH2POUF312YAs6hY_Y-TCrJHhWnsLjbmjhzqfLAYzYXMJq1jGVpHuvD0f0YLsEFn6lO8DpzKxi9bunXqBJjgeU4Gdby9P6N7qKZfiEp7cNTBNQNEsBXDloYJQ" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">favorite</span>
                </div>
              </div>
              <div className="aspect-square overflow-hidden cursor-pointer relative group">
                <img className="w-full h-full object-cover" alt="Instagram preview: A close-up of a single rare flower variety with unique coloring. Professional botanical photography, sharp focus." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAILATYubuMQXBut1zIfiAvg-v0caTGmit5eyjnGffiXZY-9zDlMzF0skbmfZwj1x8kOqWdVKT2lvSkrzx4hrsea9LQHypv1wpOfKtOx3-6uieEl2eV3maXShKT6r8KZtGCYLtYxiRyfgIErqumFxkK7SJQ1i2LnUycFNeinu1Z9inKlZ_9qTcDTKAIKz6szBvdMOL2GwSLkwc8-e6-HjZ-aGjqLtYy9TpeB_ypbjbnEPMdqFTiPfmTRA" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">favorite</span>
                </div>
              </div>
              <div className="aspect-square overflow-hidden cursor-pointer relative group">
                <img className="w-full h-full object-cover" alt="Instagram preview: A beautifully wrapped luxury gift box with a small sprig of dried lavender tucked into the ribbon." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgutipDSlbWEtn9164Aa3DNsMKaJ4l5sHzmm4ETimBO0tpxKxambUG36b0tBOcI8lEZLvOzrZJQ-edZxikgoXJjbJsoaWBa48UNkcoXug1-OR4x1fX3hP2SYQgWMsolHvZICzIHzlK4MAcjcDcq0q-Ydra_gEK602lWIaMc6k3eQpMWmON4D2Tet6r9QADMHUGRjBuEEP5igNjKzsrVZCBhQHv1lzt_Pa3aVji5yb-G8GbSM8s7SQA" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">favorite</span>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="py-section-gap border-t border-outline-variant/30">
            <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto text-center max-w-2xl">
              <h2 className="font-headline-md text-headline-md mb-4 italic">Join our bloom circle</h2>
              <p className="font-body-md text-on-surface-variant mb-10">Receive exclusive early access to new collections, botanical care guides, and seasonal inspirations.</p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input className="flex-grow bg-transparent border-b border-primary py-4 px-2 font-label-caps text-label-caps focus:outline-none focus:border-secondary transition-colors uppercase" placeholder="YOUR EMAIL ADDRESS" type="email" />
                <button className="bg-primary text-on-primary px-10 py-4 font-label-caps text-label-caps hover:bg-secondary transition-colors duration-300" type="submit">
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-surface-container dark:bg-primary-container border-t border-outline-variant/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-6 md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
            {/* Brand Info */}
            <div className="space-y-6">
              <h2 className="font-headline-sm text-headline-sm text-primary dark:text-on-primary">FLORETTE</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Elevating the language of flowers through artisanal curation and mindful design.
              </p>
              <div className="flex gap-4">
                <a className="w-10 h-10 border border-outline-variant flex items-center justify-center hover:border-primary transition-colors" href="#">
                  <span className="material-symbols-outlined">public</span>
                </a>
                <a className="w-10 h-10 border border-outline-variant flex items-center justify-center hover:border-primary transition-colors" href="#">
                  <span className="material-symbols-outlined">alternate_email</span>
                </a>
              </div>
            </div>
            {/* Links Column 1 */}
            <div>
              <h4 className="font-label-caps text-label-caps mb-8 text-primary">COLLECTIONS</h4>
              <ul className="space-y-4">
                <li><Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors" to="/shop">Shop All</Link></li>
                <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Signature Series</a></li>
                <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">The Wedding Edit</a></li>
                <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Limited Releases</a></li>
              </ul>
            </div>
            {/* Links Column 2 */}
            <div>
              <h4 className="font-label-caps text-label-caps mb-8 text-primary">ABOUT</h4>
              <ul className="space-y-4">
                <li><Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors" to="/admin">Admin Dashboard</Link></li>
                <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a></li>
              </ul>
            </div>
            {/* Links Column 3 */}
            <div>
              <h4 className="font-label-caps text-label-caps mb-8 text-primary">SUPPORT</h4>
              <ul className="space-y-4">
                <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Shipping &amp; Returns</a></li>
                <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Floral Care</a></li>
                <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="px-6 md:px-margin-desktop py-8 border-t border-outline-variant/10 max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-label-caps text-[10px] text-on-surface-variant">© 2024 Florette Botanicals. Artistry in Bloom.</p>
            <div className="flex gap-8">
              <span className="font-label-caps text-[10px] text-on-surface-variant">VISA</span>
              <span className="font-label-caps text-[10px] text-on-surface-variant">MASTERCARD</span>
              <span className="font-label-caps text-[10px] text-on-surface-variant">AMEX</span>
              <span className="font-label-caps text-[10px] text-on-surface-variant">APPLE PAY</span>
            </div>
          </div>
        </footer>

        {/* FAB */}
        <button className="fixed bottom-8 right-8 bg-primary text-on-primary w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:bg-secondary transition-all transform hover:scale-110 active:scale-95 z-40">
          <span className="material-symbols-outlined !text-2xl">chat_bubble</span>
        </button>
      </div>
  )
}

export default Home
