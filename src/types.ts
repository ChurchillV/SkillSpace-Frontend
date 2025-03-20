import React, { ReactNode } from "react";
import { IconMapKey } from "./components/SideBar/iconmap";

// Props for CTA buttons
export interface CTAButtonProps {
    content: string,
    linkTo: string
}

export interface ActionButtonProps {
    content: string,
    action: () => void,
    icon: React.ReactNode
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

export interface NavItemProps {
    icon: IconMapKey,
    name: string,
    route: string,
}

export interface LayoutProps {
    children: ReactNode;
}

export interface ModalProps { 
    isOpen: boolean,
    onClose: () => void
}

export interface ImageUploadModalProps extends ModalProps {
    onUploadSuccess: (imageUrl: string) => void
}