    export interface User {
        id: string;
        username: string;
        password: string;
        fname: string;
        lname: string;
        street_number: number;
        street_name: string;
        city: string;
        state: string;
        zip: number;
        tele: string;
        email: string;
        role: string;
        bio?: any;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface ILoginResponse {
        user: User;
        message: string;
        sessionToken: string;
    }
