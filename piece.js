import { loadMesh } from "./loadMesh.js";
import { addNearMenuButton } from "./nearmenu.js";
import { useDebugSliders } from "./debugMenu.js";

const handConstraintBehavior = new BABYLON.HandConstraintBehavior();
handConstraintBehavior.handConstraintVisibility = 0;
handConstraintBehavior.targetZone = 0;
// default lerpTime is 100
handConstraintBehavior.lerpTime = 150;
handConstraintBehavior.handedness = "right";

var mat = new BABYLON.StandardMaterial("mat");
mat.alpha = 0;
mat.wireframe = true;
const box = BABYLON.MeshBuilder.CreateBox("box", { size: 0.2 });
box.material = mat;

export default function usePiece(xr, gizmoManager) {
  loadMesh("piece.glb").then((mesh) => {
    mesh.position = new BABYLON.Vector3(0, 0, 0);
    mesh.scaling.scaleInPlace(0.22);
    mesh.rotation = new BABYLON.Vector3(0, 0, 0);
    mesh.bakeCurrentTransformIntoVertices();
    mesh.position = new BABYLON.Vector3(0.1, 0.03, -0.05);
    mesh.addRotation(
      BABYLON.Tools.ToRadians(-36),
      BABYLON.Tools.ToRadians(130),
      BABYLON.Tools.ToRadians(-60),
    );
    mesh.setParent(box);
    handConstraintBehavior.attach(box);
    handConstraintBehavior.linkToXRExperience(xr.baseExperience);
    //addNearMenuButton(container, gizmoManager);
  });
}
