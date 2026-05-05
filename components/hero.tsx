"use client"

import Image from "next/image"
import Link from "next/link" // [1] Importamos Link
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Truck } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] translate-y-1/2" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #1e3a8a 1px, transparent 1px), linear-gradient(to bottom, #1e3a8a 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Distribuidor Autorizado</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                <span className="text-neon-blue neon-glow-blue">PARQUELECTRO:</span>
                <br />
                <span className="text-neon-lime neon-glow-lime">TU SOCIO MAYORISTA</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Innovación y Precio por Volumen. Audio profesional, accesorios premium y tecnología de vanguardia para tu negocio.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* [2] Envolvemos el botón con Link */}
              <Link href="/products" className="contents">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold px-8 neon-border-purple w-full sm:w-auto"
                >
                  Ver Catálogo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Button 
                size="lg" 
                variant="outline" 
                className="border-secondary/50 text-secondary hover:bg-secondary/10 font-semibold px-8"
              >
                Solicitar Cotización
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Envío Express</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Garantía Total</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Envío Gratis +$500</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-[80px]" />
              <div className="absolute inset-8 border-2 border-primary/20 rounded-full animate-pulse" />
              <div className="absolute inset-16 border border-secondary/20 rounded-full animate-pulse delay-500" />
              
              <div className="relative z-10 p-4">
                <div className="relative bg-white rounded-2xl p-4 shadow-2xl shadow-primary/10 border border-border">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0796/0703/8180/files/WhatsAppImage2026-04-17at10.22.25.jpg?v=1776432270"
                    alt="TV Box TIME 4K"
                    width={500}
                    height={500}
                    className="object-contain w-full h-auto rounded-xl"
                    priority
                  />
                  <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-primary/40 rounded-tl-xl" />
                  <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-secondary/40 rounded-tr-xl" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-secondary/40 rounded-bl-xl" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-primary/40 rounded-br-xl" />
                </div>
              </div>

              <div className="absolute bottom-8 right-0 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold text-lg">-25%</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Precio x10+</p>
                    <p className="text-lg font-bold text-accent">Descuento Mayorista</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
