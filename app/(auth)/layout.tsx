import Link from "next/link";
import { SpinningText } from "@/components/magicui/spinning-text";
import Image from "next/image";
import { FeaturesSectionWithHoverEffects } from "@/components/feature-section-with-hover-effects";
import React from "react";
import Spline from "@splinetool/react-spline";

const SplineComponent = React.memo(() => {
  return (
    <Spline
      className="absolute opacity-80"
      scene="https://prod.spline.design/A7BuU0farRvm1M6l/scene.splinecode"
    />
  );
});

SplineComponent.displayName = "SplineComponent";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="relative flex h-screen flex-row">
      <div className="absolute left-5 top-5 w-[70]">
        <Image
          src="/brand/logo.webp"
          alt="Platform Logo"
          width={25}
          height={25}
        />
      </div>

      <div className="flex flex-col w-full h-full">
        <main className="flex my-auto flex-col justify-center gap-[48] w-full max-w-[480px] mx-auto">
          {children}
        </main>
        <footer className="flex flex-col justify-center items-center py-4 dark:text-muted-foreground">
          <span className="text-xs">
            Copyright © {new Date().getFullYear()} Drako LTDA 57.428.819/0001-71
          </span>
          <div className="flex flex-row gap-[8]">
            <Link className="text-xs underline" href="#">
              Platform Agreement
            </Link>
            <Link className="text-xs underline" href="#">
              Privacy Policy
            </Link>
          </div>
        </footer>
      </div>
      <div className="relative hidden 2xl:flex w-full bg-black border-1">
        <SplineComponent />

        <div className=" w-full p-10 my-auto">
          <FeaturesSectionWithHoverEffects />
        </div>

        <SpinningText className="absolute right-16 bottom-16 text-white line-through leading-loose text-xs">
          APROVADO • POR • MILHARES DE • EMPRESAS •
        </SpinningText>
      </div>
    </div>
  );
}
