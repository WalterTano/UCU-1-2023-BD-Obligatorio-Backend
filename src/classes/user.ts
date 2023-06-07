export class User {

    public constructor(
        public readonly ci: number,
        public name: string,
        public lastName: string,
        // Should it be handled more carefully?
        public hashpwd: string,
        public geoDistance: number,
        public geoState: boolean,
        public isAdmin: boolean
    ) {}

    public update(other: User): void {
        this.name = other.name;
        this.lastName = other.lastName;
        this.hashpwd = other.hashpwd;
        this.geoDistance = other.geoDistance;
        this.geoState = other.geoState;
        this.isAdmin = other.isAdmin;
    }

}
