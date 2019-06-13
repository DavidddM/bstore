const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    reputation: Number,
    imageUrl: String
  },
  { collection: "Users" }
);

const UserModel = mongoose.model("User", userSchema);

//
const groupSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    reputation: Number,
    imageUrl: String
  },
  { collection: "Groups" }
);

const GroupModel = mongoose.model("Group", groupSchema);

module.exports = { UserModel, GroupModel };
