import { userModel } from "../models/user.model.js";

const createUser = async ({email, password, role}) => {

    if (!email || !password || !role) {
        throw new Error("All fields are required");
    }

    const user = userModel.create({
        email,
        password,
        role,
        isVerified: false,
    })

    return user;
}

export default createUser