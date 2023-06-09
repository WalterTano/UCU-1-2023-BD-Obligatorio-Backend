import bcrypt from 'bcryptjs';
import { takeFirst, throwIfUndef } from "../lib";
import { User } from '../classes/user';
import { Result } from './lib';

const BCRYPT_SALT = throwIfUndef(process.env.BCRYPT_SALT, "BCRYPT_SALT");

let users: User[] | undefined;
let passwords: { [index: string]: string | undefined };

export async function getUsers(): Promise<User[]> {
    if (!users) {
        users = [];
    }

    return users;
}

function setUsers(newUsers: User[]): void {
    users = newUsers;
}

export async function getPassword(username: string): Promise<string> {
    if (!passwords) {
        passwords = {};
    }

    const res = passwords[username];
    if (res == undefined) {
        throw new Error(`The user ${JSON.stringify(username)} does not exist`);
    }
    return res;
}

export async function findByCredentials(username: string, hashpwd: string): Promise<User> {
    const users = await getUsers();

    // Check whether the passwords match
    const actualPwd = await getPassword(username)
        .catch(() => { throw new Error("There's no user with given credentials") });
    
    if (actualPwd != hashpwd) {
        throw new Error("There's no user with given credentials");
    }

    // The list of users which match the username
    const v1 = users.filter(u => u.username == username);

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
    const v1 = users.filter(u => u.username == username);

    // Attempt to take the first element
    const v2: readonly [User, readonly User[]] | undefined = takeFirst(v1);
    if (v2 == undefined) {
        throw new Error("There's no user with the username " + JSON.stringify(username));
    }
    const user = v2[0];

    return user;
}

// The password does not go with the User object in this layer
export async function newUser(user: User, hashpwd: string): Promise<void> {
    const users = await getUsers();

    // CI must be unique
    if (users.filter(u => u.ci == user.ci).length > 0) {
        throw new Error("There's already another user with the same CI");
    }

    users.push(user);
}

export async function updateUser(ci: number, user: User): Promise<Result<void>> {
    const users = await getUsers();

    // Search for matching CI
    const matchCI = users.filter(u => u.ci == ci);
    if (matchCI.length == 0) {
        return { success: false, errorMsg: "Not found" };
    }
    const userToUpdate = matchCI[0];

//    userToUpdate.update(user);
    return { success: true, data: void 0 };
}

export async function deleteUser(ci: number): Promise<Result<void>> {
    const users = await getUsers();

    const [newUsers, found] = users.reduce<[User[], boolean]>(
        ([acc, found], u) => u.ci == ci ? [acc, true] : [[...acc, u], found], [[], false]
    );

    setUsers(newUsers);
    return found
        ? { success: true, data: void 0 }
        : { success: false, errorMsg: "Not found" };
}
