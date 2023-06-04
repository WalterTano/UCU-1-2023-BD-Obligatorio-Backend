import { User } from "../interfaces/user";
import bcrypt from 'bcryptjs';
import { takeFirst } from "../lib";

const BCRYPT_SALT = throwIfUndef(process.env.BCRYPT_SALT, "BCRYPT_SALT");

let users: User[] | undefined;

async function getUsers(): Promise<User[]> {
    if (users) {
        return users;
    }

    // Define raw users (with plain-text password)
    const raw: {name: string, password: string}[] = [
        {name: "John", password: "12345"}
    ];

    // Map password
    const res: User[] = await Promise.all(
        raw.map(u => bcrypt.hash(u.password, BCRYPT_SALT).then(
            hashpwd => ({name: u.name, hashpwd})
        ))
    );

    return res;
}

export async function findByCredentials(username: string, hashpwd: string): Promise<User> {
    const users = await getUsers();

    // The list of users which match the username and password
    const v1 = users.filter(u => u.name == username && u.hashpwd == hashpwd);

    // Attempt to take the first element
    const v2: readonly [User, readonly User[]] | undefined = takeFirst(v1);
    if (v2 == undefined) {
        throw new Error("There's no user with given credentials");
    }
    const user = v2[0];

    return user;
}

export async function findByUsername(username: string): Promise<User> {
    const users = await getUsers();

    // The list of users which match the username
    const v1 = users.filter(u => u.name == username);

    // Attempt to take the first element
    const v2: readonly [User, readonly User[]] | undefined = takeFirst(v1);
    if (v2 == undefined) {
        throw new Error("There's no user with the username " + JSON.stringify(username));
    }
    const user = v2[0];

    return user;
}