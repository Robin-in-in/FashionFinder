import type { Config } from 'tailwindcss';

export default {
  darkMode: ["class"], // Keeps the dark mode feature based on a "class"
  content: ["./web/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"], // Includes all relevant files
  theme: {
    extend: {
      colors: {
        // Define base color variables for reuse
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Primary color theme with custom dark brown foreground
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(36, 33%, 20%)", // Dark brown foreground
        },

        // Secondary color theme with custom dark brown foreground
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(36, 33%, 20%)", // Dark brown foreground
        },

        // Destructive color theme for errors, etc.
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(0, 60%, 30%)", // Dark red foreground
        },

        // Muted color theme with readable brown foreground
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(36, 33%, 35%)", // Slightly lighter brown for muted text
        },

        // Accent color theme
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(36, 33%, 20%)", // Consistent dark brown for accent text
        },

        // Popover colors
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(36, 33%, 20%)", // Dark brown for popovers
        },

        // Card component colors
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(36, 33%, 20%)", // Dark brown for card text
        },
      },

      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
