import {ReactNode} from "react";
import ListContextProvider from "@/app/lists/ListsContext";

export default function ListsLayout({children}: { children: ReactNode }) {

    return (
        <ListContextProvider>
            {children}
        </ListContextProvider>
    );
}