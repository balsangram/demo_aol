import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { toggleSidebar } from "../../store/themeConfigSlice";
import { IRootState } from "../../store";
import { useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HomeIcon from "@mui/icons-material/Home";
import logo from "../../../public/assets/logo/AOL LOGO BANGALORE ASHRAM BLACK.png";
import LaunchIcon from "@mui/icons-material/Launch";
import LiveTvIcon from "@mui/icons-material/LiveTv";

const Sidebar = () => {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any =
          ul.closest("li.menu").querySelectorAll(".nav-link") || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className={semidark ? "dark" : ""}>
      <nav
        className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div
          className="bg-white dark:bg-black h-full"
          style={
            {
              // backgroundImage: "linear-gradient(0deg, #ECA55A , #fff)",
            }
          }
        >
          <div className="flex justify-between items-center px-4 py-3">
            <NavLink
              to="/"
              className="main-logo flex items-center shrink-0 justify-center"
            >
              <img
                className="w-32 m-auto ml-10 flex-none"
                src={logo}
                alt="logo"
              />
            </NavLink>

            <button
              type="button"
              className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <KeyboardArrowDownIcon className="m-auto rotate-90" />
            </button>
          </div>
          <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
              <li className="nav-item">
                <ul>
                  <li className="nav-item">
                    <NavLink to="/" className="group">
                      <div className="flex items-center gap-2">
                        <HomeIcon />
                        {/* <FiGrid className="group-hover:!text-primary shrink-0" /> */}
                        <span>{t("Home")}</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/internal" className="group">
                      <div className="flex items-center gap-2">
                        <LaunchIcon />
                        {/* <FiGrid className="group-hover:!text-primary shrink-0" /> */}
                        <span>{t("Internal Logins")}</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/live_link" className="group">
                      <div className="flex items-center gap-2">
                        <LiveTvIcon />
                        {/* <FiGrid className="group-hover:!text-primary shrink-0" /> */}
                        <span>{t("Live Video")}</span>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
