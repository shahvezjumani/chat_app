import { Button } from "@/components/ui/button"
import AppLayout from "./layout/AppLayout"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
     // Login/Signup page heading
      <h1 className="font-display font-bold text-5xl text-primary">
        Welcome Back
      </h1>

// Accent subheading
      <h2 className="font-accent font-semibold text-2xl text-primary">
        Sign in to continue
      </h2>

// Form labels
      <label className="font-sans font-medium text-sm text-zinc-300">
        Email Address
      </label>

// Input placeholder
      <input
        className="font-sans text-base text-primary placeholder:text-zinc-500"
        placeholder="Enter your email"
      />
      <h1 className="text-6xl font-display font-bold bg-primary-500">
        Main Page Title
      </h1>

// Button text
      <button className="font-sans font-semibold text-base">
        Login
      </button>

// Footer text
      <p className="font-sans font-normal text-sm text-zinc-500">
        © 2025 Your App
      </p>
      // Login/Signup page heading
      <h1 className="font-display font-bold text-5xl text-zinc-100">
        Welcome Back
      </h1>

// Accent subheading
      <h2 className="font-accent font-semibold text-2xl text-primary">
        Sign in to continue
      </h2>

// Form labels
      <label className="font-sans font-medium text-sm text-zinc-300">
        Email Address
      </label>

// Input placeholder
      <input
        className="font-sans text-base text-zinc-100 placeholder:text-zinc-500"
        placeholder="Enter your email"
      />

// Button text
      <button className="font-sans font-semibold text-base">
        Login
      </button>

// Footer text
      <p className="font-sans font-normal text-sm text-zinc-500">
        © 2025 Your App
      </p>


    </div>
  )
}

export default AppLayout(App); 