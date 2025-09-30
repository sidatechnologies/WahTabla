"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRef } from "react";

const CaraousalCourseCard = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  return (
    <Card
      id="module"
      className="w-full bg-transparent shadow-none border-none mt-6"
    >
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CardHeader className="px-0 w-full flex flex-row justify-between items-start gap-2">
          <CardTitle className="text-2xl">Course Modules</CardTitle>
          <div className="w-20 flex justify-start items-start gap-4">
            <CarouselPrevious className="relative -left-1/2 bg-white" />
            <CarouselNext className="relative -left-1/2 bg-white" />
          </div>
        </CardHeader>
        <CarouselContent className="w-full">
          <CarouselItem className="w-full">
            <DhwaniBhusanCourse />
          </CarouselItem>
          <CarouselItem className="w-full">
            <DhwaniBibhusanCourse />
          </CarouselItem>
          <CarouselItem className="w-full">
            <DhwaniRatnaCourse />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </Card>
  );
};

export default CaraousalCourseCard;

const DhwaniBhusanCourse = () => {
  return (
    <CardContent className="px-0">
      <div className="grid grid-cols-1 gap-10 sm:gap-6 md:gap-10 desktop:gap-x-10 desktop:gap-y-10">
        <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center gap-4 bg-primary p-4 rounded-lg shadow-sm">
          <Card className="h-full bg-transparent border-none shadow-none w-full py-0">
            <CardHeader className="flex justify-center items-center">
              <Image
                src="/dhwani-bhushan-thumbnail.png"
                alt="arrow"
                width={0}
                height={0}
                className="z-10 w-full bg-primary rounded-sm border border-muted/20"
              />
            </CardHeader>
            <CardContent className="py-0 text-white">
              <div className="w-full flex flex-col sm:flex-col lg:flex-row justify-between items-start sm:items-start lg:items-center gap-4">
                <div className="flex justify-start items-start sm:items-center gap-2">
                  <Badge
                    variant="outline"
                    className="w-full flex py-2 px-4 bg-white text-primary"
                  >
                    1st & 2nd Year
                  </Badge>
                  <Badge
                    variant="outline"
                    className="py-2 px-4 bg-white text-primary"
                  >
                    Beginners
                  </Badge>
                </div>
                <span className="text-sm tablet:text-base desktop:text-lg">
                  By Pandit Abhijit Banerjee
                </span>
              </div>
              <CardHeader className="px-0">
                <CardTitle className="text-xl">Dhwani Bhusan</CardTitle>
              </CardHeader>
            </CardContent>
            <CardFooter>
              <Link href="/profile" className="w-full">
                <Button variant="secondary" className="w-full">
                  Get it Now
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <div className="w-full h-full flex flex-col justify-start items-start text-white gap-2 px-4 lg:pl-0 py-4">
            <h1 className="text-3xl font-semibold">About the Course</h1>
            <ul className="list-disc list-inside text-base">
              <span className="text-lg font-medium">Course Description</span>
              <li className="pl-4">
                Introduction to Tabla: Overview of its history.
              </li>
              <li className="pl-4">
                Detailed exploration of the components, materials, tuning
                methods and sitting postures.
              </li>
              <li className="pl-4">
                Basic Hand Techniques: Step-by-step guidance on fundamental
                strokes.
              </li>
              <li className="pl-4">
                Introduction to basic rhythmic cycles and examples of expandable
                and non-expandable (fixed) compositions. E.g. Dadra (6 Beats),
                Keharwa (8 Beats), Jhaptaa(10 Beats), l Teentaal(16 Beats).
              </li>
              <li>
                Practice Drills: Structured exercises to build hand
                coordination, strength, and precision.
              </li>
              <span className="text-lg font-medium">Learning Outcomes </span>
              <br></br>
              <li className="pl-4 font-medium">
                Be familiar with the basics of Tabla playing.
              </li>
              <li className="pl-4">Master fundamental strokes and rhythms.</li>
              <li className="pl-4">
                Learn the subject with its basic theory and its history.
              </li>
              <li className="pl-4">Can start accompanying basic songs.</li>
            </ul>
          </div>
        </div>
      </div>
    </CardContent>
  );
};

