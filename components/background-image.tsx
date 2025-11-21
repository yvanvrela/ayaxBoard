'use client'

import Image from 'next/image'

export function BackgroundImage() {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src="/ayax-banner.png"
        alt="Juegos Funcionales AYAX"
        fill
        className="object-cover"
        priority
        quality={90}
        sizes="100vw"
      />
      {/* Overlay para mejorar legibilidad del contenido */}
      <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
    </div>
  )
}

