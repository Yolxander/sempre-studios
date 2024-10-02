import { FaLaptopCode, FaPaintBrush, FaServer, FaPencilAlt, FaCog, FaFileAlt, FaCloud, FaBullseye } from "react-icons/fa";

export const services = {
    "landing-page-creation": {
        title: "Landing Page Creation",
        description: "Customized landing pages that bring your business online quickly and affordably.",
        details: "At Sempre Studios, we specialize in creating customized landing pages for businesses. Our service includes building professional, responsive pages designed to increase visibility and conversions for businesses without a current web presence.",
        icon: FaLaptopCode, // Icon for Landing Page Creation
        pricing: {
            basic: {
                description: "Basic one-page landing site with essential business info and contact form.",
                oneTime: "$500",
                monthly: "$50"
            },
            standard: {
                description: "Multi-section landing page with customized design and lead generation form.",
                oneTime: "$1000",
                monthly: "$100"
            },
            premium: {
                description: "Full-featured landing page with lead generation, integrations, and analytics.",
                oneTime: "$2000",
                monthly: "$150"
            }
        }
    },
    "web-design": {
        title: "Web Design",
        description: "We create visually stunning and user-friendly websites that captivate your audience.",
        details: "Our web design services include everything from basic landing pages to full-blown e-commerce sites. We focus on creating responsive, engaging designs that convert visitors into customers.",
        icon: FaPaintBrush, // Icon for Web Design
        pricing: {
            basic: {
                description: "Single-page design with basic functionality.",
                oneTime: "$500",
                monthly: "$50"
            },
            standard: {
                description: "Multi-page website with standard features and responsive design.",
                oneTime: "$1500",
                monthly: "$100"
            },
            premium: {
                description: "Full-scale custom design with e-commerce or advanced functionalities.",
                oneTime: "$3000",
                monthly: "$200"
            }
        }
    },
    "web-development": {
        title: "Web Development",
        description: "Our expert developers build robust and scalable web applications tailored to your needs.",
        details: "We develop custom web applications, ensuring they are fast, scalable, and reliable.",
        icon: FaServer, // Icon for Web Development
        pricing: {
            basic: {
                description: "Basic functionality with minimal customization.",
                oneTime: "$1000",
                monthly: "$100"
            },
            standard: {
                description: "Custom-built web applications with moderate features.",
                oneTime: "$2500",
                monthly: "$200"
            },
            premium: {
                description: "Enterprise-level web development with advanced integrations and features.",
                oneTime: "$5000",
                monthly: "$300"
            }
        }
    },
    branding: {
        title: "Branding",
        description: "We craft unique brand identities that resonate with your target audience.",
        details: "Our branding services focus on creating logos, typography, and brand strategies.",
        icon: FaPencilAlt, // Icon for Branding
        pricing: {
            basic: {
                description: "Logo design and color palette creation.",
                oneTime: "$500",
                monthly: "$50"
            },
            standard: {
                description: "Complete brand identity with logo, typography, and brand guidelines.",
                oneTime: "$1500",
                monthly: "$100"
            },
            premium: {
                description: "Full brand strategy including market research and brand assets.",
                oneTime: "$3000",
                monthly: "$200"
            }
        }
    },
    "website-maintenance": {
        title: "Website Maintenance",
        description: "Keep your website secure, fast, and up-to-date with our maintenance plans.",
        details: "We offer ongoing maintenance services, including security updates, backups, and performance optimizations.",
        icon: FaCog, // Icon for Website Maintenance
        pricing: {
            basic: {
                description: "Monthly backups and security updates.",
                oneTime: "$0",
                monthly: "$50"
            },
            standard: {
                description: "Performance optimizations and monthly updates.",
                oneTime: "$0",
                monthly: "$100"
            },
            premium: {
                description: "Full-service maintenance with priority support and quarterly updates.",
                oneTime: "$0",
                monthly: "$200"
            }
        }
    },
    "content-creation": {
        title: "Content Creation",
        description: "Engaging content creation that reflects your brand and connects with your audience.",
        details: "We provide content creation services ranging from website copy, blog articles, social media posts, and more. Our team ensures your brand’s voice is consistent and resonates with your target audience.",
        icon: FaFileAlt, // Icon for Content Creation
        pricing: {
            basic: {
                description: "Written content such as blog posts or articles.",
                oneTime: "$200",
                monthly: "$100"
            },
            standard: {
                description: "Mixed media content including visuals or basic video.",
                oneTime: "$500",
                monthly: "$200"
            },
            premium: {
                description: "Full multimedia content strategy with advanced video production.",
                oneTime: "$1000",
                monthly: "$300"
            }
        }
    },
    "hosting-domain-services": {
        title: "Hosting and Domain Services",
        description: "Reliable hosting and domain services to keep your website online 24/7.",
        details: "Our hosting and domain management services ensure your website remains operational, secure, and fast. We handle all technical aspects, including uptime monitoring, SSL certificates, and backups.",
        icon: FaCloud, // Icon for Hosting and Domain Services
        pricing: {
            basic: {
                description: "Domain registration and basic hosting for small websites.",
                oneTime: "$100",
                monthly: "$50"
            },
            standard: {
                description: "Advanced hosting with SSL certificates, regular backups, and more.",
                oneTime: "$300",
                monthly: "$100"
            },
            premium: {
                description: "Premium hosting with priority support, enhanced security, and performance optimizations.",
                oneTime: "$500",
                monthly: "$150"
            }
        }
    },
    "lead-generation": {
        title: "Lead Generation",
        description: "We help you generate qualified leads through digital strategies and campaigns.",
        details: "Our lead generation services include email marketing, landing page optimization, and funnel design to help your business capture and convert leads effectively.",
        icon: FaBullseye, // Icon for Lead Generation
        pricing: {
            basic: {
                description: "Single email marketing campaign or basic lead magnet setup.",
                oneTime: "$500",
                monthly: "$100"
            },
            standard: {
                description: "Multi-channel lead generation with landing page optimization.",
                oneTime: "$1500",
                monthly: "$200"
            },
            premium: {
                description: "Advanced lead funnels with ongoing optimization and A/B testing.",
                oneTime: "$3000",
                monthly: "$300"
            }
        }
    }
};
