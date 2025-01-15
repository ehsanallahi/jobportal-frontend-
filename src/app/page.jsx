'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import faqs from "@/data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      {/* Hero Section */}
      <section className="text-center px-4">
        <h1 className="gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job
          <span className="flex flex-wrap justify-center gap-2 sm:gap-6">
            and get Hired!
          </span>
        </h1>
        <p className="text-gray-500 mt-4 text-base sm:text-xl">
          Explore thousands of job listings or find the perfect candidate.
        </p>
      </section>

      {/* Buttons */}
      <div className="flex flex-wrap gap-6 justify-center px-4">
        <Link href="/jobs">
          <Button variant="outline" size="lg">
            Find Jobs
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="destructive" size="lg">
            Post a Job
          </Button>
        </Link>
      </div>

      {/* Carousel Section */}
      <section className="px-4">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full py-10"
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            <CarouselItem className="basis-1/3 sm:basis-1/4 lg:basis-1/6">
              <Image
                src="/companies/company-1.svg"
                alt="Company 1"
                width={100}
                height={50}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3 sm:basis-1/4 lg:basis-1/6">
              <Image
                src="/companies/company-2.svg"
                alt="Company 2"
                width={100}
                height={50}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3 sm:basis-1/4 lg:basis-1/6">
              <Image
                src="/companies/company-3.webp"
                alt="Company 3"
                width={100}
                height={50}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3 sm:basis-1/4 lg:basis-1/6">
              <Image
                src="/companies/company-4.svg"
                alt="Company 4"
                width={100}
                height={50}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3 sm:basis-1/4 lg:basis-1/6">
              <Image
                src="/companies/company-5.svg"
                alt="Company 5"
                width={100}
                height={50}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3 sm:basis-1/4 lg:basis-1/6">
              <Image
                src="/companies/company-6.webp"
                alt="Company 6"
                width={100}
                height={50}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3 sm:basis-1/4 lg:basis-1/6">
              <Image
                src="/companies/company-7.png"
                alt="Company 7"
                width={100}
                height={50}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3 sm:basis-1/4 lg:basis-1/6">
              <Image
                src="/companies/company-8.svg"
                alt="Company 8"
                width={100}
                height={50}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>

      {/* Banner */}
      <div className="w-full">
        <Image
          src="/banner.jpg"
          alt="Banner"
          width={1920}
          height={600}
          className="w-full h-auto"
        />
      </div>

      {/* Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs and find the best candidates.
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <Accordion type="multiple" className="w-full px-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default LandingPage;
