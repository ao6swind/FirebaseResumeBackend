import { Link } from "./link.model";

export class Introduction 
{
    public photo: string;
    public resume: string;
    public profile: string;
    public links: Array<Link> = new Array<Link>();
}