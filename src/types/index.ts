import { ReactNode } from "react";

export interface ILayoutProps {
	pagename: string;
	children: ReactNode;
}

export interface INavBarProps {
	pagename?: string;
}

export interface Person {
	id?: string;
	name?: string;
	gender?: string;
	height?: string;
	mass?: string;
	homeworld?: HomeWorld;
}

export interface HomeWorld {
	name?: string;
	gravity?: string;
	population?: string;
	terrain?: string;
}

export interface PersonParams {
	id: string
}
