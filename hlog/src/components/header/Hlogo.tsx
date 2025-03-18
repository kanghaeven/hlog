import Link from "next/link";

const Hlogo = () => {
  return (
    <Link href="/" passHref className="no-underline">
      <div className="px-2 text-4xl leading-none cursor-pointer sm:px-1 sm:text-6xl text-primary">
        H
      </div>
    </Link>
  );
};

export default Hlogo;
