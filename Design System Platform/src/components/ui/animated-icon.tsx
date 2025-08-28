import React from 'react';
import { motion } from 'motion/react';

interface AnimatedIconProps {
  children: React.ReactNode;
  variant?: 'hover' | 'tap' | 'float' | 'rotate' | 'bounce' | 'pulse' | 'swing';
  delay?: number;
  disabled?: boolean;
  className?: string;
}

const animationVariants = {
  hover: {
    rest: { 
      scale: 1, 
      rotate: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  },
  tap: {
    rest: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: { 
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 20
      }
    }
  },
  float: {
    rest: { 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      y: -8,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1.5
      }
    }
  },
  rotate: {
    rest: { 
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    hover: { 
      rotate: 180,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  },
  bounce: {
    rest: { 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    hover: { 
      scale: [1, 1.2, 1],
      y: [0, -4, 0],
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        repeat: 2,
        duration: 0.6
      }
    }
  },
  pulse: {
    rest: { 
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    hover: { 
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "easeInOut"
      }
    }
  },
  swing: {
    rest: { 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    hover: { 
      rotate: [-10, 10, -10, 10, 0],
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        duration: 0.8
      }
    }
  }
};

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  children,
  variant = 'hover',
  delay = 0,
  disabled = false,
  className = ''
}) => {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const variants = animationVariants[variant];

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      variants={variants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={{
        delay,
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
    >
      {children}
    </motion.div>
  );
};

// Specialized animated button wrapper
export const AnimatedButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const baseClass = variant === 'primary' 
    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
    : variant === 'secondary'
    ? 'bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 text-gray-700'
    : 'bg-transparent text-gray-600 hover:text-gray-900';

  return (
    <motion.button
      className={`${baseClass} font-medium px-6 py-3 rounded-2xl shadow-lg transition-all duration-200 ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25
        }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: {
          type: "spring",
          stiffness: 600,
          damping: 20
        }
      }}
    >
      {children}
    </motion.button>
  );
};

// Staggered container for animating multiple icons
export const StaggeredIconContainer: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
}> = ({ children, staggerDelay = 0.1 }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};