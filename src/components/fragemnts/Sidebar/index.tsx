"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NavigationList from "../NavigationList/NavigationList";
import { RxDashboard } from "react-icons/rx";
import { logo } from "@/app/image";
import Image from "next/image";
import ButtonSecondary from "@/components/elements/buttonSecondary";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { FaBookReader } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { IoMdPricetags } from "react-icons/io";
import { BsBuildingAdd } from "react-icons/bs";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  // Mengambil role dari localStorage hanya di client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('role');
      const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
      setRole(storedRole);
      setSidebarExpanded(storedSidebarExpanded === "true");
    }
  }, []);

  // close on click outside
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const clickHandler = ({ target }: MouseEvent) => {
        if (!sidebar.current || !trigger.current) return;
        if (
          !sidebarOpen ||
          sidebar.current.contains(target as Node) ||
          trigger.current.contains(target as Node)
        )
          return;
        setSidebarOpen(false);
      };
      document.addEventListener("click", clickHandler);
      return () => document.removeEventListener("click", clickHandler);
    }
  }, [sidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const keyHandler = ({ key }: KeyboardEvent) => {
        if (!sidebarOpen || key !== "Escape") return;
        setSidebarOpen(false);
      };
      document.addEventListener("keydown", keyHandler);
      return () => document.removeEventListener("keydown", keyHandler);
    }
  }, [sidebarOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
      if (sidebarExpanded) {
        document.querySelector("body")?.classList.add("sidebar-expanded");
      } else {
        document.querySelector("body")?.classList.remove("sidebar-expanded");
      }
    }
  }, [sidebarExpanded]);

  const route = useRouter();
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }
    route.push("/");
  };

  const setSidebar = (role: string | null) => {
    if (role === 'user') {
      return (
        <>
          <NavigationList icon={<RxDashboard size={19} />} title="Dasboard" pathname="/dashboard-user" />
          <NavigationList icon={<FaBookReader size={19} />} title="Laporan Saya" pathname="/laporan-saya-user" />
          <NavigationList icon={<FaBookOpen size={19} />} title="Semua Laporan" pathname="/semua-laporan-user" />
        </>
      );
    } else if (role === 'officer') {
      return (
        <>
          <NavigationList icon={<RxDashboard size={19} />} title="Dasboard" pathname="/dashboard-officer" />
          <NavigationList icon={<FaBookReader size={19} />} title="Laporan Saya" pathname="/laporan-saya-officer" />
        </>
      );
    } else if (role === 'super_admin') {
      return (
        <>
          <NavigationList icon={<RxDashboard size={19} />} title="Dasboard" pathname="/dashboard-admin" />
          <NavigationList icon={<FaBookOpen size={19} />} title="Laporan" pathname="/dashboard-admin/report" />
          <NavigationList icon={<AiOutlineUserSwitch size={19} />} title="Petugas" pathname="/dashboard-admin/officer" />
          <NavigationList icon={<IoMdPricetags size={19} />} title="Kategori" pathname="/kategori-admin" />
          <NavigationList icon={<BsBuildingAdd size={19} />} title="Unit Kerja" pathname="/unit-kerja-admin" />
        </>
      );
    }
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between lg:justify-center gap-2 px-6 py-5.5 lg:py-6.5">
        <div >
          <Image className="h-12" src={logo} alt="logo" />
        </div>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-5 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              {setSidebar('super_admin')}

              <ButtonSecondary className="w-full py-1 rounded-md font-medium" onClick={handleLogout}>Logout</ButtonSecondary>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
