const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String
    },
    { collection: "Users" }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
