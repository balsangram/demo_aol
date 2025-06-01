import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IRootState } from "../../store";
import { toggleSidebar } from "../../store/themeConfigSlice";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import logo from "../../../public/assets/logo/AOL LOGO BANGALORE ASHRAM BLACK.png";
import GlobalSearch from "../search/GlobalSearch";
import moment from "moment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import favouriteImg from "../../../src/assets/icon/favourite.png";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  // display_all_notification,
  display_sos,
  display_user_notification,
} from "../../allapi/api";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

interface NotificationItem {
  title?: string;
  body?: string;
  createdAt?: string;
  [key: string]: any;
}

const Header = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [sosNo, SetSosNo] = useState();
  const notificationRef = useRef<HTMLDivElement>(null);

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!notificationOpen) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `${display_user_notification}/${userId}`
        );

        const formattedNotifications = response.data.data.map(
          (notification: NotificationItem) => {
            const [day, month, year, time] =
              notification.createdAt?.split(/[- ]/) || [];
            const correctDate = `${year}-${month}-${day}T${time}`;
            const dateTime = new Date(correctDate);

            const now = new Date();
            let formattedDate;

            if (dateTime.toDateString() === now.toDateString()) {
              formattedDate = dateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
            } else if (dateTime > new Date(now.setDate(now.getDate() - 7))) {
              formattedDate = moment(
                `${day}-${month}-${year} ${time}`,
                "DD-MM-YYYY HH:mm:ss"
              ).fromNow();
            } else {
              formattedDate = dateTime.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            }

            return { ...notification, formattedDate };
          }
        );

        setNotifications(formattedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [notificationOpen, userId]);

  useEffect(() => {
    axios
      .get(display_sos)
      .then((response) => {
        SetSosNo(response.data.phoneNumber);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
    };

    if (notificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationOpen]);

  return (
    <>
      <header
        className={`z-40 ${
          themeConfig.semidark && themeConfig.menu === "horizontal"
            ? "dark"
            : ""
        }`}
      >
        <div className="shadow-sm z-[4] bg-[#A7E6F8]">
          <div className="relative flex lg:justify-between w-full items-center sm:px-5 py-2.5">
            {/* Menu Button */}
            <div className="w-[20%] sm:w-[30%]  lg:w-[40%]  ">
              <button
                type="button"
                className="m-auto collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                onClick={() => dispatch(toggleSidebar())}
              >
                <MenuIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Logo */}
            <div className="ml-4 sm:w-[35%]  w-[45%] lg:w-[20%] m-auto horizontal-logo flex  lg:hidden justify-center items-center  rtl:ml-2 ">
              <Link
                to="/"
                className="main-logo flex items-center shrink-0 pl-3"
              >
                <img
                  className="w-32 ml-[1.8rem] md:ml-[1.5rem] lg:ml-[-1rem] sm:ml-0  inline"
                  src={logo}
                  alt="logo"
                />
              </Link>
            </div>

            {/* Right side: Notification + Search */}
            <div className="w-[35%] sm:w-[25%] lg:w-[40%] flex sm:justify-end items-center flex-row-reverse relative ">
              {/* Notification Icon */}
              <div
                className="w-10 px-4 h-10 flex items-center justify-center cursor-pointer relative"
                onClick={() => setNotificationOpen(!notificationOpen)}
              >
                <NotificationsNoneIcon className="text-[#050916] " />
                {notifications.length > 0 && <></>}
              </div>

              {/* Notification Dropdown */}
              {notificationOpen && (
                <div
                  ref={notificationRef}
                  className="absolute top-14 right-0 z-50 bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4 w-80 max-h-96 overflow-y-auto mr-2 sm:mr-0"
                >
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Notifications
                  </h4>
                  {loading ? (
                    <p className="text-gray-600 dark:text-white">Loading...</p>
                  ) : notifications.length > 0 ? (
                    <ul className="space-y-2">
                      {notifications.map((note, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 dark:text-white border-b pb-1"
                        >
                          <strong>{note.title || "Untitled"}</strong>
                          <div>{note.body || "No content"}</div>
                          <div className="w-full flex flex-row-reverse text-xs text-gray-500">
                            {note.formattedDate || ""}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 dark:text-white">
                      No new notifications
                    </p>
                  )}
                </div>
              )}

              <div className="mx-2">
                {/* <FavoriteIcon className="text-red-500" /> */}
                <Link to={"/favourite"} className="">
                  <img
                    src={favouriteImg}
                    alt=""
                    className="h-8 w-[8rem] sm:w-[9rem] md:w-[4rem] xl:w-[3rem]"
                  />
                </Link>
              </div>
              <a href={`tel:${sosNo}`}>
                <button className="text-red-500 font-bold font-poppins p-0 sm:p-4">
                  SOS
                </button>
              </a>

              {/* Search */}
              <div className="w-full flex abs">
                <GlobalSearch />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
