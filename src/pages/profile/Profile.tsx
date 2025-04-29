import React, { useEffect, useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import EditIcon from "@mui/icons-material/Edit";
import { useLanguage } from "../../context/LanguageContext";

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
    general?: string; // Added since it's used in the component
  };
}

function Profile() {
  const [editCard, setEditCard] = useState(false);
  const [name, setName] = useState(localStorage.getItem("username") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [aadhar, setAadhar] = useState(localStorage.getItem("aadhar") || "");
  const [showDropdown, setShowDropdown] = useState(false);

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
    },
    hi: {
      profile: "प्रोफाइल",
      personalDetails: "व्यक्तिगत विवरण",
      name: "नाम",
      email: "ईमेल",
      phone: "फोन",
      aadhar: "आधार",
      editProfile: "प्रोफाइल संपादित करें",
      languages: "भाषाएँ",
      cancel: "रद्द करें",
      save: "सहेजें",
      selectLanguage: "भाषा चुनें",
      confirm: "पुष्टि करें",
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
      cancel: "ರದ್ದುಗೊಳಿಸು",
      save: "ಉಳಿಸಿ",
      selectLanguage: "ಭಾಷೆ ಆರಿಸಿ",
      confirm: "ದೃಢೀಕರಿಸಿ",
    },
    ta: {
      profile: "சுயவிவரம்",
      personalDetails: "பயனாளர் விவரங்கள்",
      name: "பெயர்",
      email: "மின்னஞ்சல்",
      phone: "தொலைபேசி",
      aadhar: "ஆதார்",
      editProfile: "சுயவிவரத்தை தொகுக்கவும்",
      languages: "மொழிகள்",
      cancel: "ரத்து செய்யவும்",
      save: "சேமிக்கவும்",
      selectLanguage: "மொழி தேர்வு செய்யவும்",
      confirm: "உறுதிப்படுத்தவும்",
    },
    te: {
      profile: "ప్రొఫైల్",
      personalDetails: "వ్యక్తిగత వివరాలు",
      name: "పేరు",
      email: "ఇమెయిల్",
      phone: "ఫోన్",
      aadhar: "ఆధార్",
      editProfile: "ప్రొఫైల్ సవరించు",
      languages: "భాషలు",
      cancel: "రద్దు చేయి",
      save: "సేవ్ చేయి",
      selectLanguage: "భాషను ఎంచుకోండి",
      confirm: "మంజూరు చేయి",
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
      confirm: "પુષ્ટિ કરો",
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
      save: "सुरक्षित करा",
      selectLanguage: "भाषा निवडा",
      confirm: "पुष्टी करा",
    },
    ml: {
      profile: "പ്രൊഫൈൽ",
      personalDetails: "വ്യക്തിഗത വിശദാംശങ്ങൾ",
      name: "പേര്",
      email: "ഇമെയിൽ",
      phone: "ഫോൺ",
      aadhar: "ആധാർ",
      editProfile: "പ്രൊഫൈൽ തിരുത്തുക",
      languages: "ഭാഷകൾ",
      cancel: "റദ്ദാക്കുക",
      save: "സേവ് ചെയ്യുക",
      selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
      confirm: "ഒപ്പിടുക",
    },
    pa: {
      profile: "ਪ੍ਰੋਫਾਈਲ",
      personalDetails: "ਵੈਕਤਿਕ ਵੇਰਵੇ",
      name: "ਨਾਮ",
      email: "ਈਮੇਲ",
      phone: "ਫੋਨ",
      aadhar: "ਆਧਾਰ",
      editProfile: "ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ",
      languages: "ਭਾਸ਼ਾਵਾਂ",
      cancel: "ਰੱਦ ਕਰੋ",
      save: "ਸੇਵ ਕਰੋ",
      selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",
      confirm: "ਪੁਸ਼ਟੀ ਕਰੋ",
    },
    bn: {
      profile: "প্রোফাইল",
      personalDetails: "ব্যক্তিগত বিবরণ",
      name: "নাম",
      email: "ইমেইল",
      phone: "ফোন",
      aadhar: "আধার",
      editProfile: "প্রোফাইল সম্পাদনা করুন",
      languages: "ভাষাসমূহ",
      cancel: "বাতিল করুন",
      save: "সংরক্ষণ করুন",
      selectLanguage: "ভাষা নির্বাচন করুন",
      confirm: "নিশ্চিত করুন",
    },
    ru: {
      profile: "Профиль",
      personalDetails: "Персональные данные",
      name: "Имя",
      email: "Электронная почта",
      phone: "Телефон",
      aadhar: "Адхар",
      editProfile: "Редактировать профиль",
      languages: "Языки",
      cancel: "Отменить",
      save: "Сохранить",
      selectLanguage: "Выберите язык",
      confirm: "Подтвердить",
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
    },
    zh: {
      profile: "个人资料",
      personalDetails: "个人信息",
      name: "姓名",
      email: "电子邮件",
      phone: "电话",
      aadhar: "Aadhar",
      editProfile: "编辑个人资料",
      languages: "语言",
      cancel: "取消",
      save: "保存",
      selectLanguage: "选择语言",
      confirm: "确认",
    },
    mn: {
      profile: "Профайл",
      personalDetails: "Хувийн мэдээлэл",
      name: "Нэр",
      email: "Имэйл",
      phone: "Утас",
      aadhar: "Адаар",
      editProfile: "Профайлыг засварлах",
      languages: "Хэлүүд",
      cancel: "Цуцлах",
      save: "Хадгалах",
      selectLanguage: "Хэл сонгох",
      confirm: "Баталгаажуулах",
    },
    pl: {
      profile: "PROFIL",
      personalDetails: "SZCZEGÓŁY OSOBOWE",
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
    },
    bg: {
      profile: "Профил",
      personalDetails: "Лични данни",
      name: "Име",
      email: "Имейл",
      phone: "Телефон",
      aadhar: "Аадхар",
      editProfile: "Редактирай профил",
      languages: "Езици",
      cancel: "Откажи",
      save: "Запази",
      selectLanguage: "Избери език",
      confirm: "Потвърди",
    },
    fr: {
      profile: "PROFIL",
      personalDetails: "DÉTAILS PERSONNELS",
      name: "Nom",
      email: "E-mail",
      phone: "Téléphone",
      aadhar: "Aadhar",
      editProfile: "Modifier le profil",
      languages: "Langues",
      cancel: "Annuler",
      save: "Sauvegarder",
      selectLanguage: "Sélectionner la langue",
      confirm: "Confirmer",
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
      selectLanguage: "Sprache wählen",
      confirm: "Bestätigen",
    },
    nl: {
      profile: "PROFIEL",
      personalDetails: "PERSOONLIJKE GEGEVENS",
      name: "Naam",
      email: "E-mail",
      phone: "Telefoon",
      aadhar: "Aadhar",
      editProfile: "Bewerk profiel",
      languages: "Talen",
      cancel: "Annuleren",
      save: "Opslaan",
      selectLanguage: "Selecteer taal",
      confirm: "Bevestigen",
    },
    it: {
      profile: "PROFILO",
      personalDetails: "DETTAGLI PERSONALI",
      name: "Nome",
      email: "E-mail",
      phone: "Telefono",
      aadhar: "Aadhar",
      editProfile: "Modifica profilo",
      languages: "Lingue",
      cancel: "Annulla",
      save: "Salva",
      selectLanguage: "Seleziona lingua",
      confirm: "Conferma",
    },
    pt: {
      profile: "PERFIL",
      personalDetails: "DETALHES PESSOAIS",
      name: "Nome",
      email: "E-mail",
      phone: "Telefone",
      aadhar: "Aadhar",
      editProfile: "Editar perfil",
      languages: "Idiomas",
      cancel: "Cancelar",
      save: "Salvar",
      selectLanguage: "Selecionar idioma",
      confirm: "Confirmar",
    },
    ja: {
      profile: "プロフィール",
      personalDetails: "個人情報",
      name: "名前",
      email: "メール",
      phone: "電話",
      aadhar: "Aadhar",
      editProfile: "プロフィールを編集",
      languages: "言語",
      cancel: "キャンセル",
      save: "保存",
      selectLanguage: "言語を選択",
      confirm: "確認",
    },
    vi: {
      profile: "HỒ SƠ",
      personalDetails: "THÔNG TIN CÁ NHÂN",
      name: "Tên",
      email: "Email",
      phone: "Điện thoại",
      aadhar: "Aadhar",
      editProfile: "Chỉnh sửa hồ sơ",
      languages: "Ngôn ngữ",
      cancel: "Hủy bỏ",
      save: "Lưu",
      selectLanguage: "Chọn ngôn ngữ",
      confirm: "Xác nhận",
    },
  };

  const handleConfirm = () => {
    if (language) {
      console.log(language, "language");

      localStorage.setItem("language", language);
      setLanguage(language);
      setShowDropdown(false);
    } else {
      alert("Please select a language!");
    }
  };

  const openEditModal = () => setEditCard(true);
  const closeEditModal = () => setEditCard(false);
  const saveEditedDetails = () => {
    localStorage.setItem("username", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("aadhar", aadhar);
    setEditCard(false);
  };

  // Type guard to ensure the language key exists in translations
  const getTranslation = (key: keyof Translations["en"]) => {
    if (language in translations) {
      return translations[language][key];
    }
    return translations["en"][key]; // fallback to English
  };

  // useEffect(() => {
  //   const savedLang = localStorage.getItem("language");
  //   if (savedLang) setLanguage(savedLang);
  // }, []);

  return (
    <div className="h-auto md:min-h-[70vh] px-4 py-8">
      {/* Edit Modal */}
      {editCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl relative">
            <h3
              className="pl-2 text-lg font-semibold"
              style={{ borderLeft: "5px solid black" }}
            >
              {getTranslation("personalDetails")}
            </h3>

            {/* Input Fields */}
            <input
              className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder={getTranslation("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder={getTranslation("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder={getTranslation("phone")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder={getTranslation("aadhar")}
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
            />

            {/* Buttons */}
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
        <h3
          className="pl-2 text-lg font-semibold"
          style={{ borderLeft: "5px solid black" }}
        >
          {getTranslation("personalDetails")}
        </h3>

        <ul className="mt-4 space-y-4">
          <li className="flex items-center py-2 border-b border-gray-300">
            <PersonOutlineIcon className="mr-2" /> {getTranslation("name")}:{" "}
            {name}
          </li>
          <li className="flex items-center py-2 border-b border-gray-300">
            <MailOutlineIcon className="mr-2" /> {getTranslation("email")}:{" "}
            {email}
          </li>
          <li className="flex items-center py-2 border-b border-gray-300">
            <MobileFriendlyIcon className="mr-2" /> {getTranslation("phone")}:{" "}
            {phone}
          </li>
          <li className="flex items-center py-2">
            <CardMembershipIcon className="mr-2" /> {getTranslation("aadhar")}:{" "}
            {aadhar}
          </li>
        </ul>
      </div>

      {/* General Section */}
      <div className="bg-white rounded-lg p-4 max-w-3xl mx-auto">
        <h3
          className="pl-2 text-lg font-semibold"
          style={{ borderLeft: "5px solid black" }}
        >
          {getTranslation("general")}
        </h3>

        <ul className="mt-4 space-y-4">
          <li className="flex items-center py-2 border-b border-gray-300">
            <button onClick={openEditModal} className="flex items-center">
              <EditIcon className="mr-2" /> {getTranslation("editProfile")}
            </button>
          </li>
          <li className="relative list-none">
            <button
              onClick={() => setShowDropdown(true)}
              className="flex items-center"
            >
              <GTranslateIcon className="mr-2" /> {getTranslation("languages")}
            </button>

            {showDropdown && (
              <div
                className="fixed top-0 left-0 h-screen w-screen bg-black/50 flex items-center justify-center z-50"
                onClick={() => setShowDropdown(false)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white p-8 rounded-lg shadow-lg w-80 text-center h-[60vh] overflow-y-scroll"
                >
                  <h2 className="text-2xl font-semibold mb-6">
                    {getTranslation("selectLanguage")}
                  </h2>
                  <ul className="space-y-4 text-left">
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
                    className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                  >
                    {getTranslation("confirm")}
                  </button>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
