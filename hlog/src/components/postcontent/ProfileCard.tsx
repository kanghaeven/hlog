import Image from "next/image";
import { profileInfo } from "@/constants/profile";

const ProfileCard = () => {
  return (
    <div className="p-6 my-16 rounded-lg bg-input border-soft border-[1px]">
      <div className="flex flex-col items-start justify-center gap-4">
        <div className="flex items-center gap-4">
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={64}
            height={64}
            className="w-10 h-10 m-0 rounded-full md:w-20 md:h-20"
          />
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-md">{profileInfo.name}</span>
            <span className="text-sm text-muted">{profileInfo.role}</span>
            <span className="hidden mt-3 text-sm md:block text-dusty">
              {profileInfo.description}
            </span>
          </div>
        </div>
        <span className="block text-sm md:hidden text-dusty">
          {profileInfo.description}
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
