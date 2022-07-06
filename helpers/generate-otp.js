export const generateOTP = (length) => {
  let i,
    OTP = "",
    characters =
      "7876291365410231abcdefghijklmnopqrstuvwxyzABCDEFG865656523256HIJKLMNOPQRSTUVWXYZ0123456789";

  var charactersLength = characters.length;

  for (i = 0; i < length; i++) {
    OTP += characters.substr(
      Math.floor(Math.random() * charactersLength + 1),
      1
    );
  }

  return OTP;
};
