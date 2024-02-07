interface gradientType {
    title: string;
    conic: string;
    linear: string;
    icon?: string;
  }
  
  export const eventcards: gradientType[] = [
    {
      title: "the annual tech fest",
      conic: `conic-gradient(from 180deg at 50% 50%,#000000 0deg,#ffffff 97.5deg,#000000 183.75deg,#ffffff 275.62deg,#000000 360deg)`,
      linear: `linear-gradient(143.02deg,#d85123 8.76%,#ff8a63 23.79%,#ff7f54 39.77%,#ff9c7a 59.03%,#f87c53 78.29%,#ef3d00 98.97%)`,
      icon: "/assets/events/arrow.svg",
    },
    {
      title: "auto mata",
      conic: `conic-gradient(from 180deg at 50% 50%, #FFC800 0deg, #D85123 50.63deg, #FFC800 118.12deg, #D85123 183.75deg, #FFC800 245.62deg, #D85123 309.38deg, #FFC800 360deg)        `,
      linear: ``,
    },
    {
      title: "Game sesH",
      conic: `conic-gradient(from 180deg at 50% 50%, #A8D775 0deg, rgba(255, 255, 255, 0.84375) 56.25deg, #A8D775 116.25deg, #FFFFFF 172.5deg, #A8D775 236.25deg, #FFFFFF 294.38deg, #A8D775 360deg)`,
      linear: ``,
      icon: "/assets/events/game.svg",
    },
    {
      title: "Hack Track",
      conic: `conic-gradient(from 180deg at 50% 50%, #AE9EF1 0deg, #FFFFFF 72deg, #AE9EF1 144deg, #FFFFFF 216deg, #AE9EF1 288deg, #FFFFFF 360deg)`,
      linear: ``,
      icon: "/assets/events/hack.svg",
    },
    {
      title: "robot cohort",
      conic: ``,
      linear: `#9FC4EC `,
      icon: "",
    },
  ];
  