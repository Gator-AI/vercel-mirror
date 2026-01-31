import ShimmerButton from "./ui/shimmer-button";
import { DiscordLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Logo from "@/images/logo-white-round-2.png";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
            <div className="container mx-auto py-6 px-8 md:px-20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                    <div className="flex flex-col items-center gap-1.5">
                        <a href="mailto:ufgatorai@gmail.com">
                            <ShimmerButton
                                borderRadius="6px"
                                background="#00272b"
                                className="py-1.5 px-5 text-xs md:text-base font-light w-fit shadow-md"
                            >
                                Email us
                            </ShimmerButton>
                        </a>
                        <p className="text-xs md:text-base text-white font-light">
                            Still have questions?
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-2 order-first md:order-none">
                        <Image
                            src={Logo}
                            alt="GatorAI Logo"
                            width={40}
                            height={40}
                            className="mb-1"
                        />
                        <p className="text-[10px] md:text-base text-white/70 font-light">
                            © {currentYear} GatorAI
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-1.5">
                        <div className="flex items-center justify-center gap-4">
                            <a
                                href="https://discord.com/invite/WGWrZqtDvm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                                aria-label="Discord"
                            >
                                <DiscordLogoIcon
                                    width={24}
                                    height={24}
                                    className="group-hover:text-secondary transition-colors duration-300"
                                />
                            </a>
                            <a
                                href="https://www.instagram.com/uf_gatorai/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                                aria-label="Instagram"
                            >
                                <InstagramLogoIcon
                                    width={24}
                                    height={24}
                                    className="group-hover:text-secondary transition-colors duration-300"
                                />
                            </a>
                        </div>
                        <p className="text-xs md:text-base text-white font-light">
                            Connect with us
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
