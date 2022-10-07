export const stringCircumcision = (str: string, count: number) => {
  return str?.length > count ? `${str.substring(0, count)}...` : str;
};

export const onlyLatinValidation = /[a-z\d]/;
