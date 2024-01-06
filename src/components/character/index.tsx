import { useEffect, useState } from "react";
import CharacterBody from "./CharacterBody";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCharMovement } from "@/lib/features/movement/movementSlice";
import { Direction } from "@/lib/features/movement/movementSlice";

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

export default function Character(props: Props){
    const [pressedKey, setPressedKey] = useState<Direction[]>([])
    const movement: Direction = useAppSelector(state => state.movement.value)
    const dispatch = useAppDispatch()

    const size = props.size;
    const position = props.position;
    

    useEffect(() => {
        const keyDownHandler = (e:any) => {
            switch(e.code){
                case "KeyA":
                    setPressedKey(prevState => {
                        if(prevState.find(dir => dir === Direction.Left)){
                            return prevState;
                        }

                        return [...prevState, Direction.Left]
                    })
                    break;
                case "KeyS":
                    setPressedKey(prevState => {
                        if(prevState.find(dir => dir === Direction.Down)){
                            return prevState;
                        }
                        
                        return [...prevState, Direction.Down]
                    })
                    break;
                case "KeyD":
                    setPressedKey(prevState => {
                        if(prevState.find(dir => dir === Direction.Right)){
                            return prevState;
                        }
                        
                        return [...prevState, Direction.Right]
                    })
                    break;    
                case "KeyW":
                    setPressedKey(prevState => {
                        if(prevState.find(dir => dir === Direction.Up)){
                            return prevState;
                        }
                        
                        return [...prevState, Direction.Up]
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
                        return prevState.filter(dir => dir !== Direction.Left)
                    })
                    break;
                case "KeyS":
                    setPressedKey(prevState => {
                        return prevState.filter(dir => dir !== Direction.Down)
                    })
                    break;
                case "KeyD":
                    setPressedKey(prevState => {
                        return prevState.filter(dir => dir !== Direction.Right)
                    })
                    break;    
                case "KeyW":
                    setPressedKey(prevState => {
                        return prevState.filter(dir => dir !== Direction.Up)
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
            dispatch(setCharMovement({direction: firstKey}))
        }

        if((firstKey === Direction.Left && secondKey === Direction.Up) || (firstKey === Direction.Up && secondKey === Direction.Left)){
            dispatch(setCharMovement({direction: Direction.DiagonalUpLeft}))
        }

        if((firstKey === Direction.Right && secondKey === Direction.Up) || firstKey === Direction.Up && secondKey === Direction.Right){
            dispatch(setCharMovement({direction: Direction.DiagonalUpRight}))
        }

        if((firstKey === Direction.Left && secondKey === Direction.Down) || (firstKey === Direction.Down && secondKey === Direction.Left)){
            dispatch(setCharMovement({direction: Direction.DiagonalDownLeft}))
        }

        if((firstKey === Direction.Right && secondKey === Direction.Down) || firstKey === Direction.Down && secondKey === Direction.Right){
            dispatch(setCharMovement({direction: Direction.DiagonalDownRight}))
        }

    }, [pressedKey]);

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