// The Studio Shivdev waveform mark, redrawn as SVG from the brand logo
// (public/brand/studio-shivdev-logo.png) so it stays sharp at any size.

// [centre x, top, bottom] of each bar, in the original logo's pixel grid.
const BARS: [number, number, number][] = [
  [230, 202, 271],
  [312, 168, 306],
  [395, 99, 375],
  [477, 30, 444],
  [559, 64, 409],
  [641, 99, 375],
  [724, 30, 444],
  [806, 64, 409],
  [888, 168, 306],
  [970, 202, 271],
];
const W = 69;

export function LogoMark({
  className,
  animated = false,
  title,
}: {
  className?: string;
  animated?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox="195 30 810 414"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {BARS.map(([cx, y0, y1], i) => (
        <rect
          key={cx}
          x={cx - W / 2}
          y={y0}
          width={W}
          height={y1 - y0}
          rx={W / 2}
          fill="var(--accent)"
          className={animated ? "wave-bar" : undefined}
          style={animated ? { animationDelay: `${(i % 5) * -0.23}s` } : undefined}
        />
      ))}
    </svg>
  );
}

/** Mark plus the two-line wordmark, as in the brand logo. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-7 w-auto" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.6rem] font-semibold tracking-[0.35em]">
          STUDIO
        </span>
        <span className="text-lg font-black tracking-tight">SHIVDEV</span>
      </span>
    </span>
  );
}
