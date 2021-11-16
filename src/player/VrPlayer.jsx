// import { useVrControls } from "@/hooks/useVrControls"
import { useFrame } from "@react-three/fiber"
import { useController, useXR, useXREvent, useXRFrame } from "@react-three/xr"
import { useEffect, useRef } from "react"
import { Vector3 } from "three"

const SPEED = 0.1

export const VrPlayer = (props) => {
    const { player } = useXR()
    const leftController = useController('left') 
    const rightController = useController('right') 

    const movement = useRef({
        frontBackVector: 0.0, // -1.0 to 1.0
        leftRightVector: 0.0, // -1.0 to 1.0
        jump: false,
        sprint: false
    })

    // useXREvent('selectstart', () => {
    //     console.log('Jump initiated')
    //     movement.current.jump = true
    // }, { handedness: 'right' })
    // useXREvent('select', () => {
    //     console.log('Jump complete')
    //     movement.current.jump = false
    // }, { handedness: 'right' })

    useXREvent('squeezestart', () => {
        console.log('Sprint initiated')
        movement.current.sprint = true
    })
    useXREvent('squeeze', () => {
        console.log('Sprint complete')
        movement.current.sprint = false
    })

    useFrame(({camera}) => {
        if (!leftController || !rightController) return

        let speedMultiplier = 1

        const leftControllerStick = leftController.inputSource.gamepad.axes
        const forwardAmount = leftControllerStick[3]
        const sideAmount = leftControllerStick[2]

        const isJumping = movement.current.jump
        const isSprinting = movement.current.sprint

        const direction = new Vector3()
        const frontVector = new Vector3(0, 0, forwardAmount)
        const sideVector = new Vector3(-sideAmount, 0, 0)

        async function Jump() {
            // needs implementation (@react-three/xr has bad documentation)
            // specifically need to add velocity or impulse to the player
        }
        
        if (isSprinting) {
            speedMultiplier = 2
        }

        direction.subVectors(frontVector, sideVector).multiplyScalar(SPEED * speedMultiplier).applyEuler(camera.rotation)

        if (isJumping && player.position.y < 0.1) {
            Jump()
        }

        player.position.z += direction.z
        player.position.x += direction.x
    })

    return null
}