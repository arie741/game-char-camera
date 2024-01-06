import Image from 'next/image'
import { Direction } from '@/lib/features/movement/movementSlice';

interface Props {
    movement: Direction
}

export default function CharacterBody(props: Props){
    const movement = props.movement;

    return (
        <>
            {movement === Direction.Neutral && <Image src="/sprites/CharNeutral.png" width={300} height={500} alt=""/>}
            {movement === Direction.Up && <Image src="/sprites/CharUp.png" width={300} height={500} alt=""/>}
            {movement === Direction.Left && <Image src="/sprites/CharLeft.png" width={300} height={500} alt=""/>}
            {movement === Direction.Right &&  <Image src="/sprites/CharRight.png" width={300} height={500} alt=""/>}
            {movement === Direction.Down && <Image src="/sprites/CharDown.png" width={300} height={500} alt=""/>}
            {movement === Direction.DiagonalUpLeft && <Image src="/sprites/CharDiagUpLeft.png" width={300} height={500} alt=""/>}
            {movement === Direction.DiagonalUpRight && <Image src="/sprites/CharDiagUpRight.png" width={300} height={500} alt=""/>}
            {movement === Direction.DiagonalDownLeft && <Image src="/sprites/CharDiagDownLeft.png" width={300} height={500} alt=""/>}
            {movement === Direction.DiagonalDownRight && <Image src="/sprites/CharDiagDownRight.png" width={300} height={500} alt=""/>}
        </>
    )
}