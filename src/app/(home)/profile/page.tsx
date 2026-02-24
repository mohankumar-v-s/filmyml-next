import { LogOut } from 'lucide-react'
import React from 'react'

export default function Profile() {
    return (
        <div className="py-[5rem] text-white p-2 flex flex-col justify-center items-center bg-[#111827]">
            <div className="flex">
                <img
                    className="h-32 w-32 rounded-full object-cover"
                    src={`/assets/avatar_default.jpg`}
                    alt="profile_pic"
                    height={128}
                    width={128}
                />
            </div>
            <div className="w-full md:w-96">
                <div className="w-full mt-10">
                    <p className="">User Name</p>
                    <p className="text-md py-4 pl-3 w-full rounded bg-gray-700">
                        @guest
                    </p>
                </div>
                <div className="w-full mt-8">
                    <p className="">Email</p>
                    <p className="text-md py-4 pl-3 w-full rounded bg-gray-700">
                        guest@gmail.com
                    </p>
                </div>
                <div className="w-full mt-8">
                    <p className="">PhoneNumber</p>
                    <p className="text-md py-4 pl-3 w-full rounded bg-gray-700">
                        9876543210
                    </p>
                </div>
                <div
                    className="w-full mt-8 cursor-pointer"
                >
                    <p className="text-xl flex items-center justify-center py-4 pl-3 w-full rounded bg-gray-700 hover:bg-gray-600">
                        <LogOut />
                        <span className="pl-2">Logout</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
