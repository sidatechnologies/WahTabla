"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import CaraousalCourseCard from "@/components/caraousal-course-cards";
// import PricingOld from "@/components/pricing-old";
import PricingNew from "@/components/pricing-new";

const HomePage = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-20">
      <section
        id="home"
        className="w-full flex flex-col justify-start items-center gap-4"
      >
        <div className="flex justify-center items-center gap-2 px-4 py-2 relative">
          <Image
            src="/icons/abstract-line.svg"
            alt="arrow"
            width={0}
            height={0}
            className="w-6 absolute -top-4 -left-4 sm:-top-6 sm:-left-6"
          />
          <Image
            src="/icons/tabla.svg"
            alt="arrow"
            width={0}
            height={0}
            className="hidden sm:block w-10 p-2"
          />
          <Image
            src="/icons/sign-hero.svg"
            alt="arrow"
            width={0}
            height={0}
            className="w-6 p-1 sm:hidden bg-tertiary"
          />
          <p className="text-base sm:text-4xl text-center font-semibold">
            <span className="text-[#FF9500] sm:text-black">Unlock</span> your
            Musical Potential
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-2xl sm:text-3xl text-center">
            with our curated Tabla Course
          </p>
          <p className="text-xs sm:text-sm text-center">
            Learn from the best Gurus and Enhance Your Skills.
          </p>
        </div>
        <div className="flex gap-2 pt-4">
          <Link href="/buy-course">
            <Button>Buy Now</Button>
          </Link>
          <Link href="/#pricing">
            <Button variant="outline">View Pricing</Button>
          </Link>
        </div>
        {/* <Image
          src="/table-hero.jpeg"
          alt="arrow"
          width={0}
          height={0}
          className="w-[1100px] p-2 bg-tertiary pt-4 rounded-lg"
        /> */}
        {/* <AspectRatio ratio={16 / 9} className="pointer-events-none max-h-[800px] rounded-sm flex items-start justify-center"> */}
        <div className="relative w-[80%] max-w-[800px] max-h-[800px] bg-black h-full aspect-video my-8">
          <iframe
            src="https://player.vimeo.com/video/1091617987?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1&amp;mute=1&amp;controls=1&amp;showinfo=0"
            allow="autoplay"
            className="absolute top-0 left-0 w-full h-full"
            title="Pexels Videos 1851190"
          ></iframe>
        </div>
        {/* </AspectRatio> */}
      </section>
      <Card
        id="features"
        className="w-full bg-transparent shadow-none border-none mt-6"
      >
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Introduction</CardTitle>
          {/* <CardDescription className="flex flex-col tablet:flex-row justify-between items-start gap-2">
            <span className="max-w-[700px]">
              Our course offers a range of features tailored to enhance your
              learning experience, from hands-on guidance to performance
              opportunities and flexible learning options.
            </span>
            <Button variant="secondary">Buy Now</Button>
          </CardDescription> */}
        </CardHeader>
        <CardContent className="bg-primary text-white px-12 py-10 rounded-sm">
          <p>
            Dhwani&apos;s curated tabla course is designed uniquely with the
            meticulous guidance needed to make you a full-fledged tabla player
            and nurture your musical talent. The course is made up of 20
            modules, designed to be completed over 7 years (roughly 4 modules
            per year). After completing this course, you will learn the theory
            of tabla and will be able to play to your satisfaction.
            <br></br>
            <br></br>
            As you complete each year of instruction, your skill level will
            increase to empower you to reach progressively greater heights. For
            example, after Year 2, you&apos;ll be able to join our students and
            participate in one of our annual student concerts held around the
            world. At the completion of the course, you&apos;ll be adept at
            performing with Vocal and instrumental music, and will be able to to
            play with light classical songs like Bhajans and Geets. You will be
            well equipped with the skill and confidence needed to perform tabla
            solos by yourself.
            <br></br>
            <br></br>
            This is a course equivalent to a bachelors degree. Upon completing
            the course, You can start teaching under our academy course as one
            of our teachers. Students of this course are additionally offered
            the honor of continuing lessons with Pt Abhijit Banerjee to rain to
            be a real Master of Art of Tabla, and to teach intermediate and
            advanced students of Dhwani Academy.
          </p>
        </CardContent>
      </Card>
      <Card
        id="benefits"
        className="w-full bg-transparent shadow-none border-none mt-6 px-0"
      >
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Features & Benefits</CardTitle>
          {/* <CardDescription className="flex flex-col tablet:flex-row justify-between items-start gap-2">
            <span className="max-w-[700px]">
              Unlock your musical potential with immersive learning, hands-on
              guidance, and opportunities to perform, teach, and grow
              professionally.
            </span>
            <Button variant="secondary">Buy Now</Button>
          </CardDescription> */}
        </CardHeader>
        <CardContent className="px-0 relative h-full min-h-[400px] sm:min-h-[300px] md:min-h-[300px] lg:min-h-[250px] mb-6">
          {/* <Image
            src="/benefits-bg.jpg"
            alt="arrow"
            width={0}
            height={0}
            className="w-full object-cover h-[200px] tablet:h-full rounded-lg"
          /> */}
          <div className="w-full h-full flex justify-center items-center absolute top-0 z-20">
            {/* <div className="lg:hidden relative flex justify-center items-center w-full h-full mx-auto overflow-hidden">
              {benefits.map((benifit, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-12 px-2 flex items-center justify-center rounded-lg
                ${
                  isAnimating && index === currentIndex
                    ? "animate-fadeInUp"
                    : "animate-fadeOutUp"
                } 
                `}
                >
                  <div className="max-w-[500px] flex justify-start items-center sm:gap-4 py-2 px-4 sm:py-4 sm:px-4 text-xs md:text-sm bg-primary text-white rounded-lg shadow-md">
                    <Image
                      src={benifit.icon}
                      alt="arrow"
                      width={0}
                      height={0}
                      className="w-6 h-6"
                    />
                    {benifit.description}
                  </div>
                </div>
              ))}
            </div> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-6 relative">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="w-full h-auto sm:h-24 md:h-28 px-2 py-2 flex items-stretch justify-center rounded-lg"
                  initial={{
                    opacity: 0,
                    y: 20,
                    // Initial position is centered in the viewport (not absolute)
                    transform: "translateY(50%)", // Moves the card down initially
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0, // Animate to original position
                    transform: "translateY(0)", // Final position at normal grid location
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.1, // Stagger the animations
                  }}
                >
                  <div className="max-w-[450px] flex justify-start items-center sm:gap-4 py-2 px-4 sm:py-4 sm:px-4 text-xs md:text-sm bg-primary text-white rounded-lg shadow-md">
                    <Image
                      src={benefit.icon}
                      alt="icon"
                      width={0}
                      height={0}
                      className="w-6 h-6"
                    />
                    {benefit.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="w-full flex flex-col justify-start items-start gap-6 pt-6">
        {/* <h1 className="text-2xl font-medium">Who & Requirements</h1> */}
        <div className="w-full flex flex-wrap tableto:flex-nowrap justify-between items-stretch gap-6">
          <div className="relative min-w-[300px] w-full min-h-[240px] rounded-lg flex flex-col justify-start items-center gap-4 px-6 py-10 text-center text-white bg-primary">
            <p className="text-2xl font-semibold max-w-[300px]">
              No preconception of Tabla is necessary.
            </p>
            <p className="text-xs max-w-[250px]">
              Students can pursue this course even if they have no prior
              knowledge of Tabla.
            </p>
            <span className="absolute -bottom-6 w-20 h-20 rounded-full bg-background flex justify-center items-center">
              <Image
                src="/star.svg"
                alt="star"
                width={0}
                height={0}
                className="w-8 h-8"
              />
            </span>
          </div>
          <div className="min-w-[300px] w-full rounded-lg flex flex-col justify-center items-center gap-4 px-6 py-10 text-center text-white bg-primary">
            <p className="text-2xl font-semibold">WHO THIS COURSE IS FOR</p>
            <li className="text-xs text-left list-inside max-w-[600px]">
              Anyone who wants to learn tabla from the beginning learn, to
              perform and teach professionally and pursue it more than a hobby
              and make it a side profession.
            </li>
            <li className="text-xs text-left list-inside max-w-[600px]">
              Having some knowledge of Indian Rhythm and can incorporate the
              rhythm of Tabla to drums or any other instruments such as Guitar
              or base Guitar or Zembe or similar percussion instruments
            </li>
          </div>
          <div className="relative min-w-[300px] w-full min-h-[240px] rounded-lg flex flex-col justify-start items-center gap-4 px-6 py-10 text-center text-white bg-primary">
            <p className="text-2xl font-semibold max-w-[300px]">
              Learn at your own pace and comfort.
            </p>
            <p className="text-xs max-w-[250px]">
              Students can practice and progress at their convenience with flexible learning modules.
            </p>
            <span className="absolute -bottom-6 w-20 h-20 rounded-full bg-background flex justify-center items-center">
              <Image
                src="/star.svg"
                alt="star"
                width={0}
                height={0}
                className="w-8 h-8"
              />
            </span>
          </div>
        </div>
      </div>
      <CaraousalCourseCard />

      <Card id='module' className="w-full bg-transparent shadow-none border-none mt-6">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Module Features</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 desktop:grid-cols-4 gap-4 md:gap-8 px-0">
          {moduleFeatures.map((item, index) => (
            <Badge
              key={index}
              className="bg-primary text-white shadow-md px-4 py-2 flex justify-center items-center gap-2 hover:bg-primary text-lg "
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={0}
                height={0}
                className="w-6 text-white"
              />
              <span>{item.name}</span>
            </Badge>
          ))}
        </CardContent>
      </Card>
      <Card id='testimonials' className="w-full bg-transparent shadow-none border-none mt-6">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Our Testimonials</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-6 md:gap-10 desktop:gap-x-10 desktop:gap-y-10">
            {testimonials &&
              testimonials.map((review, index) => {
                return (
                  <Card
                    key={index}
                    className="pb-0 rounded-sm bg-primary text-white"
                  >
                    <CardHeader className="border-b border-b-muted/20">
                      <CardDescription className="text-white">
                        {review.review}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 bg-primary">
                      <div className="flex justify-between items-center">
                        <div className="flex justify-start items-center gap-4">
                          <Image
                            src={review.image}
                            alt={review.name}
                            width={0}
                            height={0}
                            className="w-8"
                          />
                          <span>{review.name}</span>
                        </div>
                        <Button variant="secondary" size="sm">
                          Buy Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </CardContent>
      </Card>
      <Card className="w-full bg-primary shadow-none border-none text-white pb-0 mt-6">
        <CardHeader className="pb-0">
          <CardTitle className="text-3xl">ABOUT THE INSTRUCTOR</CardTitle>
          <CardDescription className="flex flex-col laptop:flex-row justify-center md:justify-between items-center laptop:items-start gap-2 pt-4 relative">
            <span className=" laptop:text-base text-white">
              Abhijit Banerjee is one of the top-ranking Indian musicians of
              present generation. A disciple of the illustrious guru, the late
              Pt. Jnan Prakash Ghosh, featured in all prominent festivals in
              India and abroad, Abhijit has collaborated with Grammy Winners
              international musicians like L. Shenkar, Ry Cooder, Larry Coryell,
              and Denmark Radio Jazz Orchestra. Besides being featured in
              prestigious venues like Carnegie Hall NY, Palais in Brussels,
              Queen Elizabeth Hall, London, Abhijit is now the Head of the
              department of Tabla in Chinmaya Viswa Vidyapeeth University, Pune
              and an adjunct faculty in the college of New Jersey (TCNJ). Apart
              from his contributions to Indian music he has left his mark in a
              diverse field of crossover music, both as a performer and a
              composer. Abhijit has more than 55 audio and video publications
              throughout the world. Abhijit is a recipient of APPEX fellowship
              from UCLA. In his academic life he is a graduate in English
              literature and postgraduate in Journalism. Abhijit is the founder
              and inspiration of DHWANI ACADEMY in INDIA and the US, started
              with the aim of promotion of Indian cultural heritage.
            </span>
            <Image
              src="/instructor.png"
              alt="arrow"
              width={0}
              height={0}
              className="w-[300px] laptop:w-[400px] relative bottom-0"
            />
          </CardDescription>
        </CardHeader>
      </Card>
      {/* <PricingOld /> */}
      <PricingNew />
      <Card id='faq' className="w-full flex flex-col md:flex-row lg:gap-32 justify-between items-start bg-primary text-white shadow-none border-none mt-6 py-10 laptop:px-10">
        <CardHeader className="max-w-[340px]">
          <CardTitle className="text-3xl">Frequently Asked Questions</CardTitle>
          <CardDescription className="flex flex-col justify-between items-start gap-2">
            <span className="max-w-[700px] text-primary-foreground">
              Still you have any questions? Contact our Team via
              onlineclasses@dhwaniacademy.org
            </span>
            {/* <Button variant="outline" className="mt-6 bg-white text-primary">
              See All FAQ&apos;s
            </Button> */}
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="pb-4 text-base text-left hover:no-underline">
                Can I buy multiple modules at once?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col justify-start items-start gap-6 pt-6 text-white">
                Absolutely! You can buy all the modules or a selected number of
                modules at the same time and access them at your convenience.
                <Button
                  variant="secondary"
                  className="w-full flex justify-between items-center px-4 py-8"
                >
                  <span>Buy all module at once</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="arrow"
                    width={0}
                    height={0}
                    className="w-8 p-2 bg-white text-primary rounded-full"
                  />
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="pb-4 text-base text-left hover:no-underline">
                What kind of support can I expect from instructors?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col justify-start items-start gap-6 pt-6 text-white">
                Absolutely! You can buy all the modules or a selected number of
                modules at the same time and access them at your convenience.
                {/* <Button
                  variant="secondary"
                  className="w-full flex justify-between items-center px-4 py-8"
                >
                  <span>Buy all module at once</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="arrow"
                    width={0}
                    height={0}
                    className="w-8 p-2 bg-white text-primary rounded-full"
                  />
                </Button> */}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="pb-4 text-base text-left hover:no-underline">
                Are the courses self-paced or do they have specific start and
                end dates?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col justify-start items-start gap-6 pt-6 text-white">
                Absolutely! You can buy all the modules or a selected number of
                modules at the same time and access them at your convenience.
                {/* <Button
                  variant="secondary"
                  className="w-full flex justify-between items-center px-4 py-8"
                >
                  <span>Buy all module at once</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="arrow"
                    width={0}
                    height={0}
                    className="w-8 p-2 bg-white text-primary rounded-full"
                  />
                </Button> */}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="pb-4 text-base text-left hover:no-underline">
                Are there any prerequisites for the courses?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col justify-start items-start gap-6 pt-6 text-white">
                Absolutely! You can buy all the modules or a selected number of
                modules at the same time and access them at your convenience.
                {/* <Button
                  variant="secondary"
                  className="w-full flex justify-between items-center px-4 py-8"
                >
                  <span>Buy all module at once</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="arrow"
                    width={0}
                    height={0}
                    className="w-8 p-2 bg-white text-primary rounded-full"
                  />
                </Button> */}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="pb-4 text-base text-left hover:no-underline">
                Can I download the course materials for offline access?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col justify-start items-start gap-6 pt-6 text-white">
                Absolutely! You can buy all the modules or a selected number of
                modules at the same time and access them at your convenience.
                {/* <Button
                  variant="secondary"
                  className="w-full flex justify-between items-center px-4 py-8"
                >
                  <span>Buy all module at once</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="arrow"
                    width={0}
                    height={0}
                    className="w-8 p-2 bg-white text-primary rounded-full"
                  />
                </Button> */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;

const moduleFeatures = [
  {
    icon: "/icons/feature-1.svg",
    name: "Practical Demonstration",
  },
  {
    icon: "/icons/feature-2.svg",
    name: "Supporting PDF",
  },
  {
    icon: "/icons/feature-3.svg",
    name: "Theoretical Text",
  },
  {
    icon: "/icons/feature-4.svg",
    name: "Questions for Evaluation",
  },
];

const testimonials = [
  {
    review:
      "The lessons are clear, and the progression is perfect. I've grown so much in just a few months!",
    name: "Aditi S",
    image: "/review-1.jpg",
  },
  {
    review:
      "The video tutorials and PDFs make learning easy. I'm thrilled with my progress! I'm excited to learn more.",
    name: "Jason M",
    image: "/review-2.jpg",
  },
  {
    review:
      "Performing in a concert after two years of training was a dream come true. Highly recommend!",
    name: "Emily R",
    image: "/review-3.jpg",
  },
  {
    review:
      "The structured modules and expert guidance helped me master Tabla faster than I expected!",
    name: "Michael K",
    image: "/review-4.jpg",
  },
];

const benefits = [
  {
    icon: "/benefits/benefit-1.png",
    description:
      "Learn basics to bachelors standard in five years with theory and practical knowledge.",
  },
  {
    icon: "/benefits/benefit-2.png",
    description:
      "Experience stage shows with group performances after two years of learning our courses.",
  },
  {
    icon: "/benefits/benefit-3.png",
    description:
      "Doubt-clearing sessions that offer personalized support to answer all your questions .",
  },
  {
    icon: "/benefits/benefit-4.png",
    description:
      "Get the opportunity to attend workshops in different locations and one-on-one help to perfect your artistry.",
  },
  {
    icon: "/benefits/benefit-5.png",
    description:
      "Be a teacher with Dhwani's certificate and associate yourself with us to teach, perform, and earn.",
  },
  {
    icon: "/benefits/benefit-6.png",
    description:
      "All the course materials are available as downloadable PDFs and video recordings.",
  },
];
