export interface coordinatorType{
    name:string,
    phone:string,
}
export interface eventInputType {
    name:string,
    description:string,
    date:string,
    minTeamSize:number,
    maxTeamSize:number,
    category:string,
    time:string,
    venue:string,
    coordinators:coordinatorType[],
    price:string,
    prize:string,
    rules:string,
    imagePath:string,
}