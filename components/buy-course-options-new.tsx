"use client";

import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { pricing } from "@/data/constants/pricing-checkout";
import { createStripeCheckoutSession } from "@/action/stripe-checkout";

type propsType = {
  id: number;
  name: string;
  lengthInYears: number;
};

const BuyingOptionsNew = ({ course }: { course: propsType }) => {
  const [country, setCountry] = useState<string>("DEFAULT");

  useEffect(() => {
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
  const handleCheckout = async (
    courseName: string,
    plan: string,
    amount: number,
    type: string
  ) => {
    try {
      const res = await createStripeCheckoutSession(
        courseName,
        plan,
        type,
        amount
      );

      if (res.success) {
        window.location.href = res.url; // Redirect to Stripe Checkout
      } else {
        console.error("Error creating checkout session:", res.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const coursePricing = pricing.find((c) => c.courseName === course.name);

  if (!coursePricing) {
    <div>No pricing available for this course</div>;
  }

  return (
    <div className="w-full flex flex-col justify-start items-start gap-6">
      <Label>Choose Options</Label>
      <Card className="w-full bg-transparent shadow-none border-none mt-6">
        <CardContent className="px-0">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-x-4 gap-y-6">
            {coursePricing?.priceModule.map((priceModel, index) => {
              return (
                <Card
                  key={index}
                  className="relative w-full pb-0 flex flex-col justify-between rounded-sm bg-primary text-white shadow-none border border-muted/20"
                >
                  {priceModel.billedType === 'Full Course' && (
                    <span
                      className="absolute left-2 -top-2 w-12 px-1 pt-2 pb-4 rounded-sm bg-yellow-500 text-xs text-center font-bold text-[#111111]"
                      style={{
                        clipPath:
                          "polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%)",
                      }}
                    >
                      Best Value
                    </span>
                  )}
                  {priceModel.billedType === 'Monthly' && (
                    <span
                      className="absolute left-2 -top-2 w-12 px-1 pt-2 pb-4 rounded-sm bg-yellow-500 text-xs text-center font-bold text-[#111111]"
                      style={{
                        clipPath:
                          "polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%)",
                      }}
                    >
                      Most Popular
                    </span>
                  )}
                  <CardHeader className="flex justify-start items-center gap-4">
                    <Button className="bg-primary w-32 rounded-sm cursor-default shadow-none text-2xl text-wrap font-semibold uppercase">
                      {/* {priceModel.name} */}
                      {priceModel.billedType}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col justify-center items-center gap-2">
                      {priceModel.originalPrice && priceModel.save && (
                        <span className="flex flex-col justify-center items-center text-white opacity-60">
                          <span className="line-through">
                            ${priceModel.originalPrice}
                          </span>
                          <span className="text-xs">
                            You save ${priceModel.save}
                          </span>
                        </span>
                      )}
                      <span className="drop-shadow-3xl">
                        <span className="text-4xl font-semibold">
                          {country === "IN"
                            ? priceModel.priceIn
                            : `${priceModel.priceDefault}`}
                        </span>
                        {priceModel.type !== "Course" && (
                          <span className="lowercase text-base">
                            /{priceModel.type}
                          </span>
                        )}
                      </span>
                      <span className="text-white opacity-60">
                        {priceModel.billedAs}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/buy-course" className="w-full">
                      <Button
                        onClick={() =>
                          handleCheckout(
                            course.name,
                            priceModel.plan,
                            priceModel.amount,
                            priceModel.type
                          )
                        }
                        className="w-full bg-white text-primary hover:bg-muted"
                      >
                        Join Now
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyingOptionsNew;
