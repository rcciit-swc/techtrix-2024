import { CommitteeDetails } from "@/utils/constants/committee";

const Committee = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 lg:gap-16 ">
      {CommitteeDetails.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center gap-3 px-5 lg:gap-5"
          >
            <h1 className="text-center font-got text-lg tracking-wider text-primary lg:text-2xl">
              {item.title}
            </h1>
            <div className="flex flex-row flex-wrap items-center justify-center gap-8 lg:gap-20">
              {item.members.map((member, index) => {
                return (
                  <div
                    key={index}
                    className="text-md flex flex-row flex-wrap items-center gap-2 lg:text-xl"
                  >
                    <div className="flex flex-col items-center text-center">
                      <p className="font-semibold">{member.name}</p>
                      <p>{member.role}</p>
                      <a
                        href={`tel:${member.phone}`}
                        className="hover:text-green-400"
                      >
                        {member.phone}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Committee;