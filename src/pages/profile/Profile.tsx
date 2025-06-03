import React, { useEffect, useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLanguage } from "../../context/LanguageContext";
import axios from "axios";
import { getUser, logout, updateUser } from "../../allapi/api";
import { useNavigate } from "react-router-dom";

interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  aadhar: string;
  [key: string]: any; // For any additional properties
}

interface Language {
  code: string;
  label: string;
}

interface Translations {
  [key: string]: {
    profile: string;
    personalDetails: string;
    name: string;
    email: string;
    phone: string;
    aadhar: string;
    editProfile: string;
    languages: string;
    cancel: string;
    save: string;
    selectLanguage: string;
    confirm: string;
    general: string;
    firstName: string;
    lastName: string;
    logOut: string;
  };
}

const Profile: React.FC = () => {
  const [editCard, setEditCard] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    aadhar: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const { language, setLanguage } = useLanguage();

  const languages: Language[] = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "kn", label: "Kannada" },
    { code: "ta", label: "Tamil" },
    { code: "te", label: "Telugu" },
    { code: "gu", label: "Gujarati" },
    { code: "mr", label: "Marathi" },
    { code: "ml", label: "Malayalam" },
    { code: "pa", label: "Punjabi" },
    { code: "bn", label: "Bengali" },
    { code: "ru", label: "Russian" },
    { code: "es", label: "Spanish" },
    { code: "zh", label: "Mandarin Chinese" },
    { code: "mn", label: "Mongolian" },
    { code: "pl", label: "Polish" },
    { code: "bg", label: "Bulgarian" },
    { code: "fr", label: "French" },
    { code: "de", label: "German" },
    { code: "nl", label: "Dutch" },
    { code: "it", label: "Italian" },
    { code: "pt", label: "Portuguese" },
    { code: "ja", label: "Japanese" },
    { code: "vi", label: "Vietnamese" },
  ];

 const translations: Translations = {
  en: {
    profile: "PROFILE",
    personalDetails: "PERSONAL DETAILS",
    name: "Name",
    email: "Email",
    phone: "Phone",
    aadhar: "Aadhar",
    editProfile: "Edit Profile",
    languages: "Languages",
    cancel: "Cancel",
    save: "Save",
    selectLanguage: "Select Language",
    confirm: "Confirm",
    general: "General",
    firstName: "First Name",
    lastName: "Last Name",
    logOut: "Log Out",
  },
  hi: {
    profile: "प्रोफ़ाइल",
    personalDetails: "व्यक्तिगत विवरण",
    name: "नाम",
    email: "ईमेल",
    phone: "फ़ोन",
    aadhar: "आधार",
    editProfile: "प्रोफ़ाइल संपादित करें",
    languages: "भाषाएँ",
    cancel: "रद्द करें",
    save: "सहेजें",
    selectLanguage: "भाषा चुनें",
    confirm: "पुष्टि करें",
    general: "सामान्य",
    firstName: "पहला नाम",
    lastName: "अंतिम नाम",
    logOut: "लॉग आउट",
  },
  kn: {
    profile: "ಪ್ರೊಫೈಲ್",
    personalDetails: "ವೈಯಕ್ತಿಕ ವಿವರಗಳು",
    name: "ಹೆಸರು",
    email: "ಇಮೇಲ್",
    phone: "ದೂರವಾಣಿ",
    aadhar: "ಆಧಾರ್",
    editProfile: "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ",
    languages: "ಭಾಷೆಗಳು",
    cancel: "ರದ್ದುಮಾಡಿ",
    save: "ಉಳಿಸಿ",
    selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",
    confirm: "ದೃಢೀಕರಿಸಿ",
    general: "ಸಾಮಾನ್ಯ",
    firstName: "ಮೊದಲ ಹೆಸರು",
    lastName: "ಕೊನೆಯ ಹೆಸರು",
    logOut: "ಲಾಗ್ ಔಟ್",
  },
  ta: {
    profile: "சுயவிவரம்",
    personalDetails: "தனிப்பட்ட விவரங்கள்",
    name: "பெயர்",
    email: "மின்னஞ்சல்",
    phone: "தொலைபேசி",
    aadhar: "ஆதார்",
    editProfile: "சுயவிவரத்தை திருத்து",
    languages: "மொழிகள்",
    cancel: "ரத்து செய்",
    save: "சேமிக்க",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    confirm: "உறுதி செய்",
    general: "பொது",
    firstName: "முதல் பெயர்",
    lastName: "கடைசி பெயர்",
    logOut: "வெளியேறு",
  },
  te: {
    profile: "ప్రొఫైల్",
    personalDetails: "వ్యక్తిగత వివరాలు",
    name: "పేరు",
    email: "ఇమెయిల్",
    phone: "ఫోన్",
    aadhar: "ఆధార్",
    editProfile: "ప్రొఫైల్ సవరించండి",
    languages: "భాషలు",
    cancel: "రద్దు చేయండి",
    save: "సేవ్ చేయండి",
    selectLanguage: "భాషను ఎంచుకోండి",
    confirm: "నిర్ధారించండి",
    general: "సాధారణ",
    firstName: "మొదటి పేరు",
    lastName: "చివరి పేరు",
    logOut: "లాగ్ అవుట్",
  },
  gu: {
    profile: "પ્રોફાઇલ",
    personalDetails: "વ્યક્તિગત વિગતો",
    name: "નામ",
    email: "ઇમેઇલ",
    phone: "ફોન",
    aadhar: "આધાર",
    editProfile: "પ્રોફાઇલ સંપાદિત કરો",
    languages: "ભાષાઓ",
    cancel: "રદ કરો",
    save: "સેવ કરો",
    selectLanguage: "ભાષા પસંદ કરો",
    confirm: "ખાતરી કરો",
    general: "સામાન્ય",
    firstName: "પ્રથમ નામ",
    lastName: "છેલ્લું નામ",
    logOut: "લૉગ આઉટ",
  },
  mr: {
    profile: "प्रोफाइल",
    personalDetails: "वैयक्तिक तपशील",
    name: "नाव",
    email: "ईमेल",
    phone: "फोन",
    aadhar: "आधार",
    editProfile: "प्रोफाइल संपादित करा",
    languages: "भाषा",
    cancel: "रद्द करा",
    save: "जतन करा",
    selectLanguage: "भाषा निवडा",
    confirm: "खात्री करा",
    general: "सामान्य",
    firstName: "पहिले नाव",
    lastName: "आडनाव",
    logOut: "बाहेर पडा",
  },
  ml: {
    profile: "പ്രൊഫൈൽ",
    personalDetails: "സ്വകാര്യ വിവരങ്ങൾ",
    name: "പേര്",
    email: "ഇമെയിൽ",
    phone: "ഫോൺ",
    aadhar: "ആധാർ",
    editProfile: "പ്രൊഫൈൽ എഡിറ്റ് ചെയ്യുക",
    languages: "ഭാഷകൾ",
    cancel: "റദ്ദാക്കുക",
    save: "സേവ് ചെയ്യുക",
    selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    confirm: "സ്ഥിരീകരിക്കുക",
    general: "പൊതുവായ",
    firstName: "പ്രഥമ നാമം",
    lastName: "അവസാന നാമം",
    logOut: "ലോഗ് ഔട്ട്",
  },
  pa: {
    profile: "ਪ੍ਰੋਫਾਈਲ",
    personalDetails: "ਨਿੱਜੀ ਵੇਰਵੇ",
    name: "ਨਾਂ",
    email: "ਈਮੇਲ",
    phone: "ਫ਼ੋਨ",
    aadhar: "ਆਧਾਰ",
    editProfile: "ਪ੍ਰੋਫਾਈਲ ਸੋਧੋ",
    languages: "ਭਾਸ਼ਾਵਾਂ",
    cancel: "ਰੱਦ ਕਰੋ",
    save: "ਸੇਵ ਕਰੋ",
    selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",
    confirm: "ਪੁਸ਼ਟੀ ਕਰੋ",
    general: "ਆਮ",
    firstName: "ਪਹਿਲਾ ਨਾਂ",
    lastName: "ਆਖਰੀ ਨਾਂ",
    logOut: "ਲਾਗ ਆਉਟ",
  },
  bn: {
    profile: "প্রোফাইল",
    personalDetails: "ব্যক্তিগত বিবরণ",
    name: "নাম",
    email: "ইমেল",
    phone: "ফোন",
    aadhar: "আধার",
    editProfile: "প্রোফাইল সম্পাদনা করুন",
    languages: "ভাষাসমূহ",
    cancel: "বাতিল",
    save: "সংরক্ষণ করুন",
    selectLanguage: "ভাষা নির্বাচন করুন",
    confirm: "নিশ্চিত করুন",
    general: "সাধারণ",
    firstName: "প্রথম নাম",
    lastName: "শেষ নাম",
    logOut: "লগ আউট",
  },
  ru: {
    profile: "ПРОФИЛЬ",
    personalDetails: "ЛИЧНЫЕ ДАННЫЕ",
    name: "Имя",
    email: "Эл. почта",
    phone: "Телефон",
    aadhar: "Аадхар",
    editProfile: "Редактировать профиль",
    languages: "Языки",
    cancel: "Отмена",
    save: "Сохранить",
    selectLanguage: "Выберите язык",
    confirm: "Подтвердить",
    general: "Общее",
    firstName: "Имя",
    lastName: "Фамилия",
    logOut: "Выйти",
  },
  es: {
    profile: "PERFIL",
    personalDetails: "DETALLES PERSONALES",
    name: "Nombre",
    email: "Correo electrónico",
    phone: "Teléfono",
    aadhar: "Aadhar",
    editProfile: "Editar perfil",
    languages: "Idiomas",
    cancel: "Cancelar",
    save: "Guardar",
    selectLanguage: "Seleccionar idioma",
    confirm: "Confirmar",
    general: "General",
    firstName: "Nombre",
    lastName: "Apellido",
    logOut: "Cerrar sesión",
  },
  zh: {
    profile: "个人资料",
    personalDetails: "个人详情",
    name: "姓名",
    email: "电子邮件",
    phone: "电话",
    aadhar: "阿达尔",
    editProfile: "编辑资料",
    languages: "语言",
    cancel: "取消",
    save: "保存",
    selectLanguage: "选择语言",
    confirm: "确认",
    general: "常规",
    firstName: "名",
    lastName: "姓",
    logOut: "登出",
  },
  mn: {
    profile: "Профайл",
    personalDetails: "Хувийн мэдээлэл",
    name: "Нэр",
    email: "Имэйл",
    phone: "Утас",
    aadhar: "Аадхар",
    editProfile: "Профайл засах",
    languages: "Хэлүүд",
    cancel: "Цуцлах",
    save: "Хадгалах",
    selectLanguage: "Хэлийг сонгох",
    confirm: "Баталгаажуулах",
    general: "Ерөнхий",
    firstName: "Нэр",
    lastName: "Овог",
    logOut: "Гарах",
  },
  pl: {
    profile: "PROFIL",
    personalDetails: "DANE OSOBOWE",
    name: "Imię",
    email: "Email",
    phone: "Telefon",
    aadhar: "Aadhar",
    editProfile: "Edytuj profil",
    languages: "Języki",
    cancel: "Anuluj",
    save: "Zapisz",
    selectLanguage: "Wybierz język",
    confirm: "Potwierdź",
    general: "Ogólne",
    firstName: "Imię",
    lastName: "Nazwisko",
    logOut: "Wyloguj się",
  },
  bg: {
    profile: "ПРОФИЛ",
    personalDetails: "ЛИЧНИ ДАННИ",
    name: "Име",
    email: "Имейл",
    phone: "Телефон",
    aadhar: "Аадхар",
    editProfile: "Редактиране на профил",
    languages: "Езици",
    cancel: "Отказ",
    save: "Запази",
    selectLanguage: "Изберете език",
    confirm: "Потвърди",
    general: "Общо",
    firstName: "Първо име",
    lastName: "Фамилия",
    logOut: "Изход",
  },
  fr: {
    profile: "PROFIL",
    personalDetails: "DÉTAILS PERSONNELS",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    aadhar: "Aadhar",
    editProfile: "Modifier le profil",
    languages: "Langues",
    cancel: "Annuler",
    save: "Enregistrer",
    selectLanguage: "Choisir la langue",
    confirm: "Confirmer",
    general: "Général",
    firstName: "Prénom",
    lastName: "Nom de famille",
    logOut: "Déconnexion",
  },
  de: {
    profile: "PROFIL",
    personalDetails: "PERSÖNLICHE DETAILS",
    name: "Name",
    email: "E-Mail",
    phone: "Telefon",
    aadhar: "Aadhar",
    editProfile: "Profil bearbeiten",
    languages: "Sprachen",
    cancel: "Abbrechen",
    save: "Speichern",
    selectLanguage: "Sprache auswählen",
    confirm: "Bestätigen",
    general: "Allgemein",
    firstName: "Vorname",
    lastName: "Nachname",
    logOut: "Abmelden",
  },
  nl: {
    profile: "PROFIEL",
    personalDetails: "PERSOONLIJKE GEGEVENS",
    name: "Naam",
    email: "E-mail",
    phone: "Telefoon",
    aadhar: "Aadhar",
    editProfile: "Profiel bewerken",
    languages: "Talen",
    cancel: "Annuleren",
    save: "Opslaan",
    selectLanguage: "Selecteer taal",
    confirm: "Bevestigen",
    general: "Algemeen",
    firstName: "Voornaam",
    lastName: "Achternaam",
    logOut: "Uitloggen",
  },
  it: {
    profile: "PROFILO",
    personalDetails: "DETTAGLI PERSONALI",
    name: "Nome",
    email: "Email",
    phone: "Telefono",
    aadhar: "Aadhar",
    editProfile: "Modifica profilo",
    languages: "Lingue",
    cancel: "Annulla",
    save: "Salva",
    selectLanguage: "Seleziona lingua",
    confirm: "Conferma",
    general: "Generale",
    firstName: "Nome",
    lastName: "Cognome",
    logOut: "Disconnettersi",
  },
  pt: {
    profile: "PERFIL",
    personalDetails: "DETALHES PESSOAIS",
    name: "Nome",
    email: "Email",
    phone: "Telefone",
    aadhar: "Aadhar",
    editProfile: "Editar perfil",
    languages: "Idiomas",
    cancel: "Cancelar",
    save: "Salvar",
    selectLanguage: "Selecionar idioma",
    confirm: "Confirmar",
    general: "Geral",
    firstName: "Primeiro nome",
    lastName: "Último nome",
    logOut: "Sair",
  },
  ja: {
    profile: "プロフィール",
    personalDetails: "個人情報",
    name: "名前",
    email: "メール",
    phone: "電話",
    aadhar: "アーダール",
    editProfile: "プロフィールを編集",
    languages: "言語",
    cancel: "キャンセル",
    save: "保存",
    selectLanguage: "言語を選択",
    confirm: "確認",
    general: "一般",
    firstName: "名",
    lastName: "姓",
    logOut: "ログアウト",
  },
};


  function handleLogout() {
    const userId = localStorage.getItem("userId"); // Make sure you're saving the device token in localStorage after login or FCM registration
    localStorage.clear();

    axios
      .patch(logout, { userId })
      .then((response) => {
        console.log(response, "response");
      })
      .catch((error) => {
        console.log("Logout API error:", error.response?.data || error.message);
      });
    // =====

    navigate("/login");
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${getUser}/${userId}`);
        setUserDetails(response.data.data);
        // Initialize form data with current user details
        setFormData({
          firstName: response.data.data.first_name || "",
          lastName: response.data.data.last_name || "",
          aadhar: response.data.data.aadhar || "",
        });
      } catch (err) {
        setError("Failed to fetch user details");
        console.error("Error fetching user details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleConfirm = () => {
    if (language) {
      localStorage.setItem("language", language);
      setShowDropdown(false);
    }
  };

  const openEditModal = () => setEditCard(true);
  const closeEditModal = () => setEditCard(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEditedDetails = async () => {
    try {
      const response = await axios.patch(`${updateUser}/${userId}`, {
        first_name: formData.firstName, // changed from firstName to first_name
        last_name: formData.lastName, // changed from lastName to last_name
        aadhar: formData.aadhar,
      });

      console.log("🚀 ~ saveEditedDetails ~ response:", response);

      // Update local user details
      if (userDetails) {
        setUserDetails({
          ...userDetails,
          first_name: formData.firstName,
          last_name: formData.lastName,
          aadhar: formData.aadhar,
        });
      }

      setEditCard(false);
    } catch (error) {
      console.error("❌ Error updating user:", error);
      setError("Failed to update user details");
    }
  };

  const getTranslation = (key: keyof Translations["en"]): string => {
    return translations[language]?.[key] || translations["en"][key];
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-red-500">
        {error}
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        No user data available
      </div>
    );
  }

  return (
    <div className="h-auto md:min-h-[70vh] px-4 py-8">
      {/* Edit Modal */}
      {editCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl relative font-poppins">
            <h3 className="pl-2 text-lg font-semibold border-l-4 border-black">
              {getTranslation("personalDetails")}
            </h3>

            <input
              className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="firstName"
              placeholder={getTranslation("firstName")}
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="lastName"
              placeholder={getTranslation("lastName")}
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <input
              className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="aadhar"
              placeholder={getTranslation("aadhar")}
              value={formData.aadhar}
              onChange={handleInputChange}
            />

            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full text-white transition"
                onClick={closeEditModal}
              >
                {getTranslation("cancel")}
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full text-white transition"
                onClick={saveEditedDetails}
              >
                {getTranslation("save")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Section */}
      <h2 className="block sm:hidden pb-4 px-1 text-lg font-semibold">
        {getTranslation("profile")}
      </h2>

      <div className="bg-white rounded-lg p-4 max-w-3xl mx-auto mb-4">
        <h3 className="pl-2 text-lg font-semibold border-l-4 border-black">
          {getTranslation("personalDetails")}
        </h3>

        <ul className="mt-4 space-y-4">
          <li className="flex items-center py-2 border-b border-gray-300">
            <PersonOutlineIcon className="mr-2" /> {getTranslation("name")}:{" "}
            {userDetails.first_name} {userDetails.last_name}
          </li>

          <li className="flex items-center py-2 border-b border-gray-300">
            <MailOutlineIcon className="mr-2" /> {getTranslation("email")}:{" "}
            {userDetails.email}
          </li>
          <li className="flex items-center py-2 border-b border-gray-300">
            <MobileFriendlyIcon className="mr-2" /> {getTranslation("phone")}:{" "}
            {userDetails.phone}
          </li>
          <li className="flex items-center py-2">
            <CardMembershipIcon className="mr-2" /> {getTranslation("aadhar")}:{" "}
            {userDetails.aadhar}
          </li>
        </ul>
      </div>

      {/* General Section */}
      <div className="bg-white rounded-lg p-4 max-w-3xl mx-auto">
        <h3 className="pl-2 text-lg font-semibold border-l-4 border-black">
          {getTranslation("general")}
        </h3>

        <ul className="mt-4 space-y-4">
          <li className="flex items-center py-2 border-b border-gray-300">
            <button
              onClick={openEditModal}
              className="flex items-center hover:text-blue-500 transition"
            >
              <EditIcon className="mr-2" /> {getTranslation("editProfile")}
            </button>
          </li>
          <li className=" relative list-none py-2 border-b border-gray-300">
            <button
              onClick={() => setShowDropdown(true)}
              className="flex items-center hover:text-blue-500 transition"
            >
              <GTranslateIcon className="mr-2" /> {getTranslation("languages")}
            </button>

            {showDropdown && (
              <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setShowDropdown(false)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white p-8 rounded-lg shadow-lg w-80 text-center"
                >
                  <h2 className="text-2xl font-semibold mb-6">
                    {getTranslation("selectLanguage")}
                  </h2>
                  <ul className="space-y-4 text-left h-[15rem] overflow-y-auto">
                    {languages.map((lang) => (
                      <li
                        key={lang.code}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          id={lang.code}
                          name="language"
                          value={lang.code}
                          checked={language === lang.code}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="cursor-pointer"
                        />
                        <label htmlFor={lang.code} className="cursor-pointer">
                          {lang.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleConfirm}
                    className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
                  >
                    {getTranslation("confirm")}
                  </button>
                </div>
              </div>
            )}
          </li>
          <li className="flex items-center py-2 ">
            <button onClick={handleLogout} className="flex items-center ">
              <LogoutIcon className="mr-2" /> {getTranslation("logOut")}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
