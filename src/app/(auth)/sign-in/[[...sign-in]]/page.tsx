import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="z-10">
        <SignIn />
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#6B19F0"
            fillOpacity="1"
            d="M0,192L0,320L160,320L160,256L320,256L320,160L480,160L480,288L640,288L640,192L800,192L800,32L960,32L960,192L1120,192L1120,160L1280,160L1280,32L1440,32L1440,320L1280,320L1280,320L1120,320L1120,320L960,320L960,320L800,320L800,320L640,320L640,320L480,320L480,320L320,320L320,320L160,320L160,320L0,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
