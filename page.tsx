"use client"

import type React from "react"

import { useState } from "react"
import { BarChart3, PieChart, LineChart, Users, DollarSign, Activity, Bell, Settings, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import GlitterBomb from "@/components/glitter-bomb"

export default function Dashboard() {
  const [bombTriggered, setBombTriggered] = useState(false)
  const [triggerPosition, setTriggerPosition] = useState({ x: 0, y: 0 })

  const handleClick = (e: React.MouseEvent) => {
    // Get click position relative to viewport
    setTriggerPosition({
      x: e.clientX,
      y: e.clientY,
    })
    setBombTriggered(true)

    // Reset after animation completes
    setTimeout(() => {
      setBombTriggered(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      {bombTriggered && <GlitterBomb position={triggerPosition} />}

      <div className="flex h-16 items-center border-b px-4">
        <h1 className="text-xl font-bold">Analytics Dashboard</h1>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleClick}>
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleClick}>
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleClick}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex">
        <div className="w-64 border-r h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-2">
            {[
              { icon: BarChart3, label: "Dashboard" },
              { icon: Users, label: "Users" },
              { icon: PieChart, label: "Analytics" },
              { icon: LineChart, label: "Reports" },
              { icon: DollarSign, label: "Sales" },
              { icon: Settings, label: "Settings" },
            ].map((item, index) => (
              <Button key={index} variant="ghost" className="w-full justify-start" onClick={handleClick}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        <main className="flex-1 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Total Revenue", value: "$45,231.89", icon: DollarSign, change: "+20.1%" },
              { title: "Active Users", value: "2,345", icon: Users, change: "+10.3%" },
              { title: "Conversion Rate", value: "3.2%", icon: Activity, change: "+2.5%" },
              { title: "Avg. Session", value: "2m 45s", icon: LineChart, change: "-0.7%" },
            ].map((card, index) => (
              <Card key={index} onClick={handleClick} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <card.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className={`text-xs ${card.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                    {card.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2 cursor-pointer" onClick={handleClick}>
              <CardHeader>
                <CardTitle>Weekly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-muted/20 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Chart Visualization</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer" onClick={handleClick}>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-muted/20 rounded-md flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Pie Chart</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

