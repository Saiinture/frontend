export interface IUser {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: any;
    phoneNumber: string | null;
    providerData: any;
}

export interface BackendUser {
    uid: string;
    username: string | null;
    email: string | null;
}