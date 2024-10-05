import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
    return (
        <footer className="bg-black text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <div className="mb-8 md:mb-0">
                        <Image
                            src="/placeholder.svg"
                            alt="Sempre Studios Logo"
                            width={150}
                            height={40}
                            className="mb-4"
                        />
                        <p className="text-sm text-gray-400 max-w-sm">
                            Empowering businesses with instant online presence and ongoing digital success.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <form className="flex flex-col sm:flex-row gap-4">
                            <Input
                                type="email"
                                placeholder="Your e-mail"
                                className="flex-grow bg-gray-800 text-white border-gray-700 rounded-full"
                            />
                            <Button type="submit" className="bg-white text-black hover:bg-gray-200 rounded-full">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
                    <p className="text-sm text-gray-400 mb-4 md:mb-0">
                        © 2024 Sempre Studios. All rights reserved.
                    </p>
                    <div className="flex items-center">
                        <span className="mr-2 text-sm text-gray-400">Language:</span>
                        <select className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                            <option>English</option>
                            <option>Français</option>
                            <option>Español</option>
                        </select>
                    </div>
                </div>
            </div>
        </footer>
    )
}