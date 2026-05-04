"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingCart, User, Search } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-14 w-48 lg:h-16 lg:w-56 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/logo.png"
                alt="Parquelectro Mayorista"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              href="#productos" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Productos
            </Link>
            <Link 
              href="#categorias" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Categorías
            </Link>
            <Link 
              href="#mayorista" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Precios Mayorista
            </Link>
            <Link 
              href="#contacto" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contacto
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-full pl-10 bg-input border-border focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-primary/10 hover:text-primary">
              <User className="h-5 w-5" />
              <span className="sr-only">Mi Cuenta</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrito</span>
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary text-[10px] font-bold flex items-center justify-center text-secondary-foreground">
                0
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden hover:bg-primary/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  className="w-full pl-10 bg-input border-border"
                />
              </div>
              <nav className="flex flex-col gap-2">
                <Link 
                  href="#productos" 
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  Productos
                </Link>
                <Link 
                  href="#categorias" 
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  Categorías
                </Link>
                <Link 
                  href="#mayorista" 
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  Precios Mayorista
                </Link>
                <Link 
                  href="#contacto" 
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  Contacto
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
