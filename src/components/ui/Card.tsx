import { cn } from "../../lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

export default function Card({ className, children, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-gray-100 p-6",
        hover && "transition-shadow duration-300 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

