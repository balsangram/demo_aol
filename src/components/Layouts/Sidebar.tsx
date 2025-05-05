import PerfectScrollbar from "react-perfect-scrollbar";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toggleSidebar } from "../../store/themeConfigSlice";
import { IRootState } from "../../store";
import { useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LaunchIcon from "@mui/icons-material/Launch";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../../../public/assets/logo/AOL LOGO BANGALORE ASHRAM BLACK.png";
import { useLanguage } from "../../context/LanguageContext";

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    Profile: "Profile",
    "Internal Logins": "Internal Logins",
    "Live Video": "Live Video",
    "Log Out": "Log Out",
  },
  hi: {
    Profile: "प्रोफ़ाइल",
    "Internal Logins": "आंतरिक लॉगिन",
    "Live Video": "लाइव वीडियो",
    "Log Out": "लॉग आउट",
  },
  kn: {
    Profile: "ಪ್ರೊಫೈಲ್",
    "Internal Logins": "ಆಂತರಿಕ ಲಾಗಿನ್",
    "Live Video": "ಲೈವ್ ವಿಡಿಯೋ",
    "Log Out": "ಲಾಗ್ ಔಟ್",
  },
  ta: {
    Profile: "பிரொபைல்",
    "Internal Logins": "உள்நாட்டு லாகின்கள்",
    "Live Video": "செயல்பாட்டு வீடியோ",
    "Log Out": "வெளியேறு",
  },
  te: {
    Profile: "ప్రొఫైల్",
    "Internal Logins": "ఆంతరిక లాగిన్లు",
    "Live Video": "లైవ్ వీడియో",
    "Log Out": "లాగ్ అవుట్",
  },
  gu: {
    Profile: "પ્રોફાઈલ",
    "Internal Logins": "આંતરિક લૉગિન",
    "Live Video": "લાઇવ વિડિયો",
    "Log Out": "લોગ આઉટ",
  },
  mr: {
    Profile: "प्रोफाइल",
    "Internal Logins": "आंतरिक लॉगिन",
    "Live Video": "लाइव्ह व्हिडिओ",
    "Log Out": "लॉग आऊट",
  },
  ml: {
    Profile: "പ്രൊഫൈൽ",
    "Internal Logins": "അന്തർഗത ലോഗിൻ",
    "Live Video": "ലൈവ് വീഡിയോ",
    "Log Out": "ലോഗ് ഔട്ട്",
  },
  pa: {
    Profile: "ਪਰੋਫਾਈਲ",
    "Internal Logins": "ਆਂਤਰਿਕ ਲੌਗਇਨ",
    "Live Video": "ਲਾਈਵ ਵੀਡੀਓ",
    "Log Out": "ਲੌਗ ਆਉਟ",
  },
  bn: {
    Profile: "প্রোফাইল",
    "Internal Logins": "অভ্যন্তরীণ লগইন",
    "Live Video": "লাইভ ভিডিও",
    "Log Out": "লগ আউট",
  },
  ru: {
    Profile: "Профиль",
    "Internal Logins": "Внутренние Логины",
    "Live Video": "Прямой Эфир",
    "Log Out": "Выйти",
  },
  es: {
    Profile: "Perfil",
    "Internal Logins": "Inicios de sesión internos",
    "Live Video": "Video en vivo",
    "Log Out": "Cerrar sesión",
  },
  zh: {
    Profile: "个人资料",
    "Internal Logins": "内部登录",
    "Live Video": "现场直播",
    "Log Out": "登出",
  },
  mn: {
    Profile: "Профайл",
    "Internal Logins": "Дотоод Нэвтрэлт",
    "Live Video": "Тамирын Видео",
    "Log Out": "Гарах",
  },
  pl: {
    Profile: "Profil",
    "Internal Logins": "Logowanie wewnętrzne",
    "Live Video": "Wideo na żywo",
    "Log Out": "Wyloguj",
  },
  bg: {
    Profile: "Профил",
    "Internal Logins": "Вътрешни влизания",
    "Live Video": "На живо видео",
    "Log Out": "Изход",
  },
  fr: {
    Profile: "Profil",
    "Internal Logins": "Connexions internes",
    "Live Video": "Vidéo en direct",
    "Log Out": "Se déconnecter",
  },
  de: {
    Profile: "Profil",
    "Internal Logins": "Interne Anmeldungen",
    "Live Video": "Live-Video",
    "Log Out": "Abmelden",
  },
  nl: {
    Profile: "Profiel",
    "Internal Logins": "Interne Inloggen",
    "Live Video": "Live Video",
    "Log Out": "Uitloggen",
  },
  it: {
    Profile: "Profilo",
    "Internal Logins": "Accessi interni",
    "Live Video": "Video in diretta",
    "Log Out": "Esci",
  },
  pt: {
    Profile: "Perfil",
    "Internal Logins": "Logins internos",
    "Live Video": "Vídeo ao vivo",
    "Log Out": "Sair",
  },
  ja: {
    Profile: "プロフィール",
    "Internal Logins": "内部ログイン",
    "Live Video": "ライブビデオ",
    "Log Out": "ログアウト",
  },
  vi: {
    Profile: "Hồ sơ",
    "Internal Logins": "Đăng nhập nội bộ",
    "Live Video": "Video trực tiếp",
    "Log Out": "Đăng xuất",
  },
};

const Sidebar = () => {
  const navigate = useNavigate();
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = themeConfig.semidark;
  const location = useLocation();
  const dispatch = useDispatch();
  const { language } = useLanguage();

  useEffect(() => {
    const selector = document.querySelector(
      `.sidebar ul a[href="${window.location.pathname}"]`
    );
    if (selector) {
      selector.classList.add("active");
      const ul = selector.closest("ul.sub-menu") as HTMLElement | null;
      if (ul) {
        const ele = ul.closest("li.menu")?.querySelectorAll(".nav-link");
        if (ele?.length) {
          setTimeout(() => {
            (ele[0] as HTMLElement).click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [location]);

  function handleLogout() {
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("phone");
    localStorage.removeItem("aadhar");
    console.log("Logged out successfully");
    navigate("/login");
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"][key] || key;
  };

  return (
    <div className={semidark ? "dark" : ""} style={{ zIndex: "99" }}>
      <nav
        className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="dark:bg-black h-full">
          <div className="flex justify-between items-center px-4 py-3 bg-[#A7E6F8]">
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

          <PerfectScrollbar className="h-[calc(100vh-80px)] relative bg-[#dbf3fa] pt-4">
            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
              <li className="nav-item font-poppins">
                <ul>
                  <li className="nav-item">
                    <NavLink
                      to="/profile"
                      className="group"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <PersonIcon />
                        <span>{t("Profile")}</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/internal"
                      className="group"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <LaunchIcon />
                        <span>{t("Internal Logins")}</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/live_link"
                      className="group"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <LiveTvIcon />
                        <span>{t("Live Video")}</span>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <div className="flex justify-center py-2 h-[50vh]">
                <button
                  className="bg-[#A7E6F8] hover:bg-[#88def5] px-6 rounded-lg py-3 font-bold font-poppins absolute bottom-0"
                  onClick={handleLogout}
                >
                  {t("Log Out")}
                </button>
              </div>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
