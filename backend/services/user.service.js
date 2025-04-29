import { userModel } from "../models/user.model.js";

const createUser = async ({email, password}) => {

    if (!email || !password) {
        throw new Error("All fields are required");
    }

    const user = userModel.create({
        email,
        password,
        isVerified: false,
    })

    return user;
}

export default createUser