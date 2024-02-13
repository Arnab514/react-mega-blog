import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button  className={`${textColor} ${bgColor} hover:bg-${bgColorSplit[1]}-${Number(bgColorSplit[2])+200} font-bold py-2 px-4 rounded ${className}`} {...props}>
            {children}
        </button>
    );
}