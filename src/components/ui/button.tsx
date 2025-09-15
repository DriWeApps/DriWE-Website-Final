import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "bg-transparent hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",

        // Glass variants
        glass:
          "bg-white/10 backdrop-blur-sm border border-white/20 text-white shadow-lg hover:bg-white/20",
        frosted:
          "bg-white/20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 shadow-md text-white",
        blurred:
          "bg-white/30 backdrop-blur-2xl border border-gray-300/10 shadow-lg text-gray-900",
        darkGlass:
          "bg-black/40 backdrop-blur-lg border border-zinc-700/40 text-white shadow-lg",
        whiteGlass:
          "bg-white/50 backdrop-blur-md border border-white/40 text-black shadow-md",
        gradientGlass:
          "bg-gradient-to-br from-purple-300/20 via-white/10 to-cyan-300/10 backdrop-blur-xl border border-white/10 shadow-lg text-white",

        // Additional special variants
        transparent:
          "bg-transparent border-2 border-transparent hover:border-primary hover:bg-primary/10 text-primary",
        liquid:
          "bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg hover:brightness-110 transition",
        ghosted:
          "bg-transparent hover:bg-gray-100/20 dark:hover:bg-gray-900/20 text-current",
        neon:
          "bg-black text-neon-green shadow-neon glow-neon hover:glow-neon-bright",
        glassSoft:
          "bg-white/5 backdrop-blur-sm border border-white/10 text-white shadow-sm",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
