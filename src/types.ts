// Props for CTA buttons
export interface CTAButtonProps {
    content: string,
    linkTo: string
}

export type AuthContextType = {
    user: Organizer | User | null;
    isAuthenticated: boolean;
    role: "guest" | "user" | "organizer";
    login: (role: "user" | "organizer", user: User | Organizer, access_token: string) => void;
    logout: () => void;
}

export type ProtectedRouteType = {
    element: React.ReactNode;
    requiredRole?: "user" | "organizer";
}

export type PageTitleProps = {
    title: string
}

export type Organizer = {
    id: string;
    name: string;
    description: string;
    photo: string | null;
    email: string;
    contact: string;
    password: string;
    website: string | null;
};

export type User = {
    id: string;
    firstname: string;
    lastname: string;
    othernames: string | null;
    contact: string;
    email: string;
    password: string;
    photo: string | null;
};