import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ShimmerButton from "./ui/shimmer-button";
import { DiscordLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";

export default function FAQPage() {
  return (
    <div className="container px-4 pt-24 pb-12">
      <div className="w-[80%] mx-auto">
        <p className="text-secondary">FAQs</p>
        <h1 className="text-5xl font-bold text-start mb-8">
          Frequently Asked Questions
        </h1>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl">
              What do we do at GatorAI?
            </AccordionTrigger>
            <AccordionContent className="font-neighbor font-light text-lg">
              GatorAI is a club of students passionate about Artificial
              Intelligence (AI) and Machine Learning (ML). We hosts workshops
              every week, connect you with guest speakers in the industry, and
              excursions such as the HyperGator Tour!.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-2xl">
              When and where do you meet?
            </AccordionTrigger>
            <AccordionContent className="font-neighbor font-light text-lg">
              We hold Machine Learning workshops every Monday (changes may be
              announced in Discord) in the Informatics Institute from 6PM - 7PM.
              Throughout the semester we will have larger GBMs that are a fun
              way to engage in our community and guest speakers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-2xl">
              Do I need prior experience with AI to join?
            </AccordionTrigger>
            <AccordionContent className="font-neighbor font-light text-lg">
              Not at all! We welcome members of all skill levels. We offer
              beginner-friendly workshops and resources to help you get started
              from zero to hero. More experienced members can participate in
              advanced projects or even apply to be one of our education
              directors.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-2xl">
              How can I stay updated on club events?
            </AccordionTrigger>
            <AccordionContent className="font-neighbor font-light text-lg">
              The best ways to stay updated are:
              <ul className="list-disc pl-6 mt-2">
                <li>Join our Discord server</li>
                <li>Visit our Instagram @uf_gatorai</li>
                <li>Check the events in the Calendar page (WIP)</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger className="text-2xl">
              Can I get involved in leadership?
            </AccordionTrigger>
            <AccordionContent className="font-neighbor font-light text-lg">
              We hold elections for board positions at the end of each spring
              semester, applications will be announced on Discord. Throughout
              the year, we also have opportunities to lead project teams,
              organize events, or become a workshop instructor.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-20 text-center flex items-center justify-between gap-10">
          <div className="flex flex-col items-center gap-4">
            <p className="text-2xl">Still have questions?</p>
            <a href="mailto:gatorai@university.edu">
              <ShimmerButton
                borderRadius="10px"
                background="#00272b"
                className="py-2 px-8 mx-auto text-base font-neighbor font-light w-fit shadow-md"
              >
                Email us
              </ShimmerButton>
            </a>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-2xl">Connect with us</p>
            <div className="flex items-center justify-center gap-10">
              <a
                href="https://discord.com/invite/WGWrZqtDvm"
                target="_blank"
                className="group"
              >
                <DiscordLogoIcon
                  width={50}
                  height={50}
                  className="group-hover:text-secondary transition-colors duration-300"
                />
              </a>
              <a
                href="https://www.instagram.com/uf_gatorai/"
                target="_blank"
                className="group"
              >
                <InstagramLogoIcon
                  width={50}
                  height={50}
                  className="group-hover:text-secondary transition-colors duration-300"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
