interface teamError {
  email: string;
  phone: string;
}

export const validateReg = (
  inputs: any,
  participants: any,
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
  const uniqueEmails = new Set<string>();
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
  participants.forEach((participant: any, index: number) => {
    teamErrors[index] = {
      email: "",
      phone: "",
    };

    if (participant.email === "") {
      teamErrors[index].email = "Email is required";
    } else if (!regexEmail.test(participant.email)) {
      teamErrors[index].email = "Invalid Email";
    } else if (uniqueEmails.has(participant.email)) {
      teamErrors[index].email = `Email is already used in the team`;
    } else {
      uniqueEmails.add(participant.email);
    }

    if (participant.phone === "") {
      teamErrors[index].phone = "Phone is required";
    } else if (!regexPhone.test(participant.phone)) {
      teamErrors[index].phone = "Invalid Phone Number";
    }
  });

  return { errors, teamErrors };
};