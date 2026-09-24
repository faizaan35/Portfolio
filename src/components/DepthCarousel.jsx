import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * Depth Carousel (GSAP Engine)
 * Adapted with 'renderCard' prop to display technical project dossiers
 * with full 3D Z-depth, spread, tilt, pointer dragging, wheel scrolling, and keyboard control.
 */
export default function DepthCarousel({
  items = [],
  renderCard,
  activeIndex,
  onChange,
  depth = 220,
  spread = 70,
  tilt = 12,
  tiltDirection = 'right',
  perspective = 1400,
  visibleCards = 3,
  falloff = 0.18,
  blur = 2,
  autoplay = false,
  autoplayInterval = 4000,
  loop = true,
  duration = 700,
  ease = 'power3.out',
  cardWidth = '100%',
  cardHeight = 490,
  showControls = false,
  showIndicators = false,
  className = '',
}) {
  const [internalActive, setInternalActive] = useState(0);
  const isControlled = typeof activeIndex === 'number';
  const active = isControlled ? activeIndex : internalActive;

  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const dragRef = useRef({ startX: 0, isDragging: false, diff: 0 });
  const wheelLockRef = useRef(false);

  const total = items.length;

  const setActiveIndex = useCallback(
    (newIndex) => {
      let next = newIndex;
      if (loop) {
        next = ((newIndex % total) + total) % total;
      } else {
        next = Math.max(0, Math.min(newIndex, total - 1));
      }

      if (!isControlled) {
        setInternalActive(next);
      }
      if (onChange) {
        onChange(next);
      }
    },
    [loop, total, isControlled, onChange]
  );

  const prev = useCallback(() => setActiveIndex(active - 1), [active, setActiveIndex]);
  const next = useCallback(() => setActiveIndex(active + 1), [active, setActiveIndex]);

  // Calculate shortest path loop offset
  const getOffset = useCallback(
    (index) => {
      let diff = index - active;
      if (loop && total > 1) {
        while (diff > total / 2) diff -= total;
        while (diff < -total / 2) diff += total;
      }
      return diff;
    },
    [active, loop, total]
  );

  // GSAP 3D depth, spread, tilt, opacity and blur calculation
  useEffect(() => {
    if (!cardsRef.current.length || !gsap) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animDuration = prefersReducedMotion ? 0 : duration / 1000;
    const tiltMultiplier = tiltDirection === 'right' ? -1 : 1;

    cardsRef.current.forEach((el, index) => {
      if (!el) return;

      const offset = getOffset(index);
      const absOffset = Math.abs(offset);
      const isVisible = absOffset <= visibleCards;

      if (!isVisible) {
        gsap.to(el, {
          opacity: 0,
          pointerEvents: 'none',
          duration: animDuration,
          ease: ease,
          overwrite: 'auto',
        });
        return;
      }

      const xPos = offset * spread;
      const zPos = -absOffset * depth;
      const rotY = offset * tilt * tiltMultiplier;
      const cardOpacity = Math.max(0, 1 - absOffset * falloff);
      const blurAmount = absOffset > 0 ? Math.min(absOffset * blur, 8) : 0;
      const zIndex = 100 - Math.round(absOffset * 10);

      gsap.to(el, {
        x: xPos,
        y: 0,
        z: zPos,
        rotationY: rotY,
        opacity: cardOpacity,
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'blur(0px)',
        zIndex: zIndex,
        pointerEvents: offset === 0 ? 'auto' : 'auto',
        duration: animDuration,
        ease: ease,
        overwrite: 'auto',
      });
    });
  }, [
    active,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    getOffset,
  ]);

  // Pointer drag interaction
  const handlePointerDown = (e) => {
    dragRef.current = {
      startX: e.clientX || (e.touches && e.touches[0].clientX) || 0,
      isDragging: true,
      diff: 0,
    };
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragRef.current.diff = currentX - dragRef.current.startX;
  };

  const handlePointerUp = () => {
    if (!dragRef.current.isDragging) return;
    const { diff } = dragRef.current;
    dragRef.current.isDragging = false;

    const threshold = 40;
    if (diff < -threshold) {
      next();
    } else if (diff > threshold) {
      prev();
    }
  };

  // Mouse wheel handling with lock throttle
  const handleWheel = (e) => {
    if (wheelLockRef.current) return;
    if (Math.abs(e.deltaX) > 30 || Math.abs(e.deltaY) > 30) {
      wheelLockRef.current = true;
      if (e.deltaX > 0 || e.deltaY > 0) {
        next();
      } else {
        prev();
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 380);
    }
  };

  // Keyboard arrow navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prev();
    } else if (e.key === 'ArrowRight') {
      next();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`depth-carousel-container ${className}`}
      style={{ perspective: `${perspective}px` }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        className="depth-carousel-stage"
        style={{
          width: typeof cardWidth === 'number' ? `${cardWidth}px` : cardWidth,
          height: typeof cardHeight === 'number' ? `${cardHeight}px` : `${cardHeight}px`,
        }}
      >
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <div
              key={item.id || index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`depth-carousel-card ${isActive ? 'is-active' : 'is-inactive'}`}
              style={{
                width: typeof cardWidth === 'number' ? `${cardWidth}px` : cardWidth,
                height: typeof cardHeight === 'number' ? `${cardHeight}px` : `${cardHeight}px`,
              }}
              onClick={() => {
                if (!isActive) setActiveIndex(index);
              }}
            >
              {renderCard ? (
                renderCard(item, { isActive, index })
              ) : (
                <div className="w-full h-full bg-paper-elevated p-6 rounded hairline-border">
                  {item.title}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
