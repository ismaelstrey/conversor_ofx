import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`bg-white shadow-md rounded-2xl p-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ children }: { children: ReactNode }) {
    return <div className="border-b pb-2 mb-2 font-semibold text-gray-700">{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }) {
    return <h3 className="text-lg font-bold">{children}</h3>;
}

export function CardContent({ children, className }: { children: ReactNode, className?: string }) {
    return <div className={className}>{children}</div>;
}
