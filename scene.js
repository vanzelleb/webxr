import usePiece from "./piece.js";
import { loadMesh } from "./loadMesh.js";

const createScene = async function (scene, engine, canvas) {
  var scene = new BABYLON.Scene(engine);
  scene.createDefaultCameraOrLight(true, true, true);
  const env = scene.createDefaultEnvironment({
    createGround: true,
    createSkybox: false,
  });

  var texture = new BABYLON.HDRCubeTexture("textures/parking.hdr", scene, 512);
  scene.createDefaultSkybox(texture, true, 100);

  const xr = await scene.createDefaultXRExperienceAsync({
    floorMeshes: [env.ground],
  });

  const gizmoManager = new BABYLON.GizmoManager(scene);
  gizmoManager.positionGizmoEnabled = true;
  gizmoManager.rotationGizmoEnabled = true;
  gizmoManager.scaleGizmoEnabled = true;
  gizmoManager.boundingBoxGizmoEnabled = true;
  gizmoManager.usePointerToAttachGizmos = false;
  usePiece(xr, gizmoManager);

  engine.runRenderLoop(() => {
    if (scene) {
      scene.render();
    }
  });
};

export default createScene;
