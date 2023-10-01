import { useState } from "react";

interface AccordionProps {
  children: React.ReactNode;
  title: string;
  childrenContainerClassName?: string;
  titleClassName?: string;
}

export default function Accordion({
  children,
  title,
  titleClassName,
  childrenContainerClassName,
}: AccordionProps) {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div
      data-testid="accordion-component"
      className="w-full mb-4 transition-all duration-200 border-2 bg-transparent rounded-lg hover:shadow-md hover:shadow-neutral-300"
    >
      <button
        className="w-full relative text-left p-1 py-5 border-0 outline-none bg-transparent cursor-pointer"
        data-testid="accordion-button"
        onClick={toggle}
        type="button"
      >
        <h2 className={`text-2xl font-bold ${titleClassName}`}>{title}</h2>
      </button>
      <div
        data-testid="accordion-content"
        className={`overflow-hidden transition-all ease duration-500 overflow-y-scroll ${childrenContainerClassName}`}
        style={{
          maxHeight: isShowing ? "0rem" : "50rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}
