import { HTMLMotionProps } from 'framer-motion';

export const AUTH_HERO_ANIMATION = (
  direction: 'left' | 'right',
): HTMLMotionProps<'div'> => ({
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 0.8,
    transition: {
      delay: 0.4,
      duration: 0.4,
    },
  },
  exit: {
    x: `calc((100vw - 100%) * ${direction === 'left' ? 1 : -1})`,
    opacity: 0,
  },
  transition: {
    x: {
      type: 'spring',
      mass: 0.5,
    },
    opacity: {
      delay: 0.5,
      duration: 0.35,
    },
  },
});

export const AUTH_CONTAINER_ANIMATION: HTMLMotionProps<'div'> = {
  animate: {
    transition: { duration: 1.3 },
    transitionEnd: {
      position: 'static',
    },
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
};

export const AUTH_MAIN_ANIMATION = (
  direction: 'left' | 'right',
): HTMLMotionProps<'div'> => ({
  initial: { x: direction === 'left' ? 100 : -100 },
  animate: { x: 0 },
  exit: { scale: 0.5, opacity: 0 },
  transition: { opacity: { duration: 0.25 } },
});
