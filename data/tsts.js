let new_assets;
let new_assets_item;
let new_gltf_model;
var bool = false;
  
new_assets = document.createElement('a-assets');

new_assets_item = document.createElement('a-assets-item');
new_assets_item.setAttribute('id', 'model-frame');
new_assets_item.setAttribute('src', './data/frame.glb');

new_assets.appendChild(new_assets_item);
scene.appendChild(new_assets);

//　木枠の生成
new_gltf_model = document.createElement('a-gltf-model');
new_gltf_model.setAttribute('id', 'frame');
//new_gltf_model.setAttribute('dynamic-body', 'shape: cube; mass: 1');
new_gltf_model.setAttribute('position', '0 -5 -5');
new_gltf_model.setAttribute('rotation', '0 0 0');
new_gltf_model.setAttribute('scale', '0.6 0.6 0.6')
new_gltf_model.setAttribute('src', '#model-frame');
new_gltf_model.setAttribute('box-colider', '');

scene.appendChild(new_gltf_model);

new_assets_item = document.createElement('a-assets-item');
new_assets_item.setAttribute('id', 'model-tube');
new_assets_item.setAttribute('src', './data/tube.glb');

new_assets.appendChild(new_assets_item);



document.addEventListener('click', () => {
  document.querySelectorAll('.permission_ui').forEach((del) => {
    del.setAttribute('class', 'deleted_ui');
  });
  document.getElementById('main').removeAttribute('style');
  document.getElementById('b1').removeAttribute('class');
  if (window.DeviceMotionEvent && window.DeviceMotionEvent.requestPermission) {
    DeviceMotionEvent.requestPermission()
                     .then((state) => {
                       if (state === 'granted') {
                       } else {
                         alert('動作と方向へのアクセスを許可してください');
                       }
                     })
                     .catch((err) => console.error(err));
  }
}, {
  once: true
});


function tenka() {
  if (!bool) {
    document.getElementById('ui').setAttribute('class', 'permission_ui');
    document.getElementById('fire').setAttribute('style', 'color: black');
    document.getElementById('main').setAttribute('style', 'position: static');
  }
}