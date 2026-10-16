'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { lookbook } from '../data/lookbook';

import './LookbookFeature.css';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const mix = (a, b, t) => a + (b - a) * t;
const pad = n => String(n).padStart(2, '0');

// Within one step between beats the camera holds still at each end and only moves in the middle.
const ease = f => {
  const x = clamp((f - 0.22) / 0.56, 0, 1);
  return x * x * (3 - 2 * x);
};

/**
 * Pinned scroll section. The section stays on screen while the user scrolls through it; the photo
 * glides between the stops in data/lookbook.js and the copy changes with it.
 *
 * Props (all optional):
 *   id    anchor id, default "lookbook"
 *   data  override the content, defaults to data/lookbook.js
 */
export default function LookbookFeature({ id = 'lookbook', data = lookbook }) {
  const { eyebrow, image, beats } = data;
  const count = beats.length;
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const activeRef = useRef(0);
  const goToRef = useRef(() => {});
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const layer = layerRef.current;
    if (!track || !stage || !layer || count < 2) return undefined;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let target = 0;
    let current = 0;
    let raf = 0;
    let last = 0;

    // Scroll position -> a number from 0 to count-1 (which beat we are at, with decimals in between).
    const readTarget = () => {
      const rect = track.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      const p = clamp(-rect.top / span, 0, 1);
      // short rests at the very start and end so the first and last beat can be read
      target = clamp((p - 0.03) / 0.89, 0, 1) * (count - 1);
    };

    const apply = t => {
      const seg = Math.min(Math.floor(t), count - 2);
      const a = beats[seg].view;
      const b = beats[seg + 1].view;
      const e = ease(t - seg);
      const s = mix(a.scale, b.scale, e);
      const fx = mix(a.x, b.x, e);
      const fy = mix(a.y, b.y, e);
      // put the focus point in the middle of the frame, but never show empty space past the photo
      const tx = clamp(0.5 - s * fx, 1 - s, 0);
      const ty = clamp(0.5 - s * fy, 1 - s, 0);
      layer.style.transform = `translate3d(${(tx * 100).toFixed(3)}%, ${(ty * 100).toFixed(3)}%, 0) scale(${s.toFixed(4)})`;
      layer.style.setProperty('--s', s.toFixed(4));
      stage.style.setProperty('--p', (t / (count - 1)).toFixed(4));
      const index = Math.round(clamp(t, 0, count - 1));
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }
    };

    const frame = now => {
      raf = 0;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const gap = target - current;
      current = reduce || Math.abs(gap) < 0.0008 ? target : current + gap * (1 - Math.exp(-dt / 0.11));
      apply(current);
      if (current !== target) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onScroll = () => {
      readTarget();
      wake();
    };

    goToRef.current = index => {
      const rect = track.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      const u = clamp(index / (count - 1), 0, 1);
      const p = 0.03 + u * 0.89;
      window.scrollTo({ top: rect.top + window.scrollY + span * p, behavior: reduce ? 'auto' : 'smooth' });
    };

    readTarget();
    current = target;
    apply(current);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [beats, count]);

  const goTo = index => goToRef.current(index);

  return (
    <section id={id} className="lookbook" aria-labelledby={`${id}-heading`} style={{ '--count': count }}>
      <h2 id={`${id}-heading`} className="lookbook__sr">
        Lookbook
      </h2>
      <div className="lookbook__track" ref={trackRef}>
        <div className="lookbook__stage" ref={stageRef}>
          <div className="lookbook__beam" aria-hidden="true" />
          <div className="lookbook__grid">
            <div className="lookbook__media">
              <div className="lookbook__frame">
                <div className="lookbook__layer" ref={layerRef}>
                  <img
                    className="lookbook__img"
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    decoding="async"
                    draggable="false"
                  />
                  {beats.map((beat, index) =>
                    beat.hotspot ? (
                      <button
                        key={beat.id}
                        type="button"
                        className="lookbook__dot"
                        data-side={beat.hotspot.side || 'right'}
                        data-active={index === active ? '' : undefined}
                        data-overview={active === 0 ? '' : undefined}
                        style={{ left: `${beat.hotspot.x * 100}%`, top: `${beat.hotspot.y * 100}%` }}
                        aria-label={`${beat.item?.name ?? beat.title}${beat.item?.price ? `, ${beat.item.price}` : ''}`}
                        aria-current={index === active ? 'true' : undefined}
                        onClick={() => goTo(index)}
                      >
                        <span className="lookbook__ui">
                          <span className="lookbook__ring" />
                          <span className="lookbook__core" />
                          {beat.item && (
                            <span className="lookbook__card">
                              <span className="lookbook__card-name">{beat.item.name}</span>
                              <span className="lookbook__card-price">{beat.item.price}</span>
                            </span>
                          )}
                        </span>
                      </button>
                    ) : null
                  )}
                </div>
              </div>
            </div>

            <div className="lookbook__copy">
              <p className="lookbook__eyebrow">{eyebrow}</p>

              <div className="lookbook__beats">
                {beats.map((beat, index) => (
                  <article
                    key={beat.id}
                    className="lookbook__beat"
                    data-state={index === active ? 'active' : index < active ? 'past' : 'next'}
                    aria-hidden={index === active ? undefined : true}
                    inert={index === active ? undefined : true}
                  >
                    <p className="lookbook__label">{beat.label}</p>
                    <h3 className="lookbook__title">{beat.title}</h3>
                    <p className="lookbook__text">{beat.text}</p>
                    {beat.item && (
                      <div className="lookbook__buy">
                        {beat.cta && (
                          <Link className="lookbook__cta" href={beat.cta.href}>
                            {beat.cta.label}
                            <svg viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                              <path d="M0 5h19M15 1l4 4-4 4" />
                            </svg>
                          </Link>
                        )}
                        <span className="lookbook__price">
                          <span>{beat.item.name}</span>
                          <span>{beat.item.price}</span>
                        </span>
                      </div>
                    )}
                    {beat.hint && (
                      <p className="lookbook__hint">
                        <span className="lookbook__hint-line" aria-hidden="true" />
                        {beat.hint}
                      </p>
                    )}
                  </article>
                ))}
              </div>

              <div className="lookbook__progress">
                <ol className="lookbook__ticks">
                  {beats.map((beat, index) => (
                    <li key={beat.id}>
                      <button
                        type="button"
                        className="lookbook__tick"
                        data-active={index === active ? '' : undefined}
                        aria-label={`Go to: ${beat.label}`}
                        aria-current={index === active ? 'step' : undefined}
                        onClick={() => goTo(index)}
                      />
                    </li>
                  ))}
                </ol>
                <p className="lookbook__count" aria-hidden="true">
                  {pad(active + 1)} / {pad(count)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
