"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Menu, X, ShoppingCart, Search } from "lucide-react"
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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
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
                className="text-sm font-semibold text-gray-600 hover:text-[#1B2C6B] transition-colors relative group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F5A623] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Buscador desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-sm mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Buscar productos..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-[#1B2C6B] focus-visible:ring-[#1B2C6B]/10 rounded-xl" />
            </div>
          </form>

          {/* Carrito + hamburguesa */}
          <div className="flex items-center gap-2">
            <Link href="/carrito">
              <Button variant="ghost" size="icon"
                className="relative text-gray-600 hover:text-[#1B2C6B] hover:bg-[#EEF1FB]">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#F5A623] text-[10px] font-black flex items-center justify-center text-[#1B2C6B]">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon"
              className="lg:hidden text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Menú mobile */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col gap-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input type="search" placeholder="Buscar productos..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 bg-gray-50 border-gray-200 rounded-xl" />
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
                    className="px-3 py-2.5 text-sm font-semibold text-gray-600 hover:text-[#1B2C6B] hover:bg-[#EEF1FB] rounded-xl transition-colors"
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
