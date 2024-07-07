import { debugConsole } from "./debugMenu.js";
import { centerMesh } from "./loadMesh.js";

var manager = new BABYLON.GUI.GUI3DManager();
manager.useRealisticScaling = true;

var menu = new BABYLON.GUI.NearMenu("nearmenu");
manager.addControl(menu);
menu.position.x = -1;
menu.position.y = 1;
menu.position.z = -0.6;
menu.isPinned = true;

const addNearMenuButton = function (mesh, gizmoManager) {
  var button = new BABYLON.GUI.TouchHolographicButton(mesh.name);
  button.text = mesh.name;
  menu.addButton(button);

  button.onPointerDownObservable.add(() => {
    gizmoManager.attachToMesh(mesh);
    gizmoManager.boundingBoxGizmoEnabled = true;
    //centerMesh(mesh);
  });
};

export { addNearMenuButton };
