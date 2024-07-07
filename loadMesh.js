const loadMesh = function (url) {
  //BABYLON.SceneLoader.LoadAssetContainerAsync(url).then((container) => {
  return BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "models/",
    prepDropboxUrl(url),
  ).then((result) => {
    result.meshes[0].name = url;
    // resize mesh to max size of 1m and center it in the scene
    result.meshes[0].normalizeToUnitCube(true, false, false);
    centerMesh(result.meshes[0]);
    return result.meshes[0];
  });
};

// centers the mesh and makes that it touches the ground
function centerMesh(mesh) {
  mesh.position = new BABYLON.Vector3(0, 0, 0);

  // get lowest point in mesh hierarchy
  let bbMin = mesh.getHierarchyBoundingVectors().min;
  mesh.position.x = 0 - bbMin.x;
  mesh.position.y = 0 - bbMin.y;
  mesh.position.z = 0 - bbMin.z;
}

// changes the URL according to the Dropbox specs
function prepDropboxUrl(url) {
  return url.replace("www", "dl").replace("dl=0", "dl=1");
}

export { loadMesh, centerMesh };
