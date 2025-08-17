
/* 
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/
const isPhone = window.matchMedia("(min-width: 320px) and (max-width: 480px)").matches;


/* 
  ##Device = Tablets, Ipads (landscape)
  ##Screen = B/w 768px to 1024px
*/

const isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1024px) and (orientation: landscape)").matches;

/* 
  ##Device = Laptops, Desktops
  ##Screen = B/w 1025px to 1280px
*/

const isDesktop = window.matchMedia("(min-width: 1025px)").matches;


const useDeviseDetect = () => {

    return {isPhone, isTablet, isDesktop}
}

export default useDeviseDetect;