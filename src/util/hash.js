

import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;

// bcrypt works 
export const getHashed = async (password) => {
    const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}


// compare password with hashed password 

export const doCompare = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}