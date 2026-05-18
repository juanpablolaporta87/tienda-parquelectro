"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-[#1B2C6B] text-white">
      {/* CTA mayorista */}
      <div className="bg-[#F5A623]">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#1B2C6B]" />
            <span className="font-bold text-[#1B2C6B] text-sm">¿Querés precios mayoristas? Escribinos y te asesoramos</span>
          </div>
          <a href="https://wa.me/5491112345678?text=Hola%2C%20quiero%20información%20sobre%20precios%20mayoristas"
            target="_blank" rel="noopener noreferrer"
            className="shrink-0 bg-[#1B2C6B] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#152354] transition-colors">
            Contactar por WhatsApp →
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <div>
              <p className="text-xl font-black tracking-tight text-white">PARQUELECTRO</p>
              <p className="text-sm font-semibold text-[#2ECC40]">Mayorista</p>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Tu socio en tecnología y electrónica. Distribución mayorista con los mejores precios del mercado y envíos en 24hs al AMBA.
            </p>
            <div className="flex items-center gap-2">
              <a href="https://facebook.com/ParquelectroMayorista" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10 h-9 w-9">
                  <Facebook className="w-4 h-4" />
                </Button>
              </a>
              <a href="https://instagram.com/parquelectro" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10 h-9 w-9">
                  <Instagram className="w-4 h-4" />
                </Button>
              </a>
              <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-[#2ECC40] hover:bg-white/10 h-9 w-9">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">
              Navegación
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/#productos", label: "Productos" },
                { href: "/#categorias", label: "Categorías" },
                { href: "/#mayorista", label: "Precios Mayorista" },
                { href: "/contacto", label: "Contacto" },
                { href: "/carrito", label: "Carrito" },
              ].map(({ href, label }) => (
                <Link key={href} href={href}
                  className="text-sm text-white/60 hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">
              Contacto
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                <span className="text-sm text-white/60">Merlo, Buenos Aires, Argentina</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#2ECC40] shrink-0" />
                <a href="tel:+5491112345678" className="text-sm text-white/60 hover:text-white transition-colors">
                  +54 9 11 1234-5678
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#9B59B6] shrink-0" />
                <a href="mailto:ventas@parquelectro.com.ar" className="text-sm text-white/60 hover:text-white transition-colors">
                  ventas@parquelectro.com.ar
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">
              Novedades
            </h4>
            <p className="text-sm text-white/60">
              Recibí ofertas exclusivas y novedades en tu email.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="tu@email.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#F5A623] focus-visible:ring-[#F5A623]/20" />
              <Button className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#1B2C6B] font-bold shrink-0">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © 2025 Parquelectro Mayorista. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40">Métodos de pago:</span>
            {["Mercado Pago", "Transferencia", "Tarjeta"].map(m => (
              <span key={m} className="text-[10px] font-medium px-2 py-1 bg-white/10 rounded border border-white/10 text-white/50">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
