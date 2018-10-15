import { Keyword } from './keyword.model';
import { ScreenImage } from "./screen.model";
import { Milestone } from "./milestone.model";

export class Project 
{
    public title: string;
    public type: string;
    public is_public: string = '';
    public url: string = '';
    public description: string = '';
    public keywords: Array<Keyword> = new Array<Keyword>();
    public screens: Array<ScreenImage> = new Array<ScreenImage>();
    public milestones: Array<Milestone> = new Array<Milestone>();
}