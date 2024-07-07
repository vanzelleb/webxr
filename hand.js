//import { debugConsole } from "./debugMenu.js";

export default function useHand(xr) {
  const hand = {};

  try {
    let xrHandFeature = xr.baseExperience.featuresManager.enableFeature(
      BABYLON.WebXRFeatureName.HAND_TRACKING,
      "latest",
      {
        xrInput: xr.input,
        /*jointMeshes: {
          enablePhysics: true
        }*/
      },
    );
    /*
    xrHandFeature.onHandAddedObservable.add((newHand) => {
      // after the controllers were initialized
      let rightHand = xrHandFeature.getHandByHandedness("right");
      // See https://immersive-web.github.io/webxr-hand-input/#skeleton-joints-section
      hand["f21"] = rightHand.getJointMesh("pinky-finger-phalanx-proximal");
      hand["f6"] = rightHand.getJointMesh("index-finger-phalanx-proximal");
      hand["f0"] = rightHand.getJointMesh("wrist");
    });
    */
    //debugConsole.text = "Hands work";
  } catch (err) {
    //debugConsole.text = "Articulated hand tracking not supported in this browser.";
  }

  return { hand };
}
