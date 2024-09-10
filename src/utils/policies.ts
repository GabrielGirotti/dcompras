import { Shop, TeamMember } from "../types";

export const isManager = (managerId: Shop['_id'], userId:TeamMember['_id'])=>{
return managerId === userId
}