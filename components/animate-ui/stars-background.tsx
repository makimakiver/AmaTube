'use client';

import * as React from 'react';
import {
  type HTMLMotionProps,
  motion,
  type SpringOptions,
  type Transition,
  useMotionValue,
  useSpring,
} from 'motion/react';

import { cn } from '../../lib/utils';

interface StarLayerProps extends HTMLMotionProps<'div'> {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
}

const generateStars = (count: number, starColor: string) => {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(', ');
};

const StarLayer = React.forwardRef<HTMLDivElement, StarLayerProps>(
  (
    {
      count = 1000,
      size = 1,
      transition = { repeat: Infinity, duration: 50, ease: 'linear' },
      starColor = '#edf2f4',
      className,
      ...props
    },
    ref,
  ) => {
    const [boxShadow, setBoxShadow] = React.useState<string>('');

    React.useEffect(() => {
      setBoxShadow(generateStars(count, starColor));
    }, [count, starColor]);

    return (
      <motion.div
        ref={ref}
        animate={{ y: [0, -2000] }}
        transition={transition}
        className={cn('absolute top-0 left-0 w-full h-[2000px]', className)}
        {...props}
      >
        <div
          className="absolute bg-transparent rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            boxShadow: boxShadow,
          }}
        />
        <div
          className="absolute bg-transparent rounded-full top-[2000px]"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            boxShadow: boxShadow,
          }}
        />
      </motion.div>
    );
  },
);

StarLayer.displayName = 'StarLayer';

interface StarsBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
}

const StarsBackground = React.forwardRef<HTMLDivElement, StarsBackgroundProps>(
  (
    {
      children,
      className,
      factor = 0.05,
      speed = 50,
      transition = { stiffness: 50, damping: 20 },
      starColor = '#edf2f4',
      ...props
    },
    ref,
  ) => {
    const offsetX = useMotionValue(1);
    const offsetY = useMotionValue(1);

    const springX = useSpring(offsetX, transition);
    const springY = useSpring(offsetY, transition);

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const newOffsetX = -(e.clientX - centerX) * factor;
        const newOffsetY = -(e.clientY - centerY) * factor;
        offsetX.set(newOffsetX);
        offsetY.set(newOffsetY);
      },
      [offsetX, offsetY, factor],
    );

    return (
      <div
        ref={ref}
        className={cn(
          'relative size-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)]',
          className,
        )}
        onMouseMove={handleMouseMove}
        {...props}
      >
        <motion.div style={{ x: springX, y: springY }}>
          <StarLayer
            count={1000}
            size={1}
            transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
            starColor={starColor}
          />
          <StarLayer
            count={400}
            size={2}
            transition={{
              repeat: Infinity,
              duration: speed * 2,
              ease: 'linear',
            }}
            starColor={starColor}
          />
          <StarLayer
            count={200}
            size={3}
            transition={{
              repeat: Infinity,
              duration: speed * 3,
              ease: 'linear',
            }}
            starColor={starColor}
          />
        </motion.div>
        {children}
      </div>
    );
  },
);

StarsBackground.displayName = 'StarsBackground';

export {
  StarLayer,
  StarsBackground,
  type StarLayerProps,
  type StarsBackgroundProps,
};
