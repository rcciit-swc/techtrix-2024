"use client";
import { supabase } from "@/lib";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const styles = {
  background: `conic-gradient(from 180deg at 50% 50%, #FFC800 0deg, #D85123 50.63deg, #FFC800 118.12deg, #D85123 183.75deg, #FFC800 245.62deg, #D85123 309.38deg, #FFC800 360deg)`,
  textBackground: `linear-gradient(187.03deg, #FFFFFF 49.99%, #000000 94.51%)
    `,
};
const EventWrapper = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: any;
  description: string;
}) => {
  const [convenorData, setConvenorData] = useState<any[]>([]);

  useEffect(() => {
    const getConvenor = async () => {
      const { data: categoryId } = await supabase
        .from("event_categories")
        .select("id")
        .eq("name", title);

      if (categoryId && categoryId.length > 0) {
        const { data: convenor } = await supabase
          .from("roles")
          .select("users(*)")
          .eq("event_category_id", categoryId[0].id);

        if (convenor) {
          setConvenorData(convenor);
        }
      }
    };

    getConvenor();
  }, [title]);

  return (
    <div className="mx-auto w-full">
      <div
        style={{ background: styles.background }}
        className=" lg:w-[80%] flex flex-col items-start justify-center mx-auto h-auto px-5  py-10 md:px-20 md:py-24 rounded-2xl"
      >
        <div className="relative  w-[100%]  justify-center flex flex-col gap-10 items-start">
          <div className="flex flex-col  lg:px-24 items-start gap-5">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white">
              {title}
            </h1>
            <h1 className="text-white font-semibold text-xl lg:text-2xl">
              {description}
            </h1>
          <div className="w-full flex flex-row items-center gap-5 flex-wrap">
          {convenorData.length > 0 && (
              <h1 className="text-white  font-semibold text-xl lg:text-2xl">
                Convenors :
              </h1>
            )}
            <div className="flex  convenor-card px-5 py-5 flex-col items-start gap-5 ">
              {convenorData!.map((convenor: any, index: number) => {
                return (
                  <div className="w-full" key={index}>
                    <div className="flex  w-full   flex-wrap gap-3 md:gap-5 xl:gap-16  text-black font-semibold flex-row items-center justify-between ">
                      <h1>{convenor?.users.name!}</h1>
                      <Link
                        href={`tel:${convenor?.users.phone!}`}
                        className="hover:text-green-600 cursor-pointer"
                      >
                        {convenor?.users.phone!}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
            
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default EventWrapper;
