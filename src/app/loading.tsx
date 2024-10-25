import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import { mkpp } from "./image";

export default function Loading() {
    return (
        <div className="min-h-[100vh] flex container mx-auto justify-center items-center">
            <div className="flex flex-col gap-5">
                <div className="w-50 h-30">
                    <Image className="h-full w-full" src={mkpp} alt="logo mkpp" />
                </div>
                <Spinner size="lg" />
            </div>
        </div>
    );
}