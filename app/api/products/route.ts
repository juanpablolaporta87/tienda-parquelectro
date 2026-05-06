import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'

export async function GET(request: NextRequest) {
  try {
    // 1. Buscamos el archivo en la nueva ubicación (public)
    const filePath = path.join(process.cwd(), 'public', 'productos.csv');
    
    // 2. Leemos el contenido
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // 3. Lo convertimos a JSON
    const { data } = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true
    });

    console.log("Cantidad de productos encontrados:", data.length);

    // 4. Filtros básicos (opcional por ahora para que funcione)
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      // @ts-ignore
      const product = data.find(p => p.Handle === slug || p.handle === slug || p.slug === slug);
      return NextResponse.json(product ? [product] : []);
    }

    // Retornamos todos los productos de Parquelectro
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Error en API:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}