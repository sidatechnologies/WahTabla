'use client'

import Image from "next/image";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "./ui/tabs";
import { useEffect, useState } from "react";

const PricingOld = () => {
  const [country, setCountry] = useState<string>("DEFAULT");

  useEffect(() => {
    // const fetchLocation = async () => {
    //   const location = await getUserLocation();
    //   setCountry(location.country);

    // };

    const fetchLocation = async () => {
      try {
        const response = await fetch("/api/location");
        const data = await response.json();
        setCountry(data.country);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
    fetchLocation();
  }, []);
  return (
    <Card
      id="pricing"
      className="w-full bg-transparent shadow-none border-none mt-6"
    >
      <Tabs defaultValue="monthly">
        <div className="flex flex-col tablet:flex-row justify-between items-end gap-2">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl">Our Pricing</CardTitle>
          </CardHeader>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </div>
        <CardContent className="bg-primary text-white pt-6 px-10 py-10 rounded-xl">
          <TabsContent value="monthly">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-6 md:gap-10 desktop:gap-x-28 desktop:gap-y-10 bg-primary">
              <Card className="pb-0 rounded-sm bg-primary text-white shadow-none border border-muted/20">
                <CardHeader className="flezx justify-start items-center gap-4">
                  <Button className="bg-background w-full rounded-sm text-xs text-tertiary-foreground hover:bg-background cursor-default shadow-none ">
                    Monthly Plan
                  </Button>
                  <span className="drop-shadow-3xl">
                    <span className="text-5xl font-semibold">
                      {country === "IN" ? "₹100" : "$100"}
                    </span>
                    <span className="text-sm">/month</span>
                  </span>
                </CardHeader>
                <CardContent className="pt-6 bg-primary text-white flex flex-col justify-center items-center gap-4">
                  <p>Available Features</p>
                  <div className="w-full sm:px-10 flex flex-col justify-center items-center gap-2">
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Pay as you learn</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Flexible monthly payments</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Cancel anytime</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Access to all current lessons</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Affordable for beginners</span>
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white text-primary hover:bg-muted">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
              <Card className="pb-0 rounded-sm bg-primary shadow-none border-muted/20">
                <CardHeader className="flezx justify-start items-center gap-4">
                  <Button className="bg-background w-full rounded-sm text-xs text-tertiary-foreground hover:bg-background cursor-default shadow-none border border-muted/20">
                    Module Plan
                  </Button>
                  <span className="drop-shadow-3xl">
                    <span className="text-5xl font-semibold text-white">
                      {country === "IN" ? "₹300" : "$300"}
                    </span>
                    <span className="text-sm text-white">/month</span>
                  </span>
                </CardHeader>
                <CardContent className="pt-6 bg-primary text-white flex flex-col justify-center items-center gap-4">
                  <p>Available Features</p>
                  <div className="w-full sm:px-10 flex flex-col justify-center items-center gap-2">
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>One-time payment per module</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Save more with bulk purchase</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Full access for 3 months</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Progress at your own pace</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Ideal for committed learners</span>
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white text-primary hover:bg-muted">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="yearly">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-6 md:gap-10 desktop:gap-x-28 desktop:gap-y-10">
              <Card className="pb-0 rounded-sm bg-primary shadow-none border-muted/20">
                <CardHeader className="flezx justify-start items-center gap-4">
                  <Button className="bg-background w-full rounded-sm text-xs text-tertiary-foreground hover:bg-background cursor-default shadow-none border border-muted/20">
                    Yearly Plan
                  </Button>
                  <span className="drop-shadow-3xl">
                    <span className="text-5xl font-semibold text-white">
                      {country === "IN" ? "₹1200" : "$1200"}
                    </span>
                    <span className="text-sm text-white">/year</span>
                  </span>
                </CardHeader>
                <CardContent className="pt-6 bg-primary text-white flex flex-col justify-center items-center gap-4">
                  <p>Available Features</p>
                  <div className="w-full sm:px-10 flex flex-col justify-center items-center gap-2">
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Pay as you learn</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Flexible monthly payments</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Cancel anytime</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Access to all current lessons</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Affordable for beginners</span>
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white text-primary hover:bg-muted">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
              <Card className="pb-0 rounded-sm bg-primary shadow-none border-muted/20">
                <CardHeader className="flezx justify-start items-center gap-4">
                  <Button className="bg-background w-full rounded-sm text-xs text-tertiary-foreground hover:bg-background cursor-default shadow-none border border-muted/20">
                    Module Plan
                  </Button>
                  <span className="drop-shadow-3xl">
                    <span className="text-5xl font-semibold text-white">
                      {country === "IN" ? "₹1100" : "$1100"}
                    </span>
                    <span className="text-sm text-white">/month</span>
                  </span>
                </CardHeader>
                <CardContent className="pt-6 bg-primary text-white flex flex-col justify-center items-center gap-4">
                  <p>Available Features</p>
                  <div className="w-full sm:px-10 flex flex-col justify-center items-center gap-2">
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>One-time payment per module</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Save more with bulk purchase</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Full access for 3 months</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Progress at your own pace</span>
                    </span>
                    <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                      <Image
                        src="/icons/tick.svg"
                        alt="tick"
                        width={0}
                        height={0}
                        className="w-6 p-1 bg-tertiary rounded-sm"
                      />
                      <span>Ideal for committed learners</span>
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white text-primary hover:bg-muted">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default PricingOld;
