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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="flex items-center group">
            <div className="relative h-14 w-48 lg:h-16 lg:w-56 group-hover:scale-105 transition-transform duration-300">
              <Image src="/images/logo.png" alt="Parquelectro Mayorista" fill className="object-contain" priority />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/#productos" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Productos</Link>
            <Link href="/#categorias" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Categorías</Link>
            <Link href="/#mayorista" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Precios Mayorista</Link>
            <Link href="/contacto" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contacto</Link>
          </nav>

          <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar productos..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 bg-input border-border focus:border-primary focus:ring-primary/20" />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <Link href="/carrito">
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 hover:text-primary">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary text-[10px] font-bold flex items-center justify-center text-secondary-foreground">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-primary/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <div className="flex flex-col gap-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar productos..." value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 bg-input border-border" />
              </form>
              <nav className="flex flex-col gap-2">
                {[
                  { href: "/#productos", label: "Productos" },
                  { href: "/#categorias", label: "Categorías" },
                  { href: "/#mayorista", label: "Precios Mayorista" },
                  { href: "/contacto", label: "Contacto" },
                  { href: "/carrito", label: "Carrito" },
                ].map(({ href, label }) => (
                  <Link key={href} href={href}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
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
