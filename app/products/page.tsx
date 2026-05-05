import Link from 'next/link';

export default function ProductsPage() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Catálogo de Parquelectro</h1>
      <p>Próximamente verás aquí todos nuestros productos de electrónica.</p>
      <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        Volver al Inicio
      </Link>
    </div>
  );
}
