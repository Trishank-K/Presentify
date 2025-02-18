import { SignUpForm } from "@/components/signup";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Cover } from "@/components/ui/cover";

export default function SignUp() {
  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl md:text-4xl md:w-2/3 lg:w-full lg:text-6xl font-semibold max-w-7xl relative z-20 text-center text-balance bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Build amazing presentations at <Cover>warp speed</Cover>
        </h1>
      </div>
      <div className="flex lg:items-center justify-center">
        <div className=" rounded-lg shadow-lg">
          <SignUpForm />
        </div>
      </div>
      <BackgroundBeams className="pointer-events-none" />
    </div>
  );
}