const DhwaniBibhusanCourse = () => {
  return (
    <CardContent className="px-0">
      <div className="grid grid-cols-1 gap-10 sm:gap-6 md:gap-10 desktop:gap-x-10 desktop:gap-y-10">
        <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center gap-4 bg-primary p-4 rounded-lg shadow-sm">
          <Card className="h-full bg-transparent border-none shadow-none w-full py-0">
            <CardHeader className="flex justify-center items-center">
              <Image
                src="/dhwani-bibhushan-thumbnail.png"
                alt="arrow"
                width={0}
                height={0}
                className="z-10 w-full bg-primary rounded-sm border border-muted/20"
              />
            </CardHeader>
            <CardContent className="py-0 text-white">
              <div className="w-full flex flex-col sm:flex-col lg:flex-row justify-between items-start sm:items-start lg:items-center gap-4">
                <div className="flex justify-start items-start sm:items-center gap-2">
                  <Badge
                    variant="outline"
                    className="py-2 px-4 bg-white text-primary"
                  >
                    3rd, 4th & 5th Year
                  </Badge>
                  <Badge
                    variant="outline"
                    className="py-2 px-4 bg-white text-primary"
                  >
                    Intermediate
                  </Badge>
                </div>
                <span className="text-sm tablet:text-base desktop:text-lg">
                  By Pandit Abhijit Banerjee
                </span>
              </div>
              <CardHeader className="px-0">
                <CardTitle className="text-xl up">Dhwani Bibhusan</CardTitle>
              </CardHeader>
            </CardContent>
            <CardFooter>
              <Link href="/profile" className="w-full">
                <Button variant="secondary" className="w-full">
                  Get it Now
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <div className="w-full h-full flex flex-col justify-start items-start text-white gap-2 px-4 lg:pl-0 py-4">
            <h1 className="text-3xl font-semibold">About the Course</h1>
            <ul className="list-disc list-inside text-base">
              <span className="text-lg font-medium">Course Description</span>
              <li className="pl-4">
                Traditional compositions of Different Talas.
              </li>
              <li className="pl-4">
                Talas details: Roopak (7 beats), Keharwa (8 Beats),Matta Tala(9
                beats), jhap tala( 10 Beats), Chartal ki sawari (11 beats) ektal
                (12 beats), Ada Chawtala (14 beats), teen tala, compositions.
              </li>
              <li className="pl-4">
                Different types of traditional compositions. e.g. chakradhar
                tukda and gat.
              </li>
              <li className="pl-4">
                Different types of traditional compositions. e.g. chakradhar
                tukda and gat.
              </li>
              <li className="pl-4">
                Improvisations and Tehais (special ways of composing to end an
                improvisation)
              </li>
              <span className="text-lg font-medium">Learning Outcomes </span>
              <br></br>
              <li className="pl-4 font-medium">
                Be familiar with different talas and its subtle nuances.
              </li>
              <li className="pl-4">
                Play Tabla Solo and accompaniment with instruments and Vocal.
              </li>
              <li className="pl-4">
                Learn the Subject with its theoretical implications, its
                cultural background and history.
              </li>
              <li className="pl-4">
                Learn the Subject with its theoretical implications, its
                cultural background and history.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CardContent>
  );
};

const DhwaniRatnaCourse = () => {
  return (
    <CardContent className="px-0">
      <div className="grid grid-cols-1 gap-10 sm:gap-6 md:gap-10 desktop:gap-x-10 desktop:gap-y-10">
        <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center gap-4 bg-primary p-4 rounded-lg shadow-sm">
          <Card className="h-full bg-transparent border-none shadow-none w-full py-0">
            <CardHeader className="flex justify-center items-center">
              <Image
                src="/dhwani-ratna-thumbnail.png"
                alt="arrow"
                width={0}
                height={0}
                className="z-10 w-full bg-primary rounded-sm border border-muted/20"
              />
            </CardHeader>
            <CardContent className="py-0 text-white">
              <div className="w-full flex flex-col sm:flex-col lg:flex-row justify-between items-start sm:items-start lg:items-center gap-4">
                <div className="flex justify-start items-start sm:items-center gap-2">
                  <Badge
                    variant="outline"
                    className="py-2 px-4 bg-white text-primary"
                  >
                    6th & 7th Year
                  </Badge>
                  <Badge
                    variant="outline"
                    className="py-2 px-4 bg-white text-primary"
                  >
                    Advanced
                  </Badge>
                </div>
                <span className="text-sm tablet:text-base desktop:text-lg">
                  By Pandit Abhijit Banerjee
                </span>
              </div>
              <CardHeader className="px-0">
                <CardTitle className="text-xl up">Dhwani Ratna</CardTitle>
              </CardHeader>
            </CardContent>
            <CardFooter>
              <Link href="/profile" className="w-full">
                <Button variant="secondary" className="w-full">
                  Get it Now
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <div className="w-full h-full flex flex-col justify-start items-start text-white gap-2 px-4 lg:pl-0 py-4">
            <h1 className="text-3xl font-semibold">About the Course</h1>
              <span>AVAILABLE ONLY CLASSES ONLINE OR IN-PERSON.</span>
            <ul className="list-disc list-inside text-base">
              <span className="text-lg font-medium">Course Description</span>
              <li className="pl-4">
                Detailed study with practice of different Talas
              </li>
              <li className="pl-4">
                Rhythmic Variations
              </li>
              <li className="pl-4">
                Learning of subtilities of different Gharanas( style) 
              </li>
              <li className="pl-4">
                In-depth study on accompaniment with different styles of Indian classical and other genres of music.
              </li>
              <li className="pl-4">
                In-depth practice of improvisation and Tehais and other Talas e.g. DHAMAR (14 beats), Joy Tala (13 beats) , Chowtala( 12 beats)
              </li>
              <span className="text-lg font-medium">Learning Outcomes </span>
              <br></br>
              <li className="pl-4 font-medium">
                Teach under Dhwani’s numerous outlets
              </li>
              <li className="pl-4">
                Be a Master of this Art
              </li>
              <li className="pl-4">
                Play like a professional musician’s standard
              </li>
              <li className="pl-4">
                Get concerts from Dhwani events depending on availability and workshops.  
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CardContent>
  );
};

