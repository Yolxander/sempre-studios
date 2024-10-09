"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Settings, HelpCircle, Home, FileText, Users, BarChart, Mail } from 'lucide-react'
import {Audiowide} from "@next/font/google";

const audiowide = Audiowide({
  weight: "400", // Audiowide only has a 400 weight
  subsets: ["latin"],
});


type User = {
  name: string;
  email: string;
  subscription: 'Free' | 'Business' | 'Agency';
  avatar: string;
}

type Project = {
  name: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
  pages: number;
  completedPages: number;
  updatesLeft: number;
}

export function DashboardWithNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [project, setProject] = useState<Project | null>(null)

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Simulating authentication
    setIsLoggedIn(true)
    setUser({
      name: "John Doe",
      email: "john@example.com",
      subscription: "Business",
      avatar: "/placeholder.svg?height=32&width=32"
    })
    setProject({
      name: "E-commerce Website",
      status: "In Progress",
      pages: 10,
      completedPages: 7,
      updatesLeft: 8
    })
  }

  if (!isLoggedIn) {
    return <AuthPage onSubmit={handleAuth} />
  }

  return <Dashboard user={user!} project={project!} />
}

function AuthPage({ onSubmit }: { onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  // Auth page code remains unchanged
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to Sempre Studios</CardTitle>
          <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={onSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" placeholder="m@example.com" required type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" required type="password" />
                  </div>
                  <Button className="w-full" type="submit">Login</Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={onSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Name</Label>
                    <Input id="register-name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" placeholder="m@example.com" required type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input id="register-password" required type="password" />
                  </div>
                  <Button className="w-full" type="submit">Register</Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

function Dashboard({ user, project }: { user: User, project: Project }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className={`${audiowide.className} text-2xl font-bold text-gray-800`}>Sempre Studios</h2>
        </div>
        <nav className="mt-6">
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 flex items-center">
            <Home className="mr-2" size={20} />
            Dashboard
          </a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 flex items-center">
            <FileText className="mr-2" size={20} />
            Projects
          </a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 flex items-center">
            <Users className="mr-2" size={20} />
            Team
          </a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 flex items-center">
            <BarChart className="mr-2" size={20} />
            Analytics
          </a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 flex items-center">
            <Mail className="mr-2" size={20} />
            Support
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <HelpCircle size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings size={20} />
              </Button>
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <Badge className="mb-4">{project.status}</Badge>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Progress</span>
                      <span>{project.completedPages} / {project.pages} pages</span>
                    </div>
                    <Progress value={(project.completedPages / project.pages) * 100} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Pages</span>
                      <span>{project.pages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed Pages</span>
                      <span>{project.completedPages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Updates Left</span>
                      <span>{project.updatesLeft}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className="mb-4">{user.subscription}</Badge>
                  <p className="text-sm text-gray-600">
                    {user.subscription === 'Free' && 'You have 2 free updates.'}
                    {user.subscription === 'Business' && 'You have up to 10 updates.'}
                    {user.subscription === 'Agency' && 'You have unlimited updates.'}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Current Promotions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Upgrade to Agency and get 3 months free!</p>
                  <Button>Upgrade Now</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}