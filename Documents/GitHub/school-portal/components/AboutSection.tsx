"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import slider1 from "../public/pexels-cdc-library-3992949.jpg";
import slider2 from "../public/pexels-johny-rebel-the-explorer-panda-114076-357271.jpg";
import slider3 from "../public/pexels-mirrographer-1164572.jpg";
import slider4 from "../public/pexels-naomi-shi-374023-1001914.jpg";
import slider5 from "../public/pexels-pixabay-159775.jpg";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Banner } from "./Banner";

const images = [
    slider1,
    slider2,
    slider3,
    slider4,
    slider5,
];

export function AboutSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    return (
        <div className="relative mb-[10rem]"> {/* Added margin-bottom */}
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {images.map((src, index) => (
                        <CarouselItem key={index}>
                            <div>
                                <Card className="w-full  mx-auto"> {/* Added max-width and centered */}
                                    <CardContent className="flex items-center justify-center h-[30rem] relative">
                                        <Image
                                            src={src}
                                            alt={`Slider Image ${index + 1}`}
                                            layout="fill"
                                            objectFit="cover"
                                            className=""
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-teal-600" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-teal-600 " />
            </Carousel>
            <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2">
                <Banner />
            </div>
        </div>
    );
}