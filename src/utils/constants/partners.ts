export interface partnerType {
  name: string;
  logo: string;
  type: string;
}
export const sponsors: partnerType[] = [
  {
    name: "Stockgro",
    logo: "/assets/partners/stockgro.svg",
    type: "Title Sponsor",
  },
];
export const partners: partnerType[] = [
  {
    name: "Rise In",
    logo: "/assets/partners/risein.svg",
    type: "Education Partner",
  },
  {
    name: "Postman",
    logo: "/assets/partners/postman.svg",
    type: "Event Partner",
  },
  {
    name: "Google Developer Student Clubs RCCIIT",
    logo: "/GDSC3.png",
    type: "Hosting Partner",
  },
  {
    name: "Microsoft Learn Student Ambassador",
    logo: "/mlsa.jpeg",
    type: "Sessions Partner",
  },
  {
    name: "NoobCode",
    logo: "/assets/partners/noobcode.svg",
    type: "Community Partner",
  },
];

export const communityPartners: partnerType[] = [
  {
    name: "Flutter Kolkata",
    logo: "/assets/partners/flutter.jpg",
    type: "Community Partner",
  },
  {
    name: "Kotlin Kolkata",
    logo: "/assets/partners/kotlin.jpg",
    type: "Community Partner",
  },
]
