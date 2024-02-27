interface teamError {
  // email: string;
  phone: string;
  name: string;
}
export const validateReg = (
  inputs: any,
  participants: any,
  maxTeamMember: number,
  file: any
) => {
  const errors = {
    teamName: "",
    transactionId: "",
    transactionSSfileName: "",
    teamLeadPhone: "",
    teamLeadEmail: "",
    file: "",
  };
  // const uniqueEmails = new Set<string>();
  const uniquePhones = new Set<string>();
  const teamErrors: teamError[] = [];

  const regexPhone =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (inputs.teamName === "") {
    errors.teamName = "Team Name is required";
  } else if (inputs.teamName.length < 3) {
    errors.teamName = "Team Name is too short";
  }

  if (inputs.transactionId === "") {
    errors.transactionId = "Transaction Id is required";
  } else if (inputs.transactionId.length < 12) {
    errors.transactionId = "Invalid Transaction Id";
  }

  if (inputs.transactionSSfileName === "") {
    errors.transactionSSfileName = "Payment Screenshot is required";
  }

  if (file === null) {
    errors.file = "Payment Screenshot File is required";
  }
  if (inputs.teamLeadPhone === "") {
    errors.teamLeadPhone = "Phone is required";
  } else if (!regexPhone.test(inputs.teamLeadPhone)) {
    errors.teamLeadPhone = "Invalid Phone Number";
  }

  if (inputs.teamLeadEmail === "") {
    errors.teamLeadEmail = "Email is required";
  } else if (!regexEmail.test(inputs.teamLeadEmail)) {
    errors.teamLeadEmail = "Invalid Email";
  }
  if (maxTeamMember > 1) {
    participants.forEach((participant: any, index: number) => {
      teamErrors[index] = {
        // email: "",
        phone: "",
        name: "",
      };

      // if (participant.email === "") {
      //   teamErrors[index].email = "Email is required";
      // } else if (!regexEmail.test(participant.email)) {
      //   teamErrors[index].email = "Invalid Email";
      // } else if (uniqueEmails.has(participant.email)) {
      //   teamErrors[index].email = `Email is already used in the team`;
      // } else {
      //   uniqueEmails.add(participant.email);
      // }

      if (participant.phone === "") {
        teamErrors[index].phone = "Phone is required";
      } else if (!regexPhone.test(participant.phone)) {
        teamErrors[index].phone = "Invalid Phone Number";
      }

      if (participant.name === "") {
        teamErrors[index].name = "Name is required";
      }
    });
  }

  return { errors, teamErrors };
};

export const validateUserReg = (inputs: any) => {
  const errors = {
    name: "",
    phone: "",
    college: "",
    roll: "",
    gender: "",
  };
  const regexPhone =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  if (inputs.name === "") {
    errors.name = "Name is required";
  }
  if (inputs.phone === "") {
    errors.phone = "Phone is required";
  } else if (!regexPhone.test(inputs.phone)) {
    errors.phone = "Invalid Phone Number";
  }

  if (inputs.college === "") {
    errors.college = "College is required";
  }
  if (inputs.gender === "") {
    errors.gender = "Gender is required";
  }

  return errors;
};
