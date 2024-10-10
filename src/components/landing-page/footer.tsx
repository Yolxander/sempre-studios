// src/components/Footer.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setIsSubmitted(true); // Update the state to indicate form submission
    };

    return (
        <footer className="bg-black text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <div className="mb-8 md:mb-0">
                        {/* Uncomment this block if you want to show the logo */}
                        {/*<Image*/}
                        {/*    src="/placeholder.svg"*/}
                        {/*    alt="Sempre Studios Logo"*/}
                        {/*    width={150}*/}
                        {/*    height={40}*/}
                        {/*    className="mb-4"*/}
                        {/*/>*/}
                        <p className="text-sm text-gray-400 max-w-sm">
                            Empowering businesses with instant online presence and ongoing digital success.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        {/* Show thank you message if form is submitted */}
                        {isSubmitted ? (
                            <p className="text-lg text-center text-gray-300">Thank you for subscribing!</p>
                        ) : (
                            <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
                                <Input
                                    type="email"
                                    placeholder="Your e-mail"
                                    className="flex-grow bg-gray-800 text-white border-gray-700 rounded-full"
                                    required // Optional: Ensure the field is filled
                                />
                                <Button type="submit" className="bg-white text-black hover:bg-gray-200 rounded-full">
                                    Subscribe
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
                    <p className="text-sm text-gray-400 mb-4 md:mb-0">
                        © 2024 Sempre Studios. All rights reserved.
                    </p>
                    {/* Uncomment this block if you want to show a language selector */}
                    {/*<div className="flex items-center">*/}
                    {/*    <span className="mr-2 text-sm text-gray-400">Language:</span>*/}
                    {/*    <select className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">*/}
                    {/*        <option>English</option>*/}
                    {/*        <option>Français</option>*/}
                    {/*        <option>Español</option>*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                </div>
            </div>
        </footer>
    );
}
