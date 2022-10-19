import { Skill } from "./skill.model";

export class Employee {
    public id: number = -1;
    public fullName: string = '';
    public email: string = '';
    public phone: string = '';
    public contactPreference: string = '';
    public skills: Skill[] = [];
}
