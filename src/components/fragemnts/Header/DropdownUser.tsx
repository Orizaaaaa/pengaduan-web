"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { capitalizeWords } from "@/utils/helper";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  // Mengambil data dari localStorage setelah komponen dirender di client
  useEffect(() => {
    setName(localStorage.getItem("name"));
    setRole(localStorage.getItem("role"));
    setImage(localStorage.getItem("image"));
  }, []);

  const trigger = useRef<HTMLAnchorElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(event.target as Node) ||
        trigger.current.contains(event.target as Node)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-4"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {name ? capitalizeWords(name) : "User"}
          </span>
          <span className="block text-xs">
            {role ? capitalizeWords(role) : "Pengguna"}
          </span>
        </span>

        <span className="h-12 w-12">
          <img className='rounded-full object-cover w-full h-full'
            src={image || 'https://i.pinimg.com/564x/0f/78/5d/0f785d55cea2a407ac8c1d0c6ef19292.jpg'}
            onError={(e: any) => {
              e.target.src = 'https://i.pinimg.com/564x/0f/78/5d/0f785d55cea2a407ac8c1d0c6ef19292.jpg';
            }} alt="user" />
        </span>
      </div>


    </div>
  );
};

export default DropdownUser;
