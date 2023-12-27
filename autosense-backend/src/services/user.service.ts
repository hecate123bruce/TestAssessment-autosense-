import { User } from "../models";

export const createUser = async (data) => {
  const user = new User(data);
  const result = await user.save();
  return result;
};

export const getUser = async (data) => {
  const users = await User.find(data);
  return users;
};

export const getUserByEmail = async (data) => {
  const user = await User.findOne({ email: data });
  return user;
};

export const updateUser = async (data) => {
  const { key, updateUser } = data;
  const user = await User.findOneAndUpdate(key, updateUser, {
    new: true,
  });
  return user;
};

export const deleteUser = async (data) => {
  const result = await User.findOneAndDelete(data);
  return result;
};
