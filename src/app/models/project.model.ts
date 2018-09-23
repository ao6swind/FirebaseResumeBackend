import { Screen } from "./screen.model";
import { Milestone } from "./milestone.model";

export class Project 
{
    public name: string;
    public type: string;
    public keywords: string[];
    public is_public: boolean;
    public url: string;
    public description: string;
    public screens: Array<Screen>;
    public milestones: Array<Milestone>;
}