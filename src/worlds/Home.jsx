import { VRCanvas, DefaultXRControllers } from "@react-three/xr";
import { Ground } from "@/objects/Ground";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Vector3 } from "three";
import { Lights } from "@/lights";
// import { Camera } from "@/camera";
import { Player } from "@/player";
import Gallery from "@/objects/Gallery"
import { Suspense } from "react";

export const Home = () => {
    return (
        <VRCanvas shadows gl={{ alpha: false }}>
                <DefaultXRControllers />
                {/* <Camera fov={75} position={[0, 10, 0]} /> */}
                <Sky sunPosition={new Vector3(100, 10, 100)} />
                <Lights />
                <Physics gravity={[0, -30, 0]}>
                    <Suspense fallback={null}>
                        <Ground />
                        <Player />
                        <Gallery scale={[0.01,0.01,0.01]} position={[-3, 0.1, 5]} />
                    </Suspense>
                </Physics>
        </VRCanvas>
    )
}