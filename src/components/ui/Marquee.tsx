import { ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  speed?: number
  pauseOnHover?: boolean
  reverse?: boolean
  className?: string
}

export function Marquee({ 
  children, 
  speed = 30, 
  pauseOnHover = true,
  reverse = false,
  className = ''
}: MarqueeProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div 
        className={`flex gap-4 ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speed}s linear infinite`,
          width: 'fit-content'
        }}
      >
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
