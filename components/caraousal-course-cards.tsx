"use client";

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

const CaraousalCourseCard = () => {
  return (
    <Card
      id="module"
      className="w-full bg-transparent shadow-none border-none mt-6"
    >
      <CardHeader className="px-0 w-full flex flex-row justify-between items-start gap-2">
        <CardTitle className="text-2xl">Course Modules</CardTitle>
      </CardHeader>

      {/* Responsive grid layout replacing carousel */}
      <CardContent className="px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DhwaniBhusanCourse />
          <DhwaniBibhusanCourse />
          <DhwaniRatnaCourse />
        </div>
      </CardContent>
    </Card>
  );
};

export default CaraousalCourseCard;

const DhwaniBhusanCourse = () => {
  return (
    <Card className="h-full bg-transparent border-none shadow-none w-full py-0">
      <CardContent className="px-0">
        <div className="flex flex-col justify-start items-start gap-4 bg-primary p-4 rounded-lg shadow-sm">
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
              <div className="w-full flex flex-col gap-2">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="flex py-2 px-4 bg-white text-primary"
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

                {/* Instructor name below badges */}
                <span className="text-sm tablet:text-base desktop:text-lg">
                  By Pandit Abhijit Banerjee
                </span>
              </div>

              <CardHeader className="px-0 mt-2">
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

          {/* About the Course section */}
          <div className="w-full flex flex-col justify-start items-start text-white gap-2 py-4 -mx-4 px-4">
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
              <br />
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
      </CardContent>
    </Card>
  );
};

const DhwaniBibhusanCourse = () => {
  return (
    <Card className="h-full bg-transparent border-none shadow-none w-full py-0">
      <CardContent className="px-0">
        <div className="flex flex-col justify-start items-start gap-4 bg-primary p-4 rounded-lg shadow-sm">
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
              <div className="w-full flex flex-col gap-2">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2">
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

                {/* Instructor name below badges */}
                <span className="text-sm tablet:text-base desktop:text-lg">
                  By Pandit Abhijit Banerjee
                </span>
              </div>

              <CardHeader className="px-0 mt-2">
                <CardTitle className="text-xl">Dhwani Bibhusan</CardTitle>
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

          {/* About the Course section */}
          <div className="w-full flex flex-col justify-start items-start text-white gap-2 py-4 -mx-4 px-4">
            <h1 className="text-3xl font-semibold">About the Course</h1>
            <ul className="list-disc list-inside text-base">
              <span className="text-lg font-medium">Course Description</span>
              <li className="pl-4">
                Traditional compositions of Different Talas.
              </li>
              <li className="pl-4">
                Talas details: Roopak (7 beats), Keharwa (8 Beats),Matta Tala(9
                beats), jhap tala(10 Beats), Chartal ki sawari (11 beats) ektal
                (12 beats), Ada Chawtala (14 beats), teen tala, compositions.
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
              <br />
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
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DhwaniRatnaCourse = () => {
  return (
    <Card className="h-full bg-transparent border-none shadow-none w-full py-0">
      <CardContent className="px-0">
        <div className="flex flex-col justify-start items-start gap-4 bg-primary p-4 rounded-lg shadow-sm">
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
              <div className="w-full flex flex-col gap-2">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2">
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

                {/* Instructor name below badges */}
                <span className="text-sm tablet:text-base desktop:text-lg">
                  By Pandit Abhijit Banerjee
                </span>
              </div>

              <CardHeader className="px-0 mt-2">
                <CardTitle className="text-xl">Dhwani Ratna</CardTitle>
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

          {/* About the Course section */}
          <div className="w-full flex flex-col justify-start items-start text-white gap-2 py-4 -mx-4 px-4">
            <h1 className="text-3xl font-semibold">About the Course</h1>
            <span>AVAILABLE ONLY CLASSES ONLINE OR IN-PERSON.</span>
            <ul className="list-disc list-inside text-base">
              <span className="text-lg font-medium">Course Description</span>
              <li className="pl-4">
                Detailed study with practice of different Talas
              </li>
              <li className="pl-4">Rhythmic Variations</li>
              <li className="pl-4">
                Learning of subtilities of different Gharanas (style)
              </li>
              <li className="pl-4">
                In-depth study on accompaniment with different styles of Indian
                classical and other genres of music.
              </li>
              <li className="pl-4">
                In-depth practice of improvisation and Tehais and other Talas
                e.g. DHAMAR (14 beats), Joy Tala (13 beats), Chowtala (12 beats)
              </li>
              <span className="text-lg font-medium">Learning Outcomes</span>
              <br />
              <li className="pl-4 font-medium">
                Teach under Dhwani’s numerous outlets
              </li>
              <li className="pl-4">Be a Master of this Art</li>
              <li className="pl-4">
                Play like a professional musician’s standard
              </li>
              <li className="pl-4">
                Get concerts from Dhwani events depending on availability and
                workshops.
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};