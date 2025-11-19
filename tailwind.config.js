/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom Color Palette
      colors: {
        // Your main theme colors
        primary: {
          DEFAULT: "rgb(217, 119, 87)", // Terracotta
          light: "rgb(237, 159, 137)",
          dark: "rgb(180, 90, 65)",
          50: "#fef6f3",
          100: "#fdeae3",
          200: "#fbd4c7",
          300: "#f7b5a0",
          400: "#f28d6d",
          500: "rgb(217, 119, 87)", // Main
          600: "#d96841",
          700: "#b5532e",
          800: "#944729",
          900: "#7a3e27",
        },
        // Zinc palette (your base theme)
        zinc: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
      },

      // Font Family

      // Sans fonts
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Body text
        display: ["Outfit", "sans-serif"], // Headings
        mono: ["JetBrains Mono", "monospace"], // Code

        body: ["Inter", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
        code: ["JetBrains Mono", "monospace"],
      },

      // Additional font options

      // Font Sizes with line heights
      fontSize: {
        // Tiny
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px

        // Base
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px

        // Headings
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
        "5xl": ["3rem", { lineHeight: "1" }], // 48px
        "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
        "7xl": ["4.5rem", { lineHeight: "1" }], // 72px
        "8xl": ["6rem", { lineHeight: "1" }], // 96px
        "9xl": ["8rem", { lineHeight: "1" }], // 128px
      },

      // Font Weights
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },

      // Spacing (for consistent margins and padding)
      spacing: {
        128: "32rem",
        144: "36rem",
      },

      // Border Radius
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },

      // Box Shadow
      boxShadow: {
        glow: "0 0 20px rgba(217, 119, 87, 0.3)",
        "glow-lg": "0 0 40px rgba(217, 119, 87, 0.4)",
        zinc: "0 10px 40px rgba(0, 0, 0, 0.3)",
      },

      // Background Images
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(to right, rgb(217, 119, 87), rgb(180, 90, 65))",
        "gradient-zinc":
          "linear-gradient(to bottom right, rgb(39, 39, 42), rgb(24, 24, 27), rgb(9, 9, 11))",
      },

      // Animation
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "slide-left": "slideLeft 0.5s ease-out",
        "slide-right": "slideRight 0.5s ease-out",
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      // Keyframes
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },

      // Backdrop Blur
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
