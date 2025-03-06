"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    color?: string
  }
>(({ className, value, color = "orange-500", ...props }, ref) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Extract color name without the shade
  const colorName = color.split("-")[0] || "orange"

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-gray-100", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 transition-all duration-700 ease-out"
        style={{
          transform: `translateX(-${100 - (mounted ? value || 0 : 0)}%)`,
          backgroundColor: mounted ? undefined : "#e5e7eb",
          boxShadow: mounted ? `0 0 8px rgba(0, 0, 0, 0.1)` : "none",
          background: mounted
            ? `linear-gradient(90deg, var(--${colorName}-gradient-start) 0%, var(--${colorName}-gradient-end) 100%)`
            : "#e5e7eb",
        }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

