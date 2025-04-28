import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AirtableImageProps } from "@/types/project";
import Image from "next/image";
import * as React from "react";

export default function ProjectVisualsCarousel({
  images,
  width,
  height,
}: {
  images: AirtableImageProps[];
  width?: number;
  height?: number;
}) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image
                      width={width}
                      height={height}
                      src={image.url}
                      alt="Project Visual"
                      className="object-contain"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 l">
                  <p className="text-sm font-light">Pas d&apos;images</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
