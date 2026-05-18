"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Menu, X, ShoppingCart, Search, Zap } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/use-cart"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1B2C6B] shadow-lg shadow-[#1B2C6B]/30">
      {/* Barra superior */}
      <div className="hidden lg:block bg-[#152354] border-b border-white/10">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Zap className="w-3 h-3 text-[#F5A623]" />
            <span>Envíos en 24hs al AMBA · Precios mayoristas sin intermediarios</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span>Lun–Vie 9:00–18:00 · Sáb 9:00–13:00</span>
            <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer"
              className="text-[#2ECC40] hover:text-[#2ECC40]/80 font-medium transition-colors">
              WhatsApp →
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <div className="relative h-12 w-44 lg:h-14 lg:w-52 group-hover:scale-105 transition-transform duration-300">
              <Image src="/images/logo.png" alt="Parquelectro Mayorista" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {[
              { href: "/#productos", label: "Productos" },
              { href: "/#categorias", label: "Categorías" },
              { href: "/#mayorista", label: "Precios Mayorista" },
              { href: "/contacto", label: "Contacto" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F5A623] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Buscador desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-sm mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input type="search" placeholder="Buscar productos..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#F5A623] focus:ring-[#F5A623]/20 focus-visible:ring-[#F5A623]/20" />
            </div>
          </form>

          {/* Carrito + hamburguesa */}
          <div className="flex items-center gap-2">
            <Link href="/carrito">
              <Button variant="ghost" size="icon"
                className="relative text-white hover:bg-white/10 hover:text-white">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#F5A623] text-[10px] font-bold flex items-center justify-center text-[#1B2C6B]">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Menú mobile */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4">
            <div className="flex flex-col gap-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input type="search" placeholder="Buscar productos..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40" />
              </form>
              <nav className="flex flex-col gap-1">
                {[
                  { href: "/#productos", label: "Productos" },
                  { href: "/#categorias", label: "Categorías" },
                  { href: "/#mayorista", label: "Precios Mayorista" },
                  { href: "/contacto", label: "Contacto" },
                  { href: "/carrito", label: "🛒 Carrito" },
                ].map(({ href, label }) => (
                  <Link key={href} href={href}
                    className="px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}>
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
