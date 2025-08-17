import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";
import styles from "./style/topbar.module.scss";
import { Link } from "react-router-dom";
import useSiteInfo from "../hook/siteInfo";

export default function TopBar() {

   const {facebook, instagram, phone, email} = useSiteInfo();

     return (

         <div className={`${styles.topbar} bg-blue text-white pt-2 pb-2 w-100`}>

          <div className="container">

         <div className="d-flex justify-content-md-between justify-content-center">

          <ul className="list-inline">
              
            <li><FontAwesomeIcon icon={faEnvelope} className="text-primary" /><span className="ms-2">{email}</span></li>

            <li><FontAwesomeIcon icon={faPhone} className="text-primary" /><span className="ms-2">{phone}</span></li>

            <li className="d-md-flex d-none">

             <span className="me-2">Suivez-nous sur</span>   

            <ul className={`list-inline ${styles.social}`}>

              <li><a href={facebook} target="_blank"><FontAwesomeIcon icon={faFacebook} className="text-primary" /></a></li>

              <li><a href={instagram} target="_blank"><FontAwesomeIcon icon={faInstagram} className="text-primary" /></a></li>
                
             </ul>    
                
            </li>  

            </ul>    
            
            <ul className="list-inline d-md-flex d-none">
               
               <li>Livraison offerte à partir de 99 DT d'achat</li>

               <li><Link to="/blog">Conseils et actualités</Link></li>

               <li><Link to="/help">Aide</Link></li>

            </ul>    

         </div>

          </div>

         </div>
     )
}