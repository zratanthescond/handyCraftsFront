import { useEffect, useState } from "react";
import useSWR from "swr";
export default function useSiteInfo() {
  const { data: siteInfo } = useSWR("/site_infos/1");
  console.log(siteInfo);
  const [address, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  useEffect(() => {
    if (siteInfo && siteInfo.fullAdress) {
      setAdress(siteInfo.fullAdress);
      setPhone(siteInfo.mobilePhone);
      setEmail(siteInfo.email);
      setFacebook(siteInfo.facebook);
      setInstagram(siteInfo.instagram);
    }
  }, [siteInfo]);

  return { address, phone, email, facebook, instagram };
}
