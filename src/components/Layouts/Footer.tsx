import axios from "axios";
import { useEffect, useState } from "react";
import {
  footer_call,
  footer_contactUS,
  footer_drop,
  footer_email,
  footer_message,
  footer_social,
} from "../../allapi/api";

// Define the interfaces for the fetched data
interface ContactInfo {
  contactLink: string;
  contactImage: string;
  contactName: string;
}

interface SocialItem {
  mediaLink: string;
  mediaImage: string;
}

const Footer = () => {
  const [social, setSocial] = useState<SocialItem[]>([]);
  const [email, setEmail] = useState<ContactInfo | null>(null);
  const [call, setCall] = useState<ContactInfo | null>(null);
  const [message, setMessage] = useState<ContactInfo | null>(null);
  const [drop, setDrop] = useState<ContactInfo | null>(null);

  useEffect(() => {
    // Fetching Social Media data
    axios
      .get<{ allSocialmedia: SocialItem[] }>(footer_social)
      .then((res) => setSocial(res.data.allSocialmedia))
      .catch((err) => console.error("Social API Error:", err));

    // Fetching email, call, message, and drop links
    axios
      .get(footer_email)
      .then((response) => setEmail(response.data.data))
      .catch((error) => console.log(error));

    axios
      .get(footer_call)
      .then((response) => setCall(response.data.data))
      .catch((error) => console.log(error));

    axios
      .get(footer_message)
      .then((response) => setMessage(response.data.data))
      .catch((error) => console.log(error));

    axios
      .get(footer_drop)
      .then((response) => setDrop(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="bg-[#5F99AE] text-white px-4 py-2  rounded-xl m-2 sm:mt-6">
      {/* Display email link */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:m-auto sm:w-[40rem] ">
        {email && (
          <a
            href={`mailto:${email.contactLink}`} // Using 'mailto:' to open the default email client
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#ffffff7b] hover:bg-[#5f99aebd] transition rounded-[5px] p-1 h-[2rem] flex justify-start pl-3 gap-[1rem] items-center text-sm"
            style={{ border: "2px solid #fff" }}
          >
            <img
              src={email.contactImage} // Replace with actual icon
              alt="Email"
              className="w-5 h-5"
            />
            <p className="text-[12px] text-[#0E1726]">{email.contactName}</p>
          </a>
        )}

        {call?.contactLink && (
          <a
            href={`tel:${call.contactLink}`}
            className="bg-[#ffffff7b] hover:bg-[#5f99aebd] transition rounded-[5px] p-1 h-[2rem] flex justify-start pl-3 gap-[1rem] items-center text-sm border-2 border-white"
            aria-label={`Call ${call.contactName}`}
          >
            <img
              src={call.contactImage}
              alt={`Call icon for ${call.contactName}`}
              className="w-5 h-5"
            />
            <p className="text-[12px] text-[#0E1726]">{call.contactName}</p>
          </a>
        )}

        {message && (
          <a
            href={message.contactLink || "#"} // Fallback if no link is provided
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#ffffff7b] hover:bg-[#5f99aebd] transition rounded-[5px] p-1 h-[2rem] flex justify-start pl-3 gap-[1rem] items-center text-sm"
            style={{ border: "2px solid #fff" }}
          >
            <img
              src={message.contactImage} // Replace with actual icon
              alt="Message"
              className="w-5 h-5"
            />
            <p className="text-[12px] text-[#0E1726]">{message.contactName}</p>
          </a>
        )}

        {drop && (
          <a
            href={drop.contactLink || "#"} // Fallback if no link is provided
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#ffffff7b] hover:bg-[#5f99aebd] transition rounded-[5px] p-1 h-[2rem] flex justify-start pl-3 gap-[1rem] items-center text-sm"
            style={{ border: "2px solid #fff" }}
          >
            <img
              src={drop.contactImage} // Replace with actual icon
              alt="Drop"
              className="w-5 h-5"
            />
            <p className="text-[12px] text-[#0E1726]">{drop.contactName}</p>
          </a>
        )}
      </div>

      <hr className="my-2 border-blue-200" />

      {/* Social Media Section */}
      <div className="flex justify-center gap-4 flex-wrap ">
        {social.map((item, index) => (
          <a
            key={index}
            href={item.mediaLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={item.mediaImage}
              alt={`social-${index}`}
              className="w-6 h-6 invert brightness-0"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Footer;
