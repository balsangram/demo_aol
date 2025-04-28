import React, { useState } from "react";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import EditIcon from "@mui/icons-material/Edit";

interface Language {
  code: string;
  label: string;
}
function Profile() {
  const [editCard, setEditCard] = useState(false);

  const [name, setName] = useState(localStorage.getItem("username") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [aadhar, setAadhar] = useState(localStorage.getItem("aadhar") || "");

  // Edit Handlers
  const openEditModal = () => {
    setEditCard(true);
  };

  const closeEditModal = () => {
    setEditCard(false);
  };

  const saveEditedDetails = () => {
    localStorage.setItem("username", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("aadhar", aadhar);
    setEditCard(false);
  };

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<string>("");

  const languages: Language[] = [
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
    { code: "hi", label: "Hindi" },
    { code: "es", label: "Spanish" },
  ];

  const handleConfirm = () => {
    if (selectedLang) {
      console.log(`Language changed to: ${selectedLang}`);
      // Implement real logic like i18n.changeLanguage(selectedLang)
      setShowDropdown(false); // close the modal after confirming
    } else {
      alert("Please select a language!");
    }
  };

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
              PERSONAL DETAILS
            </h3>

            {/* Input Fields */}
            <input
              className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Aadhar"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full text-white transition"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full text-white transition"
                onClick={saveEditedDetails}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Section */}
      <h2 className="block sm:hidden pb-4 px-1 text-lg font-semibold">
        PROFILE
      </h2>

      <div className="bg-white rounded-lg p-4 max-w-3xl mx-auto mb-4">
        <h3
          className="pl-2 text-lg font-semibold"
          style={{ borderLeft: "5px solid black" }}
        >
          PERSONAL DETAILS
        </h3>

        <ul className="mt-4 space-y-4">
          <li className="flex items-center py-2 border-b border-gray-300">
            <PersonOutlineIcon className="mr-2" /> Name: {name}
          </li>
          <li className="flex items-center py-2 border-b border-gray-300">
            <MailOutlineIcon className="mr-2" /> Email: {email}
          </li>
          <li className="flex items-center py-2 border-b border-gray-300">
            <MobileFriendlyIcon className="mr-2" /> Phone: {phone}
          </li>
          <li className="flex items-center py-2">
            <CardMembershipIcon className="mr-2" /> Aadhar: {aadhar}
          </li>
        </ul>
      </div>

      {/* General Section */}
      <div className="bg-white rounded-lg p-4 max-w-3xl mx-auto">
        <h3
          className="pl-2 text-lg font-semibold"
          style={{ borderLeft: "5px solid black" }}
        >
          GENERAL
        </h3>

        <ul className="mt-4 space-y-4">
          <li className="flex items-center py-2 border-b border-gray-300">
            <button onClick={openEditModal} className="flex items-center">
              <EditIcon className="mr-2" /> Edit Profile
            </button>
          </li>
          <li className="relative list-none">
            <button
              onClick={() => setShowDropdown(true)}
              className="flex items-center"
            >
              <GTranslateIcon className="mr-2" /> Languages
            </button>

            {showDropdown && (
              <div
                className="fixed top-0 left-0 h-screen w-screen bg-black/50 flex items-center justify-center z-50"
                onClick={() => setShowDropdown(false)} // close when clicking outside
              >
                <div
                  onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                  className="bg-white p-8 rounded-lg shadow-lg w-80 text-center"
                >
                  <h2 className="text-2xl font-semibold mb-6">
                    Select Language
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
                          checked={selectedLang === lang.code}
                          onChange={(e) => setSelectedLang(e.target.value)}
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
                    Confirm
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
