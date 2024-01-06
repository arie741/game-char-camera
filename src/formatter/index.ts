import { Direction } from "@/components/character";

export function formatSingleKeyToDirection(key: string):Direction{
    switch(key){
        case "top":
            return Direction.Up;
        case "left":
            return Direction.Left;
        case "right":
            return Direction.Right;
        case "down":
            return Direction.Down;
        default:
            return Direction.Neutral;
    }
}