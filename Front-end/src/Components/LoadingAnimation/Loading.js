import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./flight-loading.json";
export default function Loading() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return <Lottie options={defaultOptions} height={400} width={400} />;
}
