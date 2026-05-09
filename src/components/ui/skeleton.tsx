import * as React from "react"

import { cn } from "@/src/lib/utils"

const Skeleton = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("animate-pulse rounded-none bg-muted", className)}
            {...props}
        />
    )
})
Skeleton.displayName = "Skeleton"

export { Skeleton }

