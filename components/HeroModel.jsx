'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// The model photo. Served straight from /public (no on-demand image optimiser, which is what made the
// first load slow) and kept invisible until it has fully loaded, so no empty box or shadow flashes in.
export default function HeroModel({ src, width, height, alt }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth > 0) setReady(true); // already cached / loaded before hydration
  }, []);

  return (
    <>
      <Image
        ref={ref}
        src={src}
        width={width}
        height={height}
        alt={alt}
        priority
        unoptimized
        sizes="(max-width: 860px) 56vw, 27vw"
        className={ready ? 'model-img is-ready' : 'model-img'}
        onLoad={() => setReady(true)}
      />
      <noscript>
        <style>{'.model-img{opacity:1!important}'}</style>
      </noscript>
    </>
  );
}