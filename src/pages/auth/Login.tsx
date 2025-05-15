import React, { useState, FormEvent } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import CountryList from "country-list-with-dial-code-and-flag";
import { requestForToken } from "../../../firebase-messaging"; // Adjust import path
// import { requestForToken } from "../../path/to/firebaseMessaging"; // Adjust import path

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    CountryList.findOneByCountryCode("IN") || CountryList.getAll()[0]
  );
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

  const countries: Country[] = CountryList.getAll();

  const validateEmail = (email: string): boolean => {
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Email cannot be empty.");
      return false;
    }
    if (email !== trimmed || email.includes(" ")) {
      setEmailError("Email must not contain spaces.");
      return false;
    }
    if (!emailRegex.test(trimmed)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateUsername = (username: string): boolean => {
    const trimmed = username.trim();
    if (!trimmed) {
      setUsernameError("Username cannot be empty.");
      return false;
    }
    if (username !== trimmed) {
      setUsernameError("No leading or trailing spaces allowed.");
      return false;
    }
    if (!usernameRegex.test(trimmed)) {
      setUsernameError("Username must contain only letters and single spaces.");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validatePhone = (phone: string, countryCode: string): boolean => {
    if (!phone) {
      setPhoneError("Phone number cannot be empty.");
      return false;
    }
    if (!isValidPhoneNumber(phone, countryCode as CountryCode)) {
      setPhoneError("Please enter a valid phone number.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isUsernameValid = validateUsername(username);
    const isPhoneValid = validatePhone(phone, selectedCountry.code);

    if (!isEmailValid || !isUsernameValid || !isPhoneValid) return;

    try {
      // Save user data to localStorage
      localStorage.setItem("email", email.trim());
      localStorage.setItem("username", username.trim());
      localStorage.setItem("phone", phone.trim());
      localStorage.setItem("userLoggedIn", "true");

      // Request FCM token and send to backend
      await requestForToken(username.trim(), email.trim(), phone.trim());

      console.log("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleFlagError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const country = countries.find(
      (c) => c.code === e.currentTarget.dataset.code
    );
    if (country) {
      e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='18'><text x='0' y='14' font-size='14'>${country.flag}</text></svg>`;
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    setSearchQuery("");
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50 px-4 sm:px-6 md:px-8">
      <div className="p-6 sm:p-8 rounded-xl w-full max-w-md bg-white shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6 sm:mb-8 text-[#0E1726] font-[Cinzel]">
          LOGIN
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 sm:gap-5">
          {/* Email Field */}
          <div
            className={`flex items-center border-2 rounded-md px-4 py-2.5 bg-white ${
              emailError ? "border-red-500" : "border-[#5F99AE]"
            } transition-colors focus-within:border-[#85cee2]`}
          >
            <EmailIcon className="text-[#5F99AE] mr-2" />
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 outline-none bg-transparent text-[#0E1726] placeholder-[#5F99AE] text-sm sm:text-base"
              aria-label="Email address"
            />
          </div>
          <p className="text-red-500 text-sm min-h-[1rem]">{emailError}</p>

          {/* Username Field */}
          <div
            className={`flex items-center border-2 rounded-md px-4 py-2.5 bg-white ${
              usernameError ? "border-red-500" : "border-[#5F99AE]"
            } transition-colors focus-within:border-[#85cee2]`}
          >
            <PersonOutlineIcon className="text-[#5F99AE] mr-2" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 outline-none bg-transparent text-[#0E1726] placeholder-[#5F99AE] text-sm sm:text-base"
              aria-label="Username"
            />
          </div>
          <p className="text-red-500 text-sm min-h-[1rem]">{usernameError}</p>

          {/* Country Selector and Phone Field */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="relative w-full sm:w-28">
              <div
                className={`flex items-center border-2 rounded-md px-3 py-2.5 bg-white cursor-pointer ${
                  phoneError ? "border-red-500" : "border-[#5F99AE]"
                } transition-colors hover:border-[#85cee2]`}
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              >
                <img
                  src={`https://flagcdn.com/24x18/${selectedCountry.code.toLowerCase()}.png`}
                  alt={`${selectedCountry.name} flag`}
                  className="w-6 h-4 mr-2"
                  data-code={selectedCountry.code}
                  onError={handleFlagError}
                />
                <span className="text-[#0E1726] text-sm sm:text-base">
                  {selectedCountry.dialCode}
                </span>
              </div>

              {showCountryDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-[#5F99AE] rounded-md shadow-lg max-h-60 overflow-auto">
                  <div className="px-3 py-2">
                    <input
                      type="text"
                      placeholder="Search country..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-2 py-1 border border-[#5F99AE] rounded-md text-sm text-[#0E1726] placeholder-[#5F99AE] focus:outline-none focus:border-[#85cee2]"
                      aria-label="Search country"
                    />
                  </div>
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <div
                        key={country.code}
                        className="flex items-center px-3 py-2 hover:bg-[#f0f9ff] cursor-pointer w-[24rem]"
                        onClick={() => handleCountrySelect(country)}
                      >
                        <img
                          src={`https://flagcdn.com/24x18/${country.code.toLowerCase()}.png`}
                          alt={`${country.name} flag`}
                          className="w-6 h-4 mr-2"
                          data-code={country.code}
                          onError={handleFlagError}
                        />
                        <span className="text-[#0E1726] text-sm mr-2">
                          {country.dialCode}
                        </span>
                        <span className="text-[#0E1726] text-sm">
                          {country.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-[#0E1726]">
                      No countries found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div
              className={`flex items-center border-2 rounded-md px-4 py-2.5 bg-white w-full ${
                phoneError ? "border-red-500" : "border-[#5F99AE]"
              } transition-colors focus-within:border-[#85cee2]`}
            >
              <PhoneIcon className="text-[#5F99AE] mr-2" />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 outline-none bg-transparent text-[#0E1726] placeholder-[#5F99AE] text-sm sm:text-base"
                aria-label="Phone number"
              />
            </div>
          </div>
          <p className="text-red-500 text-sm min-h-[1rem]">{phoneError}</p>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#5F99AE] hover:bg-[#85cee2] text-white py-2.5 rounded-full text-base sm:text-lg font-semibold transition-colors"
            aria-label="Login"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

// import React, { useState, FormEvent } from "react";
// import EmailIcon from "@mui/icons-material/Email";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import PhoneIcon from "@mui/icons-material/Phone";
// import { useNavigate } from "react-router-dom";
// // import { isValidPhoneNumber } from "libphonenumber-js";
// import CountryList from "country-list-with-dial-code-and-flag";
// import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";

// interface Country {
//   code: string;
//   name: string;
//   dialCode: string;
//   flag: string;
// }

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState<string>("");
//   const [username, setUsername] = useState<string>("");
//   const [phone, setPhone] = useState<string>("");
//   const [selectedCountry, setSelectedCountry] = useState<Country>(
//     CountryList.findOneByCountryCode("IN") || CountryList.getAll()[0]
//   );
//   const [showCountryDropdown, setShowCountryDropdown] = useState(false);
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   const [emailError, setEmailError] = useState<string>("");
//   const [usernameError, setUsernameError] = useState<string>("");
//   const [phoneError, setPhoneError] = useState<string>("");

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const usernameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

//   const countries: Country[] = CountryList.getAll();

//   const validateEmail = (email: string): boolean => {
//     const trimmed = email.trim();
//     if (!trimmed) {
//       setEmailError("Email cannot be empty.");
//       return false;
//     }
//     if (email !== trimmed || email.includes(" ")) {
//       setEmailError("Email must not contain spaces.");
//       return false;
//     }
//     if (!emailRegex.test(trimmed)) {
//       setEmailError("Please enter a valid email address.");
//       return false;
//     }
//     setEmailError("");
//     return true;
//   };

//   const validateUsername = (username: string): boolean => {
//     const trimmed = username.trim();
//     if (!trimmed) {
//       setUsernameError("Username cannot be empty.");
//       return false;
//     }
//     if (username !== trimmed) {
//       setUsernameError("No leading or trailing spaces allowed.");
//       return false;
//     }
//     if (!usernameRegex.test(trimmed)) {
//       setUsernameError("Username must contain only letters and single spaces.");
//       return false;
//     }
//     setUsernameError("");
//     return true;
//   };
// const validatePhone = (phone: string, countryCode: string): boolean => {
//   if (!phone) {
//     setPhoneError("Phone number cannot be empty.");
//     return false;
//   }
//   if (!isValidPhoneNumber(phone, countryCode as CountryCode)) {
//     setPhoneError("Please enter a valid phone number.");
//     return false;
//   }
//   setPhoneError("");
//   return true;
// };

//   const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
//     e.preventDefault();

//     const isEmailValid = validateEmail(email);
//     const isUsernameValid = validateUsername(username);
//     const isPhoneValid = validatePhone(phone, selectedCountry.code);

//     if (!isEmailValid || !isUsernameValid || !isPhoneValid) return;

//     localStorage.setItem("email", email.trim());
//     localStorage.setItem("username", username.trim());
//     localStorage.setItem("phone", phone.trim());
//     localStorage.setItem("userLoggedIn", "true");

//     console.log("Login successful");
//     navigate("/");
//   };

//   const handleFlagError = (
//     e: React.SyntheticEvent<HTMLImageElement, Event>
//   ) => {
//     const country = countries.find(
//       (c) => c.code === e.currentTarget.dataset.code
//     );
//     if (country) {
//       e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='18'><text x='0' y='14' font-size='14'>${country.flag}</text></svg>`;
//     }
//   };

//   const handleCountrySelect = (country: Country) => {
//     setSelectedCountry(country);
//     setShowCountryDropdown(false);
//     setSearchQuery("");
//   };

//   const filteredCountries = countries.filter((country) =>
//     country.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50 px-4 sm:px-6 md:px-8">
//       <div className="p-6 sm:p-8 rounded-xl w-full max-w-md bg-white shadow-xl">
//         <h1 className="text-2xl font-bold text-center mb-6 sm:mb-8 text-[#0E1726] font-[Cinzel]">
//           LOGIN
//         </h1>

//         <form onSubmit={handleLogin} className="flex flex-col gap-4 sm:gap-5">
//           {/* Email Field */}
//           <div
//             className={`flex items-center border-2 rounded-md px-4 py-2.5 bg-white ${
//               emailError ? "border-red-500" : "border-[#5F99AE]"
//             } transition-colors focus-within:border-[#85cee2]`}
//           >
//             <EmailIcon className="text-[#5F99AE] mr-2" />
//             <input
//               type="email"
//               placeholder="Email ID"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="flex-1 outline-none bg-transparent text-[#0E1726] placeholder-[#5F99AE] text-sm sm:text-base"
//               aria-label="Email address"
//             />
//           </div>
//           <p className="text-red-500 text-sm min-h-[1rem]">{emailError}</p>

//           {/* Username Field */}
//           <div
//             className={`flex items-center border-2 rounded-md px-4 py-2.5 bg-white ${
//               usernameError ? "border-red-500" : "border-[#5F99AE]"
//             } transition-colors focus-within:border-[#85cee2]`}
//           >
//             <PersonOutlineIcon className="text-[#5F99AE] mr-2" />
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="flex-1 outline-none bg-transparent text-[#0E1726] placeholder-[#5F99AE] text-sm sm:text-base"
//               aria-label="Username"
//             />
//           </div>
//           <p className="text-red-500 text-sm min-h-[1rem]">{usernameError}</p>

//           {/* Country Selector and Phone Field */}
//           <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//             <div className="relative w-full sm:w-28">
//               <div
//                 className={`flex items-center border-2 rounded-md px-3 py-2.5 bg-white cursor-pointer ${
//                   phoneError ? "border-red-500" : "border-[#5F99AE]"
//                 } transition-colors hover:border-[#85cee2]`}
//                 onClick={() => setShowCountryDropdown(!showCountryDropdown)}
//               >
//                 <img
//                   src={`https://flagcdn.com/24x18/${selectedCountry.code.toLowerCase()}.png`}
//                   alt={`${selectedCountry.name} flag`}
//                   className="w-6 h-4 mr-2"
//                   data-code={selectedCountry.code}
//                   onError={handleFlagError}
//                 />
//                 <span className="text-[#0E1726] text-sm sm:text-base">
//                   {selectedCountry.dialCode}
//                 </span>
//               </div>

//               {showCountryDropdown && (
//                 <div className="absolute z-10 mt-1 w-full bg-white border border-[#5F99AE] rounded-md shadow-lg max-h-60 overflow-auto">
//                   <div className="px-3 py-2">
//                     <input
//                       type="text"
//                       placeholder="Search country..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full px-2 py-1 border border-[#5F99AE] rounded-md text-sm text-[#0E1726] placeholder-[#5F99AE] focus:outline-none focus:border-[#85cee2]"
//                       aria-label="Search country"
//                     />
//                   </div>
//                   {filteredCountries.length > 0 ? (
//                     filteredCountries.map((country) => (
//                       <div
//                         key={country.code}
//                         className="flex items-center px-3 py-2 hover:bg-[#f0f9ff] cursor-pointer w-[24rem]"
//                         onClick={() => handleCountrySelect(country)}
//                       >
//                         <img
//                           src={`https://flagcdn.com/24x18/${country.code.toLowerCase()}.png`}
//                           alt={`${country.name} flag`}
//                           className="w-6 h-4 mr-2"
//                           data-code={country.code}
//                           onError={handleFlagError}
//                         />
//                         <span className="text-[#0E1726] text-sm mr-2">
//                           {country.dialCode}
//                         </span>
//                         <span className="text-[#0E1726] text-sm">
//                           {country.name}
//                         </span>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="px-3 py-2 text-sm text-[#0E1726]">
//                       No countries found
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div
//               className={`flex items-center border-2 rounded-md px-4 py-2.5 bg-white w-full ${
//                 phoneError ? "border-red-500" : "border-[#5F99AE]"
//               } transition-colors focus-within:border-[#85cee2]`}
//             >
//               <PhoneIcon className="text-[#5F99AE] mr-2" />
//               <input
//                 type="tel"
//                 placeholder="Phone Number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="flex-1 outline-none bg-transparent text-[#0E1726] placeholder-[#5F99AE] text-sm sm:text-base"
//                 aria-label="Phone number"
//               />
//             </div>
//           </div>
//           <p className="text-red-500 text-sm min-h-[1rem]">{phoneError}</p>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="bg-[#5F99AE] hover:bg-[#85cee2] text-white py-2.5 rounded-full text-base sm:text-lg font-semibold transition-colors"
//             aria-label="Login"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
