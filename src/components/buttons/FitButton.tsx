import React from 'react'

interface FitButtonProps {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
}

const FitButton = ({
    text,
    onClick,
    type = "button",
    className = "",
}: FitButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-6 py-2 bg-primaryColor text-white font-medium rounded-xl shadow-md hover:bg-secondaryColor active:scale-95 transition duration-200 cursor-pointer ${className}`}
        >
            {text}
        </button>
    )
}

export default FitButton