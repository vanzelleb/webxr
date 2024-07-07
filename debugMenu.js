const debugConsole = new BABYLON.GUI.TextBlock();
debugConsole.height = "30px";
debugConsole.color = "white";
debugConsole.textWrapping = true;
debugConsole.text = "Hello";

const slate = new BABYLON.GUI.HolographicSlate();
var manager = new BABYLON.GUI.GUI3DManager();
var panel = new BABYLON.GUI.StackPanel3D();
panel.margin = 0.05;
panel.isVertical = true;
manager.addControl(panel);
manager.addControl(slate);
slate.content = debugConsole;
slate.position = new BABYLON.Vector3(0, 20, 20);

const printCoordinates = function (mesh) {
  debugConsole.text =
    "X:" +
    mesh.position.x.toFixed(2) +
    " Y:" +
    mesh.position.y.toFixed(2) +
    " Z:" +
    mesh.position.z.toFixed(2) +
    " X:" +
    Math.trunc(BABYLON.Tools.ToDegrees(mesh.rotation.x)) +
    " Y:" +
    Math.trunc(BABYLON.Tools.ToDegrees(mesh.rotation.y)) +
    " Z:" +
    Math.trunc(BABYLON.Tools.ToDegrees(mesh.rotation.z));
};

var initialYPos = 0.4;

const sliders = {
  sliderRotX: ["rotation", "x"],
  sliderRotY: ["rotation", "y"],
  sliderRotZ: ["rotation", "z"],
  sliderPosX: ["position", "x"],
  sliderPosY: ["position", "y"],
  sliderPosZ: ["position", "z"]
};

function useDebugSliders(mesh) {
  const createSlider = function (name) {
    let slider = new BABYLON.GUI.Slider3D(name);
    panel.addControl(slider);
    slider.maximum = 2 * Math.PI;
    initialYPos = initialYPos + 0.2;
    slider.position.y = initialYPos;
    slider.onValueChangedObservable.add(function (value) {
      console.log(sliders[name][0]);
      console.log(sliders[name][1]);

      mesh[sliders[name][0]][sliders[name][1]] = value;
      printCoordinates(mesh);
    });
  };

  if (mesh)
    Object.keys(sliders).forEach((name) => {
      createSlider(name);
    });
}

export { useDebugSliders, debugConsole };
