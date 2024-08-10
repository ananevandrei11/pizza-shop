import Image from "next/image"
import { ArrowRight, ShoppingCart, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "./container"
import { Button } from "../ui"

interface Props {
  className?: string
}

export const Header = ({ className }: Props) => {
  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Image className="shrink-0" src="/logo.png" alt="Logo" width={35} height={35} />
          <div>
            <h1 className="text-2xl uppercase font-black">Pizza Shop</h1>
            <p className="text-sm text-gray-400 leading-3">It&apos;s already delicious</p>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={18} className="shrink-0" />
            <span>Log in</span>
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="default" className="flex items-center gap-3 group relative">
              <b>5 &euro;</b>
              <span className="h-full w-[1px] bg-white/30 mx-1" />
              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart size={16} className="relative" strokeWidth={2} />
                <b>33</b>
              </div>
              <ArrowRight size={20} className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}