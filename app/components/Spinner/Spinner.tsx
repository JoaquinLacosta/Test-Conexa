import Image from "next/image";
import LoaderImage from "../../assets/LoaderImage.png";

export default function Spinner() {
  return (
    <Image src={LoaderImage} priority={true} className="mx-auto animate-spin" alt="Spinner loader" width="100" height="100" />
  );
}
