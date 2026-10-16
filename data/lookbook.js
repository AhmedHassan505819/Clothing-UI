// Content for <LookbookFeature />. Everything you see in that section is edited here.
//
// Each beat is one "stop" while the user scrolls. The photo glides between them.
//   view     where the camera looks: x / y are 0-1 positions on the photo (0,0 = top-left),
//            scale is the zoom (1 = whole photo). Keep scale under ~2 so the image stays sharp
//            (the source photo is 1024px wide; a larger original lets you push it further).
//   hotspot  optional dot on the photo, same 0-1 coordinates. `side` is which way its card opens:
//            'top' | 'bottom' (centred on the dot, always fits) or 'left' | 'right'.
//   item     name + price shown on the card and next to the button.
//
// NOTE: names, copy, prices and links below are placeholders. Replace them with the real ones.

export const lookbook = {
  eyebrow: 'Antythesis — Lookbook 01',
  image: {
    src: '/images/lookbook/look-01.webp',
    width: 1024,
    height: 1536,
    alt: 'Model in a black sweater, wide washed-black cargo jeans with long leg zips and heavy black boots, standing against a concrete wall split by a diagonal of sunlight'
  },
  beats: [
    {
      id: 'look',
      label: 'The look',
      title: 'Black out, wide open.',
      text: 'Washed black cargo denim in an oversized cut. It falls straight from the hip and pools over the boot.',
      hint: 'Scroll to explore',
      view: { x: 0.5, y: 0.5, scale: 1 },
      item: { name: 'Wide Zip Cargo Denim', price: '$260' },
      cta: { label: 'SHOP THE LOOK', href: '#' }
    },
    {
      id: 'eyewear',
      label: 'Detail 01 — Eyewear',
      title: 'Matte frames.',
      text: 'A slim acetate frame with dark lenses. Low profile, nothing extra.',
      view: { x: 0.52, y: 0.1, scale: 2 },
      hotspot: { x: 0.527, y: 0.088, side: 'top' },
      item: { name: 'Matte Acetate Sunglasses', price: '$140' },
      cta: { label: 'VIEW ITEM', href: '#' }
    },
    {
      id: 'pocket',
      label: 'Detail 02 — Pocket',
      title: 'Cargo, enlarged.',
      text: 'Oversized flap pockets sit low on the leg and open on a zip, deep enough to actually carry things.',
      view: { x: 0.6, y: 0.46, scale: 1.85 },
      hotspot: { x: 0.6, y: 0.456, side: 'top' },
      item: { name: 'Wide Zip Cargo Denim', price: '$260' },
      cta: { label: 'VIEW ITEM', href: '#' }
    },
    {
      id: 'zip',
      label: 'Detail 03 — Zip',
      title: 'Zipped to the hem.',
      text: 'A full-length zip runs down each leg, so the width opens or closes with how you wear it.',
      view: { x: 0.585, y: 0.66, scale: 1.9 },
      hotspot: { x: 0.586, y: 0.651, side: 'bottom' },
      item: { name: 'Wide Zip Cargo Denim', price: '$260' },
      cta: { label: 'VIEW ITEM', href: '#' }
    },
    {
      id: 'boots',
      label: 'Detail 04 — Footwear',
      title: 'Heavy ground.',
      text: 'Chunky black leather on a lug sole. It anchors all the volume above it.',
      view: { x: 0.5, y: 0.93, scale: 1.85 },
      hotspot: { x: 0.53, y: 0.945, side: 'top' },
      item: { name: 'Lug-Sole Leather Boots', price: '$320' },
      cta: { label: 'VIEW ITEM', href: '#' }
    }
  ]
};
