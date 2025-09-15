import * as React from "react"
import { cn } from "@/lib/utils"

type CardVariant =
  | "solid"
  | "glass"
  | "frosted"
  | "blurred"
  | "darkGlass"
  | "whiteGlass"
  | "gradientGlass"

interface CardProps extends React.ComponentProps<"div"> {
  variant?: CardVariant
}

function Card({ className, variant = "solid", ...props }: CardProps) {
  let variantClass = ""
  switch (variant) {
    case "glass":
      variantClass =
        "bg-white/10 backdrop-blur-[8px] border border-white/20 shadow-lg"
      break
    case "frosted":
      variantClass =
        "bg-white/20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 shadow-md"
      break
    case "blurred":
      variantClass =
        "bg-white/30 backdrop-blur-2xl border border-gray-300/10 shadow-lg"
      break
    case "darkGlass":
      variantClass =
        "bg-black/40 backdrop-blur-lg border border-zinc-700/40 text-white shadow-lg"
      break
    case "whiteGlass":
      variantClass =
        "bg-white-400/20 backdrop-blur-xl border border-white-200/20 shadow-lg"
      break
    case "gradientGlass":
      variantClass =
        "bg-gradient-to-br from-purple-300/20 via-white/10 to-cyan-300/10 backdrop-blur-xl border border-white/10 shadow-lg"
      break
    default:
      variantClass = ""
  }

  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        variantClass,
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
