'use client';

export default function BackgroundCircles() {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
      {[
        { size: 330, color: 'border-gray-400/30 dark:border-gray-600/30', animate: 'animate-ping' },
        { size: 400, color: 'border-red-400/40 dark:border-red-500/40', animate: 'animate-pulse' },
        { size: 500, color: 'border-orange-400/40 dark:border-orange-500/40', animate: 'animate-ping' },
        { size: 650, color: 'border-yellow-400/30 dark:border-yellow-500/30', animate: 'animate-pulse' },
        { size: 700, color: 'border-green-500/20 dark:border-green-400/20', animate: 'animate-ping' },
        { size: 850, color: 'border-gray-300/10 dark:border-white/10', animate: 'animate-pulse' },
      ].map(({ size, color, animate }, i) => (
        <div
          key={i}
          className={`absolute rounded-full border ${color} ${animate} blur-[2px] opacity-70`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${4 + i * 0.5}s`,
            animationDelay: `${i * 0.2}s`,
            borderStyle: 'solid',
            borderWidth: `${1 + i * 0.5}px`,
          }}
        />
      ))}
      <div className="absolute w-[900px] h-[900px] rounded-full border border-gray-300/5 dark:border-white/5 blur-[1px]" />
    </div>
  );
}