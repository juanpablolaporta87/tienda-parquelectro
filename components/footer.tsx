"use client"

import Link from "next/link"
import { Headphones, Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer id="contacto" className="relative border-t border-border bg-card">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-transparent" />
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Headphones className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-neon-blue">
                  PARQUELECTRO
                </span>
                <span className="text-xs font-medium text-neon-lime -mt-1">
                  MAYORISTA
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tu socio de confianza en tecnología de audio y electrónica. Distribución mayorista con los mejores precios del mercado.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-accent/10 hover:text-accent">
                <MessageCircle className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Enlaces Rápidos
            </h4>
            <nav className="flex flex-col gap-2">
              {["Productos", "Categorías", "Ofertas", "Programa Mayorista", "Nosotros"].map((link) => (
                <Link 
                  key={link}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Contacto
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Av. Principal 1234, Zona Comercial, Ciudad
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm text-muted-foreground">
                  ventas@parquelectro.com
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground">
              Suscríbete para recibir ofertas exclusivas y novedades.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="tu@email.com"
                className="bg-input border-border focus:border-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 shrink-0">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Parquelectro Mayorista. Todos los derechos reservados.
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">Métodos de Pago:</span>
              <div className="flex items-center gap-2">
                {["Visa", "MC", "AMEX", "PayPal"].map((method) => (
                  <div 
                    key={method}
                    className="px-2 py-1 text-[10px] font-medium bg-muted/50 rounded border border-border text-muted-foreground"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
