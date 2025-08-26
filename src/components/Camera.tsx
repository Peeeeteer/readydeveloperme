import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { useMediaQuery } from "react-responsive";
import * as THREE from "three";


const CameraPosition = {

    "front": {
        position: new THREE.Vector3(0, 1, 7.5),
        target: new THREE.Vector3(0, 1, 0),
    },

    "close_up": {
        position: new THREE.Vector3(0, 1.8, 3),
        // I could probably add the head ref positiong&target here.
        target: new THREE.Vector3(0, 1.8, 0),
    },

    "side": {
        position: new THREE.Vector3(8, 1, 0),
        target: new THREE.Vector3(0, 1, 0),
    },

    "logo": {
        position: new THREE.Vector3(0.19, 1.6, 3),
        // I could probably add the logo ref positiong&target here.
        target: new THREE.Vector3(0.19, 1.6, 0.2),
    },

    "free": "free"

}


const CameraControls = ({ viewMode, setViewMode }) => {

    const orbitControls = useRef();
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    
    // Mobile-adjusted positions (2.25% to the left for close_up)
    const getMobileAdjustedPosition = (position, target) => {
        if (!isMobile) return { position, target };
        
        // For close_up view, move 2.25% to the left
        if (viewMode === "close_up") {
            const adjustedTarget = target.clone();
            adjustedTarget.x -= 0.0225; // 2.25% adjustment to the left
            return { position, target: adjustedTarget };
        }
        
        return { position, target };
    };

    useFrame((state, delta) => {

        if (viewMode === "free") return;

        if (viewMode == "front") {
            state.camera.position.lerp(CameraPosition.front.position, 3 * delta)
            orbitControls.current.target.lerp(CameraPosition.front.target, 3 * delta)
        }

        if (viewMode == "close_up") {
            const { position, target } = getMobileAdjustedPosition(
                CameraPosition.close_up.position, 
                CameraPosition.close_up.target
            );
            state.camera.position.lerp(position, 3 * delta)
            orbitControls.current.target.lerp(target, 3 * delta)

        }

        if (viewMode == "side") {
            state.camera.position.lerp(CameraPosition.side.position, 3 * delta)
            orbitControls.current.target.lerp(CameraPosition.side.target, 3 * delta)

        }
        if (viewMode == "logo") {
            state.camera.position.lerp(CameraPosition.logo.position, 3 * delta)
            orbitControls.current.target.lerp(CameraPosition.logo.target, 3 * delta)
        }


    }
    )

    return (
        <>
            <OrbitControls
                ref={orbitControls}
                onStart={() => {
                    setViewMode("free");
                }}
                ameraminPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} enablePan={false}
                minDistance={2} maxDistance={10}


            />
        </>
    )
}

export default CameraControls