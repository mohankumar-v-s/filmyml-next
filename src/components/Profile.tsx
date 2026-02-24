import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Profile() {
    // const [value, setValue] = React.useState("");
    const PROFILE_PATH = "/assets/avatar_default.jpg";

    //useeffect

    return (
        <div className="top-5 right-5">
            <div className="relative inline-block">
                <Link href="/profile">
                    <img
                        className="h-10 w-10 rounded-full select-none"
                        src={`${PROFILE_PATH}`}
                        alt="profile_pic"
                        width={40}
                        height={40}
                    />
                </Link>
            </div>
        </div>
    );
}
