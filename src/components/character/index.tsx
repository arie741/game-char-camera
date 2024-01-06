import { formatSingleKeyToDirection } from "@/formatter";
import { useEffect, useState } from "react";
import CharacterBody from "./CharacterBody";

interface Position {
    x: number | string;
    y: number | string;
}

interface Size {
    height: number | string;
    width: number | string;
}

interface Props {
    position: Position;
    size: Size;
}

export enum Direction {
    Neutral = "neutral",
    Up = "up",
    Left = "left",
    Right = "right",
    Down = "down",
    DiagonalUpLeft = "diagonalUpLeft",
    DiagonalUpRight = "diagonalUpRight",
    DiagonalDownLeft = "diagonalDownLeft",
    DiagonalDownRight = "diagonalDownRight",
}

export default function Character(props: Props){
    const [movement, setMovement] = useState<Direction>(Direction.Neutral);
    const [pressedKey, setPressedKey] = useState<string[]>([])
    const size = props.size;
    const position = props.position;

    useEffect(() => {
        const keyDownHandler = (e:any) => {
            switch(e.code){
                case "KeyA":
                    setPressedKey(prevState => {
                        if(prevState.find(dir => dir === "left")){
                            return prevState;
                        }

                        return [...prevState, "left"]
                    })
                    break;
                case "KeyS":
                    setPressedKey(prevState => {
                        if(prevState.find(dir => dir === "down")){
                            return prevState;
                        }
                        
                        return [...prevState, "down"]
                    })
                    break;
                case "KeyD":
                    setPressedKey(prevState => {
                        if(prevState.find(dir => dir === "right")){
                            return prevState;
                        }
                        
                        return [...prevState, "right"]
                    })
                    break;    
                case "KeyW":
                    setPressedKey(prevState => {
                        if(prevState.find(dir => dir === "top")){
                            return prevState;
                        }
                        
                        return [...prevState, "top"]
                    })
                    break;
                default:
                    break;
            }
        }

        const keyUpHandler = (e:any) => {
            switch(e.code){
                case "KeyA":
                    setPressedKey(prevState => {
                        return prevState.filter(dir => dir !== "left")
                    })
                    break;
                case "KeyS":
                    setPressedKey(prevState => {
                        return prevState.filter(dir => dir !== "down")
                    })
                    break;
                case "KeyD":
                    setPressedKey(prevState => {
                        return prevState.filter(dir => dir !== "right")
                    })
                    break;    
                case "KeyW":
                    setPressedKey(prevState => {
                        return prevState.filter(dir => dir !== "top")
                    })
                    break;
                default:
                    break;
            }
        }

        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);

        // clean up
        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, [])

    useEffect(() => {
        const firstKey = pressedKey[0];
        const secondKey = pressedKey[1];
        
        if(!secondKey && firstKey){ 
            setMovement(formatSingleKeyToDirection(firstKey))
        }

        if((firstKey === "left" && secondKey === "top") || (firstKey === "top" && secondKey === "left")){
            setMovement(Direction.DiagonalUpLeft);
        }

        if((firstKey === "right" && secondKey === "top") || firstKey === "top" && secondKey === "right"){
            setMovement(Direction.DiagonalUpRight);
        }

        if((firstKey === "left" && secondKey === "down") || (firstKey === "down" && secondKey === "left")){
            setMovement(Direction.DiagonalDownLeft);
        }

        if((firstKey === "right" && secondKey === "down") || firstKey === "down" && secondKey === "right"){
            setMovement(Direction.DiagonalDownRight);
        }

        if(!firstKey && !secondKey){
            setMovement(Direction.Neutral)
        }

    }, [pressedKey])

    useEffect(() => {
        console.log(movement)
    }, [movement])

    return (
        <div style={{
            width: size.width,
            height: size.height,
            position: "absolute",
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)"
        }}>
            <CharacterBody movement={movement}/>
        </div>
    )
}