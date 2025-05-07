import { type ReactNode } from "react";

interface ISocial{
    url:string;
    children: ReactNode;
}

export const Social = ({url, children}: ISocial) => {
    return(
        <a href={url}
        rel="noopener noreferrer"
        target="_blank">
            {children}
        </a>
    )
}