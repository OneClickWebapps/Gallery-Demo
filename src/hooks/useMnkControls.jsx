import { useEffect, useState } from "react"

function moveFieldByKey(key) {
    const keys = {
        KeyW: "moveForward",
        KeyS: "moveBackward",
        KeyA: "moveLeft",
        KeyD: "moveRight",
        Space: "jump",
        ShiftLeft: "sprint"
    }
    return keys[key]
}

export const useMnkControls = () => {
    const [ movement, setMovement ] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        sprint: false
    })

    useEffect(() => {
        const handleKeyDown = (e) => {
            setMovement(m => ({
                ...m,
                [moveFieldByKey(e.code)]: true
            }))
        }

        const handleKeyUp = (e) => {
            setMovement(m => ({
                ...m,
                [moveFieldByKey(e.code)]: false
            }))
        }

        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    return movement
}