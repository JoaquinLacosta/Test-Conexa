import { useState } from "react";

interface AccordionProps {
  children: React.ReactNode;
  title: string;
  titleClassName?: string;
}

export default function Accordion({
  children,
  title,
  titleClassName,
}: AccordionProps) {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div className="w-full mb-4 transition-all duration-200 border-2 bg-transparent rounded-lg hover:shadow-md hover:shadow-neutral-300">
      <button
        className="w-full relative text-left p-1 py-5 border-0 outline-none bg-transparent cursor-pointer"
        onClick={toggle}
        type="button"
      >
        <h2 className={`text-2xl font-bold ${titleClassName}`}>{title}</h2>
      </button>
      <div
        className="overflow-hidden transition-all ease duration-500"
        style={{
          maxHeight: isShowing ? "0px" : "3500px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
