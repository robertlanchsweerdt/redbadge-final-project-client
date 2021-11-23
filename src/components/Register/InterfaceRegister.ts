    export interface User {
        id: string;
        username: string;
        password: string;
        fname: string;
        lname: string;
        street_number: null | number;
        street_name: string;
        city: string;
        state: string;
        zip: number;
        tele: null | string;
        email: string;
        role: string;
        bio?: string;
        updatedAt: Date;
        createdAt: Date;
    }

    export interface IRegisterResponse {
        message: string;
        user: User;
        sessionToken: string;
    }

