import axios from "axios";
import { useEffect, useState } from "react";
import { footer_contactUS, footer_social } from "../../allapi/api";

interface ContactItem {
  contactName: string;
  contactLink: string;
  contactImage: string;
}

interface SocialItem {
  mediaLink: string;
  mediaImage: string;
}

const Footer = () => {
  const [social, setSocial] = useState<SocialItem[]>([]);
  const [contactUS, setContactUS] = useState<ContactItem[]>([]);

  useEffect(() => {
    axios
      .get<{ allSocialmedia: SocialItem[] }>(footer_social)
      .then((res) => setSocial(res.data.allSocialmedia))
      .catch((err) => console.error("Social API Error:", err));
  }, []);

  useEffect(() => {
    axios
      .get<{ allContactWithUs: ContactItem[] }>(footer_contactUS)
      .then((res) => setContactUS(res.data.allContactWithUs))
      .catch((err) => console.error("Contact API Error:", err));
  }, []);

  return (
    <div className="bg-[#5F99AE] text-white px-4 py-6 sm:rounded-none rounded-t-3xl sm:mt-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:m-auto  sm:w-[40rem]">
        {contactUS.map((item, index) => (
          <a
            key={index}
            href={item.contactLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#ffffff7b] hover:bg-[#5f99aebd] transition rounded-[5px] p-1 h-[3rem] flex justify-start pl-3 gap-[1rem] items-center text-sm  "
            style={{
              border: "2px solid #fff",
            }}
          >
            <img
              src={item.contactImage}
              alt={item.contactName}
              className="w-5 h-5  "
            />
            <p className="text-[12px]">{item.contactName}</p>
          </a>
        ))}
      </div>

      <hr className="my-4 border-blue-200" />

      <div className="flex justify-center gap-4 flex-wrap">
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
