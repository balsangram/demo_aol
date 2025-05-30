import React, { useState, FormEvent } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import CountryList from "country-list-with-dial-code-and-flag";
import { requestForToken } from "../../../firebase-messaging"; // Adjust import path
import axios from "axios";
import { LoginUser } from "../../allapi/api";

const fallbackCountries: Country[] = [
  { code: "AF", name: "Afghanistan", dialCode: "+93", flag: "🇦🇫" },
  { code: "AL", name: "Albania", dialCode: "+355", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria", dialCode: "+213", flag: "🇩🇿" },
  { code: "AS", name: "American Samoa", dialCode: "+1684", flag: "🇦🇸" },
  { code: "AD", name: "Andorra", dialCode: "+376", flag: "🇦🇩" },
  { code: "AO", name: "Angola", dialCode: "+244", flag: "🇦🇴" },
  { code: "AI", name: "Anguilla", dialCode: "+1264", flag: "🇦🇮" },
  { code: "AQ", name: "Antarctica", dialCode: "+672", flag: "🇦🇶" },
  { code: "AG", name: "Antigua and Barbuda", dialCode: "+1268", flag: "🇦🇬" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "AM", name: "Armenia", dialCode: "+374", flag: "🇦🇲" },
  { code: "AW", name: "Aruba", dialCode: "+297", flag: "🇦🇼" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { code: "AZ", name: "Azerbaijan", dialCode: "+994", flag: "🇦🇿" },
  { code: "BS", name: "Bahamas", dialCode: "+1242", flag: "🇧🇸" },
  { code: "BH", name: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
  { code: "BD", name: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
  { code: "BB", name: "Barbados", dialCode: "+1246", flag: "🇧🇧" },
  { code: "BY", name: "Belarus", dialCode: "+375", flag: "🇧🇾" },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
  { code: "BZ", name: "Belize", dialCode: "+501", flag: "🇧🇿" },
  { code: "BJ", name: "Benin", dialCode: "+229", flag: "🇧🇯" },
  { code: "BM", name: "Bermuda", dialCode: "+1441", flag: "🇧🇲" },
  { code: "BT", name: "Bhutan", dialCode: "+975", flag: "🇧🇹" },
  { code: "BO", name: "Bolivia", dialCode: "+591", flag: "🇧🇴" },
  { code: "BA", name: "Bosnia and Herzegovina", dialCode: "+387", flag: "🇧🇦" },
  { code: "BW", name: "Botswana", dialCode: "+267", flag: "🇧🇼" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  {
    code: "IO",
    name: "British Indian Ocean Territory",
    dialCode: "+246",
    flag: "🇮🇴",
  },
  { code: "BN", name: "Brunei Darussalam", dialCode: "+673", flag: "🇧🇳" },
  { code: "BG", name: "Bulgaria", dialCode: "+359", flag: "🇧🇬" },
  { code: "BF", name: "Burkina Faso", dialCode: "+226", flag: "🇧🇫" },
  { code: "BI", name: "Burundi", dialCode: "+257", flag: "🇧🇮" },
  { code: "KH", name: "Cambodia", dialCode: "+855", flag: "🇰🇭" },
  { code: "CM", name: "Cameroon", dialCode: "+237", flag: "🇨🇲" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "CV", name: "Cape Verde", dialCode: "+238", flag: "🇨🇻" },
  { code: "KY", name: "Cayman Islands", dialCode: "+1345", flag: "🇰🇾" },
  {
    code: "CF",
    name: "Central African Republic",
    dialCode: "+236",
    flag: "🇨🇫",
  },
  { code: "TD", name: "Chad", dialCode: "+235", flag: "🇹🇩" },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "CX", name: "Christmas Island", dialCode: "+61", flag: "🇨🇽" },
  { code: "CC", name: "Cocos (Keeling) Islands", dialCode: "+61", flag: "🇨🇨" },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { code: "KM", name: "Comoros", dialCode: "+269", flag: "🇰🇲" },
  { code: "CG", name: "Congo", dialCode: "+242", flag: "🇨🇬" },
  {
    code: "CD",
    name: "Congo, Democratic Republic",
    dialCode: "+243",
    flag: "🇨🇩",
  },
  { code: "CK", name: "Cook Islands", dialCode: "+682", flag: "🇨🇰" },
  { code: "CR", name: "Costa Rica", dialCode: "+506", flag: "🇨🇷" },
  { code: "CI", name: "Côte d'Ivoire", dialCode: "+225", flag: "🇨🇮" },
  { code: "HR", name: "Croatia", dialCode: "+385", flag: "🇭🇷" },
  { code: "CU", name: "Cuba", dialCode: "+53", flag: "🇨🇺" },
  { code: "CY", name: "Cyprus", dialCode: "+357", flag: "🇨🇾" },
  { code: "CZ", name: "Czech Republic", dialCode: "+420", flag: "🇨🇿" },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
  { code: "DJ", name: "Djibouti", dialCode: "+253", flag: "🇩🇯" },
  { code: "DM", name: "Dominica", dialCode: "+1767", flag: "🇩🇲" },
  { code: "DO", name: "Dominican Republic", dialCode: "+1849", flag: "🇩🇴" },
  { code: "EC", name: "Ecuador", dialCode: "+593", flag: "🇪🇨" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { code: "SV", name: "El Salvador", dialCode: "+503", flag: "🇸🇻" },
  { code: "GQ", name: "Equatorial Guinea", dialCode: "+240", flag: "🇬🇶" },
  { code: "ER", name: "Eritrea", dialCode: "+291", flag: "🇪🇷" },
  { code: "EE", name: "Estonia", dialCode: "+372", flag: "🇪🇪" },
  { code: "ET", name: "Ethiopia", dialCode: "+251", flag: "🇪🇹" },
  { code: "FK", name: "Falkland Islands", dialCode: "+500", flag: "🇫🇰" },
  { code: "FO", name: "Faroe Islands", dialCode: "+298", flag: "🇫🇴" },
  { code: "FJ", name: "Fiji", dialCode: "+679", flag: "🇫🇯" },
  { code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "GF", name: "French Guiana", dialCode: "+594", flag: "🇬🇫" },
  { code: "PF", name: "French Polynesia", dialCode: "+689", flag: "🇵🇫" },
  { code: "GA", name: "Gabon", dialCode: "+241", flag: "🇬🇦" },
  { code: "GM", name: "Gambia", dialCode: "+220", flag: "🇬🇲" },
  { code: "GE", name: "Georgia", dialCode: "+995", flag: "🇬🇪" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "GH", name: "Ghana", dialCode: "+233", flag: "🇬🇭" },
  { code: "GI", name: "Gibraltar", dialCode: "+350", flag: "🇬🇮" },
  { code: "GR", name: "Greece", dialCode: "+30", flag: "🇬🇷" },
  { code: "GL", name: "Greenland", dialCode: "+299", flag: "🇬🇱" },
  { code: "GD", name: "Grenada", dialCode: "+1473", flag: "🇬🇩" },
  { code: "GP", name: "Guadeloupe", dialCode: "+590", flag: "🇬🇵" },
  { code: "GU", name: "Guam", dialCode: "+1671", flag: "🇬🇺" },
  { code: "GT", name: "Guatemala", dialCode: "+502", flag: "🇬🇹" },
  { code: "GG", name: "Guernsey", dialCode: "+44", flag: "🇬🇬" },
  { code: "GN", name: "Guinea", dialCode: "+224", flag: "🇬🇳" },
  { code: "GW", name: "Guinea-Bissau", dialCode: "+245", flag: "🇬🇼" },
  { code: "GY", name: "Guyana", dialCode: "+592", flag: "🇬🇾" },
  { code: "HT", name: "Haiti", dialCode: "+509", flag: "🇭🇹" },
  { code: "VA", name: "Holy See (Vatican City)", dialCode: "+379", flag: "🇻🇦" },
  { code: "HN", name: "Honduras", dialCode: "+504", flag: "🇭🇳" },
  { code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰" },
  { code: "HU", name: "Hungary", dialCode: "+36", flag: "🇭🇺" },
  { code: "IS", name: "Iceland", dialCode: "+354", flag: "🇮🇸" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { code: "IR", name: "Iran", dialCode: "+98", flag: "🇮🇷" },
  { code: "IQ", name: "Iraq", dialCode: "+964", flag: "🇮🇶" },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
  { code: "IM", name: "Isle of Man", dialCode: "+44", flag: "🇮🇲" },
  { code: "IL", name: "Israel", dialCode: "+972", flag: "🇮🇱" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "JM", name: "Jamaica", dialCode: "+1876", flag: "🇯🇲" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "JE", name: "Jersey", dialCode: "+44", flag: "🇯🇪" },
  { code: "JO", name: "Jordan", dialCode: "+962", flag: "🇯🇴" },
  { code: "KZ", name: "Kazakhstan", dialCode: "+7", flag: "🇰🇿" },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { code: "KI", name: "Kiribati", dialCode: "+686", flag: "🇰🇮" },
  { code: "KP", name: "North Korea", dialCode: "+850", flag: "🇰🇵" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "KW", name: "Kuwait", dialCode: "+965", flag: "🇰🇼" },
  { code: "KG", name: "Kyrgyzstan", dialCode: "+996", flag: "🇰🇬" },
  { code: "LA", name: "Laos", dialCode: "+856", flag: "🇱🇦" },
  { code: "LV", name: "Latvia", dialCode: "+371", flag: "🇱🇻" },
  { code: "LB", name: "Lebanon", dialCode: "+961", flag: "🇱🇧" },
  { code: "LS", name: "Lesotho", dialCode: "+266", flag: "🇱🇸" },
  { code: "LR", name: "Liberia", dialCode: "+231", flag: "🇱🇷" },
  { code: "LY", name: "Libya", dialCode: "+218", flag: "🇱🇾" },
  { code: "LI", name: "Liechtenstein", dialCode: "+423", flag: "🇱🇮" },
  { code: "LT", name: "Lithuania", dialCode: "+370", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg", dialCode: "+352", flag: "🇱🇺" },
  { code: "MO", name: "Macao", dialCode: "+853", flag: "🇲🇴" },
  { code: "MK", name: "North Macedonia", dialCode: "+389", flag: "🇲🇰" },
  { code: "MG", name: "Madagascar", dialCode: "+261", flag: "🇲🇬" },
  { code: "MW", name: "Malawi", dialCode: "+265", flag: "🇲🇼" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "MV", name: "Maldives", dialCode: "+960", flag: "🇲🇻" },
  { code: "ML", name: "Mali", dialCode: "+223", flag: "🇲🇱" },
  { code: "MT", name: "Malta", dialCode: "+356", flag: "🇲🇹" },
  { code: "MH", name: "Marshall Islands", dialCode: "+692", flag: "🇲🇭" },
  { code: "MQ", name: "Martinique", dialCode: "+596", flag: "🇲🇶" },
  { code: "MR", name: "Mauritania", dialCode: "+222", flag: "🇲🇷" },
  { code: "MU", name: "Mauritius", dialCode: "+230", flag: "🇲🇺" },
  { code: "YT", name: "Mayotte", dialCode: "+262", flag: "🇾🇹" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { code: "FM", name: "Micronesia", dialCode: "+691", flag: "🇫🇲" },
  { code: "MD", name: "Moldova", dialCode: "+373", flag: "🇲🇩" },
  { code: "MC", name: "Monaco", dialCode: "+377", flag: "🇲🇨" },
  { code: "MN", name: "Mongolia", dialCode: "+976", flag: "🇲🇳" },
  { code: "ME", name: "Montenegro", dialCode: "+382", flag: "🇲🇪" },
  { code: "MS", name: "Montserrat", dialCode: "+1664", flag: "🇲🇸" },
  { code: "MA", name: "Morocco", dialCode: "+212", flag: "🇲🇦" },
  { code: "MZ", name: "Mozambique", dialCode: "+258", flag: "🇲🇿" },
  { code: "MM", name: "Myanmar", dialCode: "+95", flag: "🇲🇲" },
  { code: "NA", name: "Namibia", dialCode: "+264", flag: "🇳🇦" },
  { code: "NR", name: "Nauru", dialCode: "+674", flag: "🇳🇷" },
  { code: "NP", name: "Nepal", dialCode: "+977", flag: "🇳🇵" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "NC", name: "New Caledonia", dialCode: "+687", flag: "🇳🇨" },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
  { code: "NI", name: "Nicaragua", dialCode: "+505", flag: "🇳🇮" },
  { code: "NE", name: "Niger", dialCode: "+227", flag: "🇳🇪" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { code: "NU", name: "Niue", dialCode: "+683", flag: "🇳🇺" },
  { code: "NF", name: "Norfolk Island", dialCode: "+672", flag: "🇳🇫" },
  {
    code: "MP",
    name: "Northern Mariana Islands",
    dialCode: "+1670",
    flag: "🇲🇵",
  },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { code: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲" },
  { code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
  { code: "PW", name: "Palau", dialCode: "+680", flag: "🇵🇼" },
  { code: "PS", name: "Palestine", dialCode: "+970", flag: "🇵🇸" },
  { code: "PA", name: "Panama", dialCode: "+507", flag: "🇵🇦" },
  { code: "PG", name: "Papua New Guinea", dialCode: "+675", flag: "🇵🇬" },
  { code: "PY", name: "Paraguay", dialCode: "+595", flag: "🇵🇾" },
  { code: "PE", name: "Peru", dialCode: "+51", flag: "🇵🇪" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "PN", name: "Pitcairn", dialCode: "+64", flag: "🇵🇳" },
  { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { code: "PR", name: "Puerto Rico", dialCode: "+1939", flag: "🇵🇷" },
  { code: "QA", name: "Qatar", dialCode: "+974", flag: "🇶🇦" },
  { code: "RE", name: "Réunion", dialCode: "+262", flag: "🇷🇪" },
  { code: "RO", name: "Romania", dialCode: "+40", flag: "🇷🇴" },
  { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺" },
  { code: "RW", name: "Rwanda", dialCode: "+250", flag: "🇷🇼" },
  { code: "BL", name: "Saint Barthélemy", dialCode: "+590", flag: "🇧🇱" },
  { code: "SH", name: "Saint Helena", dialCode: "+290", flag: "🇸🇭" },
  { code: "KN", name: "Saint Kitts and Nevis", dialCode: "+1869", flag: "🇰🇳" },
  { code: "LC", name: "Saint Lucia", dialCode: "+1758", flag: "🇱🇨" },
  { code: "MF", name: "Saint Martin", dialCode: "+590", flag: "🇲🇫" },
  {
    code: "PM",
    name: "Saint Pierre and Miquelon",
    dialCode: "+508",
    flag: "🇵🇲",
  },
  {
    code: "VC",
    name: "Saint Vincent and the Grenadines",
    dialCode: "+1784",
    flag: "🇻🇨",
  },
  { code: "WS", name: "Samoa", dialCode: "+685", flag: "🇼🇸" },
  { code: "SM", name: "San Marino", dialCode: "+378", flag: "🇸🇲" },
  { code: "ST", name: "Sao Tome and Principe", dialCode: "+239", flag: "🇸🇹" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "SN", name: "Senegal", dialCode: "+221", flag: "🇸🇳" },
  { code: "RS", name: "Serbia", dialCode: "+381", flag: "🇷🇸" },
  { code: "SC", name: "Seychelles", dialCode: "+248", flag: "🇸🇨" },
  { code: "SL", name: "Sierra Leone", dialCode: "+232", flag: "🇸🇱" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "SX", name: "Sint Maarten", dialCode: "+1721", flag: "🇸🇽" },
  { code: "SK", name: "Slovakia", dialCode: "+421", flag: "🇸🇰" },
  { code: "SI", name: "Slovenia", dialCode: "+386", flag: "🇸🇮" },
  { code: "SB", name: "Solomon Islands", dialCode: "+677", flag: "🇸🇧" },
  { code: "SO", name: "Somalia", dialCode: "+252", flag: "🇸🇴" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { code: "SS", name: "South Sudan", dialCode: "+211", flag: "🇸🇸" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", flag: "🇱🇰" },
  { code: "SD", name: "Sudan", dialCode: "+249", flag: "🇸🇩" },
  { code: "SR", name: "Suriname", dialCode: "+597", flag: "🇸🇷" },
  { code: "SZ", name: "Swaziland", dialCode: "+268", flag: "🇸🇿" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
  { code: "SY", name: "Syria", dialCode: "+963", flag: "🇸🇾" },
  { code: "TW", name: "Taiwan", dialCode: "+886", flag: "🇹🇼" },
  { code: "TJ", name: "Tajikistan", dialCode: "+992", flag: "🇹🇯" },
  { code: "TZ", name: "Tanzania", dialCode: "+255", flag: "🇹🇿" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { code: "TL", name: "Timor-Leste", dialCode: "+670", flag: "🇹🇱" },
  { code: "TG", name: "Togo", dialCode: "+228", flag: "🇹🇬" },
  { code: "TK", name: "Tokelau", dialCode: "+690", flag: "🇹🇰" },
  { code: "TO", name: "Tonga", dialCode: "+676", flag: "🇹🇴" },
  { code: "TT", name: "Trinidad and Tobago", dialCode: "+1868", flag: "🇹🇹" },
  { code: "TN", name: "Tunisia", dialCode: "+216", flag: "🇹🇳" },
  { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
  { code: "TM", name: "Turkmenistan", dialCode: "+993", flag: "🇹🇲" },
  {
    code: "TC",
    name: "Turks and Caicos Islands",
    dialCode: "+1649",
    flag: "🇹🇨",
  },
  { code: "TV", name: "Tuvalu", dialCode: "+688", flag: "🇹🇻" },
  { code: "UG", name: "Uganda", dialCode: "+256", flag: "🇺🇬" },
  { code: "UA", name: "Ukraine", dialCode: "+380", flag: "🇺🇦" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "UY", name: "Uruguay", dialCode: "+598", flag: "🇺🇾" },
  { code: "UZ", name: "Uzbekistan", dialCode: "+998", flag: "🇺🇿" },
  { code: "VU", name: "Vanuatu", dialCode: "+678", flag: "🇻🇺" },
  { code: "VE", name: "Venezuela", dialCode: "+58", flag: "🇻🇪" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
  { code: "VG", name: "British Virgin Islands", dialCode: "+1284", flag: "🇻🇬" },
  { code: "VI", name: "U.S. Virgin Islands", dialCode: "+1340", flag: "🇻🇮" },
  { code: "WF", name: "Wallis and Futuna", dialCode: "+681", flag: "🇼🇫" },
  { code: "EH", name: "Western Sahara", dialCode: "+212", flag: "🇪🇭" },
  { code: "YE", name: "Yemen", dialCode: "+967", flag: "🇾🇪" },
  { code: "ZM", name: "Zambia", dialCode: "+260", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", dialCode: "+263", flag: "🇿🇼" },
];

// Debug CountryList to ensure it's an array
console.log(
  "CountryList:",
  CountryList,
  "IsArray:",
  Array.isArray(CountryList)
);

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50 px-4">
          <div className="p-6 rounded-xl bg-white shadow-xl text-center">
            <h2 className="text-xl font-bold text-red-500">
              Something went wrong
            </h2>
            <p className="text-gray-600 mt-2">
              Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#5F99AE] hover:bg-[#85cee2] text-white py-2 px-4 rounded-full"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function Login() {
  const navigate = useNavigate();

  // State declarations
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: "IN",
    name: "India",
    dialCode: "+91",
    flag: "🇮🇳",
  });

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiError, setApiError] = useState("");

  // Initialize countries, with fallback if CountryList is not an array
  const [countries] = useState<Country[]>(
    Array.isArray(CountryList) ? CountryList : fallbackCountries
  );

  // Handle country selection
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    setSearchQuery("");
    setPhoneError(""); // Clear phone error on country change
  };

  // Handle flag image error
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

  // Form submission handler
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setUsernameError("");
    setPhoneError("");
    setApiError("");

    // Trim all inputs and store the trimmed values
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();
    const trimmedPhone = phone.trim();

    // Input validation
    let isValid = true;

    // Email validation
    if (!trimmedEmail) {
      setEmailError("Email is required");
      isValid = false;
    } else if (email !== trimmedEmail) {
      setEmailError("Email should not have leading or trailing spaces");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    // Username validation
    if (!trimmedUsername) {
      setUsernameError("Username is required");
      isValid = false;
    } else if (username !== trimmedUsername) {
      setUsernameError("Username should not have leading or trailing spaces");
      isValid = false;
    } else if (/[^a-zA-Z\s]/.test(trimmedUsername)) {
      setUsernameError("Username should only contain letters and spaces");
      isValid = false;
    } else if (trimmedUsername.length < 3) {
      setUsernameError("Username should be at least 3 characters");
      isValid = false;
    }

    // Phone validation
    const fullPhoneNumber = `${selectedCountry.dialCode}${trimmedPhone}`;
    if (!trimmedPhone) {
      setPhoneError("Phone number is required");
      isValid = false;
    } else if (phone !== trimmedPhone) {
      setPhoneError("Phone number should not have leading or trailing spaces");
      isValid = false;
    } else if (!/^\d+$/.test(trimmedPhone)) {
      setPhoneError("Phone number should only contain digits");
      isValid = false;
    } else if (
      !isValidPhoneNumber(fullPhoneNumber, selectedCountry.code as CountryCode)
    ) {
      setPhoneError("Invalid phone number");
      isValid = false;
    }

    if (!isValid) return;

    try {
      // Request Firebase token
      const token = await requestForToken(
        trimmedEmail,
        trimmedUsername,
        fullPhoneNumber
      );

      // Store user data in localStorage
      localStorage.setItem("email", trimmedEmail);
      localStorage.setItem("username", trimmedUsername);
      localStorage.setItem("phone", fullPhoneNumber);
      localStorage.setItem("userLoggedIn", "true");

      // Send login request to backend
      const response = await axios.post(LoginUser, {
        email: trimmedEmail,
        phone: fullPhoneNumber,
        // token, // Include token if available
      });

      // Handle successful response
      console.log("Login successful:", response.data);
      navigate("/"); // Navigate only on success
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response) {
        setApiError(
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        setApiError("An error occurred. Please try again later.");
      }
    }
  };

  // Filter countries based on search query
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ErrorBoundary>
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

            {/* Phone Number Field (Flag, Country Code, Phone Input) */}
            <div className="relative">
              <div
                className={`flex items-center border-2 rounded-md bg-white ${
                  phoneError ? "border-red-500" : "border-[#5F99AE]"
                } transition-colors focus-within:border-[#85cee2]`}
              >
                {/* Flag and Country Code Selector */}
                <div
                  className="flex items-center px-3 py-2.5 cursor-pointer hover:bg-[#f0f9ff]"
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
                {/* Divider */}
                <div className="w-px h-6 bg-[#5F99AE] mx-2"></div>
                {/* Phone Input */}
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 outline-none bg-transparent text-[#0E1726] placeholder-[#5F99AE] text-sm sm:text-base py-2.5 pr-4"
                  aria-label="Phone number"
                />
              </div>

              {/* Country Dropdown */}
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
                        className="flex items-center px-3 py-2 hover:bg-[#f0f9ff] cursor-pointer"
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
            <p className="text-red-500 text-sm min-h-[1rem]">{phoneError}</p>

            {/* API Error Message */}
            <p className="text-red-500 text-sm min-h-[1rem]">{apiError}</p>

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
    </ErrorBoundary>
  );
}

export default Login;
