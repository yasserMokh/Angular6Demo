import { Skill } from "./skill.model";

export class Employee {
    public id: number | null = null;
    public fullName: string = '';
    public email: string = '';
    public confirmEmail: string = '';
    public phone: string = '';
    public contactPreference: string = '';
    public skills: Skill[] = [];
}
