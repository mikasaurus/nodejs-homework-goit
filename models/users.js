import { User } from "../schema/user.js";

export const updateUser = async (userId, fields) => {
  await User.findByIdAndUpdate(
    { _id: userId },
    { new: true },
    { $set: fields }
  );
};
