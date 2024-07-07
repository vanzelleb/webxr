export default function useController(scene, gizmoManager, xr) {
  // When a mouse button is clicked while hovering over a mesh
  scene.onPointerDown = function (evt, pickResult) {
    if (pickResult.hit) {
      gizmoManager.boundingBoxGizmoEnabled = true;
    }
  };

  // When RIGHT MOUSE button is released
  scene.onPointerUp = function (evt, pickResult) {
    if (evt.button === 2) {
      gizmoManager.attachToMesh(null);
      gizmoManager.boundingBoxGizmoEnabled = false;
    }
  };

  // logic for Oculus controller
  xr.input.onControllerAddedObservable.add((controller) => {
    controller.onMotionControllerInitObservable.add((motionController) => {
      if (motionController.handness === "right") {
        const xr_ids = motionController.getComponentIds();
        // get a-button
        const aButton = motionController.getComponent(xr_ids[3]);
        aButton.onButtonStateChangedObservable.add(() => {
          if (aButton.pressed) {
            gizmoManager.attachToMesh(null);
            gizmoManager.boundingBoxGizmoEnabled = false;
          }
        });
      }
    });
  });
}
