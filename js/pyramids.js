"use strict"
class Group extends THREE.Group
{
    constructor()
    {
        super();
    }
}

class Model extends THREE.Mesh
{
    constructor(geometry, material){
        super(geometry, material);
    }
    setTextureMaterial()
    {
         this.material = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("./textures/" + this.imageTexture), shininess: 100});
    }
    setNormalMaterial()
    {
         this.material = new THREE.MeshNormalMaterial();
    }
    setWireframeMaterial()
    {
         this.material = new THREE.MeshBasicMaterial({wireframe: true});
    }
}

class PyramidModel extends Model{
    constructor(){
        super(new THREE.ConeGeometry(1.5, 2, 4), new THREE.MeshBasicMaterial({wireframe: true}));
    }
}

class Pyramid extends PyramidModel {
    constructor(){
        super();
        this.imageTexture = "pyramid.jpg";
        this.castShadow = true;
        this.receiveShadow = true;
    }
}