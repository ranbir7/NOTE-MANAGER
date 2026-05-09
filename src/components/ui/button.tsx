'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/src/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-none text-xs font-semibold tracking-widest uppercase transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/80",
                outline:
                    "border border-border bg-transparent hover:bg-muted hover:text-foreground",
                destructive:
                    "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-muted hover:text-foreground",
                link: "text-primary underline underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 gap-1.5 px-6",
                sm: "h-9 gap-1 px-4",
                xs: "h-7 gap-1 px-3",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

type ButtonProps = React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: ButtonProps) {
    const Comp: React.ElementType = asChild ? Slot : "button"
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }


