export interface LoginRequestType {
    email: string;
    password: string;
}

export interface UserType {
    id: string;
    email: string;
}

export interface LoginResponseType {
    token: string;
    user: UserType;
}