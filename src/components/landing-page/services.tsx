import { motion } from "framer-motion"
import Image from 'next/image'

export default function Services() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-100 py-24"
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-center mb-8">
                    <Image
                        src="/placeholder.svg"
                        width={120}
                        height={40}
                        alt="From Concept To Launch"
                        className="rounded-full"
                    />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16">
                    Simple and secure web presence,<br />build trust with customers
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <ServiceCard
                        title="Instant Website Launch"
                        description="Get your professional website up and running quickly with our ready-made demos. Customize and launch your site with minimal effort."
                        icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    />
                    <ServiceCard
                        title="Ongoing Support & Management"
                        description="Our team provides continuous support, content updates, and SEO optimization to ensure your website stays current and effective."
                        icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                    />
                    <ServiceCard
                        title="Integrated Marketing Tools"
                        description="Boost your online presence with our integrated marketing tools, including social media templates and email marketing support."
                        icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                    />
                    <ServiceCard
                        title="Affordable Pricing"
                        description="Get a professional website starting at just $1000, with flexible monthly packages for ongoing management and marketing support."
                        icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                    />
                </div>
            </div>
        </motion.section>
    )
}

function ServiceCard({ title, description, icon }) {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-md relative">
            <div className="w-12 h-12 bg-black rounded-full absolute top-8 left-8 flex items-center justify-center">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 mt-16">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}