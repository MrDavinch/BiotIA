import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['PT Sans', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        code: ['Source Code Pro', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        // Atlas Theme Colors
        atlas: {
          background: 'var(--atlas-bg-primary)',
          'background-secondary': 'var(--atlas-bg-secondary)',
          primary: 'var(--atlas-color-primary)',
          'primary-foreground': 'var(--atlas-color-primary-fg)',
          accent: 'var(--atlas-color-accent)',
          'accent-foreground': 'var(--atlas-color-accent-fg)',
          muted: 'var(--atlas-color-muted)',
          'muted-foreground': 'var(--atlas-color-muted-fg)',
          border: 'var(--atlas-border)',
          'border-hover': 'var(--atlas-border-hover)',
          shadow: 'var(--atlas-shadow)',
          'shadow-hover': 'var(--atlas-shadow-hover)',
          overlay: 'var(--atlas-overlay)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionDuration: {
        'atlas-fast': 'var(--atlas-transition-fast)',
        'atlas': 'var(--atlas-transition-duration)',
        'atlas-slow': 'var(--atlas-transition-slow)',
      },
      transitionTimingFunction: {
        'atlas': 'var(--atlas-transition-timing)',
      },
      boxShadow: {
        'atlas': '0 4px 6px -1px var(--atlas-shadow), 0 2px 4px -1px var(--atlas-shadow)',
        'atlas-hover': '0 10px 15px -3px var(--atlas-shadow-hover), 0 4px 6px -2px var(--atlas-shadow-hover)',
        'atlas-card': '0 2px 4px var(--atlas-shadow)',
        'atlas-card-hover': '0 8px 16px var(--atlas-shadow-hover)',
      },
      backgroundImage: {
        'atlas-gradient-primary': 'var(--atlas-gradient-primary)',
        'atlas-gradient-background': 'var(--atlas-gradient-background)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'atlas-fade-in': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        'atlas-slide-in': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'atlas-scale-in': {
          from: {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'atlas-shimmer': {
          '0%': {
            left: '-100%',
          },
          '100%': {
            left: '100%',
          },
        },
        'atlas-pulse': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
        'atlas-bounce': {
          '0%, 20%, 53%, 80%, 100%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '40%, 43%': {
            transform: 'translate3d(0, -8px, 0)',
          },
          '70%': {
            transform: 'translate3d(0, -4px, 0)',
          },
          '90%': {
            transform: 'translate3d(0, -2px, 0)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'atlas-fade-in': 'atlas-fade-in var(--atlas-transition-duration) var(--atlas-transition-timing)',
        'atlas-slide-in': 'atlas-slide-in var(--atlas-transition-duration) var(--atlas-transition-timing)',
        'atlas-scale-in': 'atlas-scale-in var(--atlas-transition-fast) var(--atlas-transition-timing)',
        'atlas-shimmer': 'atlas-shimmer 2s infinite',
        'atlas-pulse': 'atlas-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'atlas-bounce': 'atlas-bounce 1s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
