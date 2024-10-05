import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white py-24"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
                        <p className="text-lg md:text-xl text-gray-600 mb-8">
                            Find answers to common questions about our services and how we can help your business succeed online.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Button size="lg" className="bg-black text-white hover:bg-gray-800 rounded-full">
                                Get Started
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full">
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <Accordion type="single" collapsible className="w-full">
                            <FAQItem
                                value="item-1"
                                question="How does the demo website process work?"
                                answer="We create a customized demo website for your business and send it directly to you via email. You can review the demo and decide to purchase and launch it with minimal changes required."
                            />
                            <FAQItem
                                value="item-2"
                                question="What's included in the starting price of $1000?"
                                answer="The $1000 starting price includes a fully functional website with custom design, basic SEO optimization, and mobile responsiveness. Additional features and ongoing management are available through our monthly packages."
                            />
                            <FAQItem
                                value="item-3"
                                question="Can I edit my website after it's launched?"
                                answer="Yes, we provide a user-friendly content management system that allows you to make basic edits. For more significant changes or ongoing management, we offer various monthly packages to suit your needs."
                            />
                            <FAQItem
                                value="item-4"
                                question="What ongoing services do you offer?"
                                answer="We offer a range of ongoing services including content updates, SEO optimization, social media management, email marketing, and technical support. Our packages can be customized to fit your specific business needs."
                            />
                            <FAQItem
                                value="item-5"
                                question="How long does it take to launch a website?"
                                answer="With our demo website approach, we can have your site ready to launch within days of your approval. The exact timeline may vary depending on any customizations or additional features you request."
                            />
                        </Accordion>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

function FAQItem({ value, question, answer }) {
    return (
        <AccordionItem value={value}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
    )
}