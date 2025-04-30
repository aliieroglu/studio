
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: // Represents "Ödendi" (Paid) - using accent color
          "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
        secondary: // Represents "Kısmen Ödendi" (Partially Paid) - using secondary colors
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: // Represents "Ödenmedi" (Not Paid) - using destructive colors
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Added success variant, using primary color as a placeholder for a green 'success' color
         success: // You might want to define specific HSL vars for success (e.g., green)
           "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

