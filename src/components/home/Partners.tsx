import React from "react";
import { Heading } from ".";
import Image from "next/image";
import { partnerType, partners, sponsors } from "@/utils/constants/partners";
const PartnerCard = ({ name, logo, type }: partnerType) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Image src={logo} width={180} height={0} alt="partner" />
      <h1 className="text-xl font-semibold ">{type}</h1>
    </div>
  );
};
const Partners = () => {
  return (
    <div className="mx-auto flex flex-col justify-center items-center gap-10">
      <div className="mx-auto flex flex-col justify-center my-5 items-center gap-10">
        <Heading text="Sponsors" />
        <div className="flex flex-row items-end justify-center gap-16 flex-wrap">
          {sponsors.map((sponsor, index) => {
            return (
              <PartnerCard
                key={index}
                name={sponsor.name}
                logo={sponsor.logo}
                type={sponsor.type}
              />
            );
          })}
        </div>
      </div>
      <div className="mx-auto flex flex-col justify-center my-5 items-center gap-10">
        <Heading text="Partners" />

        <div className="flex flex-row items-end justify-center gap-16 flex-wrap">
          {partners.map((partner, index) => {
            return (
              <PartnerCard
                key={index}
                name={partner.name}
                logo={partner.logo}
                type={partner.type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Partners;
