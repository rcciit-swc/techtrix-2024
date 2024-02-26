export const checkUserDetails = (data: Record<string, any>) => {
    let isSatisfied = true;
    Object.keys(data || {}).forEach((key) => {
      if (!data[key]) {
        isSatisfied = false;
      }
    });
    return isSatisfied;
  };