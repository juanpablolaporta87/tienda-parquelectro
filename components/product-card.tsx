"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Eye } from "lucide-react"

interface ProductCardProps {
  name: string
  image: string
  unitPrice: number
  bulkPrice: number
  category: string
  isNew?: boolean
}

export function ProductCard({ 
  name, 
  image, 
  unitPrice, 
  bulkPrice, 
  category,
  isNew = false 
}: ProductCardProps) {
  const discount = Math.round((1 - bulkPrice / unitPrice) * 100)

  return (
    <Card className="group relative overflow-hidden bg-card border-border/50 hover:border-primary/50 transition-all duration-300 product-card-glow">
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground rounded">
            Nuevo
          </span>
        )}
        <span className="px-2 py-1 text-[10px] font-medium bg-accent/20 text-accent rounded">
          -{discount}% x10+
        </span>
      </div>

      {/* Quick View Button */}
      <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20 hover:border-primary/50">
        <Eye className="w-4 h-4 text-muted-foreground" />
      </button>

      <CardContent className="p-4">
        {/* Image Container - white background to blend with product images */}
        <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-white">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Category */}
        <p className="text-[10px] font-medium uppercase tracking-wider text-primary mb-2">
          {category}
        </p>

        {/* Name */}
        <h3 className="font-semibold text-card-foreground line-clamp-2 min-h-[2.5rem] mb-3 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Precio Unitario:</span>
            <span className="text-sm font-semibold text-foreground">
              ${unitPrice.toLocaleString('es-AR')}
            </span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-accent/10 border border-accent/30">
            <span className="text-xs font-semibold text-accent">Precio x10+:</span>
            <span className="text-base font-bold text-accent">
              ${bulkPrice.toLocaleString('es-AR')}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium group/btn"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
