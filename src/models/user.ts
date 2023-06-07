import bcrypt from 'bcryptjs';
import { takeFirst, throwIfUndef } from "../lib";
import { User } from '../classes/user';

const BCRYPT_SALT = throwIfUndef(process.env.BCRYPT_SALT, "BCRYPT_SALT");

let users: User[] | undefined;

export async function getUsers(): Promise<User[]> {
    if (users) {
        return users;
    }

    // Define raw users (with plain-text password)
    const raw: {ci: number, name: string, lastName: "Doe", password: string}[] = [
        {ci: 28547613, name: "John", lastName: "Doe", password: "12345"}
    ];

    // Map password
    const res: User[] = await Promise.all(
        raw.map(u => bcrypt.hash(u.password, BCRYPT_SALT).then(
            hashpwd => new User(u.ci, u.name, u.lastName, hashpwd, 0, false, false)
        ))
    );

    return res;
}

function setUsers(newUsers: User[]): void {
    users = newUsers;
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

export async function newUser(user: User): Promise<void> {
    const users = await getUsers();

    // CI must be unique
    if (users.filter(u => u.ci == user.ci).length > 0) {
        throw new Error("There's already another user with the same CI");
    }

    users.push(user);
}

export async function updateUser(ci: number, user: User): Promise<"Success" | "Not found"> {
    const users = await getUsers();

    // Search for matching CI
    const matchCI = users.filter(u => u.ci == ci);
    if (matchCI.length == 0) {
        return "Not found";
    }
    const userToUpdate = matchCI[0];

    userToUpdate.update(user);
    return "Success";
}

export async function deleteUser(ci: number): Promise<"Success" | "Not found"> {
    const users = await getUsers();

    const [newUsers, found] = users.reduce<[User[], boolean]>(
        ([acc, found], u) => u.ci == ci ? [acc, true] : [[...acc, u], found], [[], false]
    );

    setUsers(newUsers);
    return found ? "Success" : "Not found";
}
