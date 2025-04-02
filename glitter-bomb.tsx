"use client"

import { useEffect, useRef } from "react"

interface GlitterBombProps {
  position: { x: number; y: number }
}

export default function GlitterBomb({ position }: GlitterBombProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = position.x
        this.y = position.y
        this.size = Math.random() * 8 + 2
        this.speedX = Math.random() * 6 - 3
        this.speedY = Math.random() * 6 - 3
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Add gravity
        this.speedY += 0.05

        // Add friction
        this.speedX *= 0.99

        if (this.size > 0.2) this.size -= 0.1
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = 200

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Play explosion sound
    const audio = new Audio("/explosion.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    return () => {
      // Cleanup
      cancelAnimationFrame(0)
    }
  }, [position])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}

