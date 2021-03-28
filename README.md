[![GitHub license](https://img.shields.io/github/license/ethanny2/threejs-webpack-boiler-staticsite)](https://github.com/ethanny2/threejs-webpack-boiler-staticsite)[![GitHub stars](https://img.shields.io/github/stars/ethanny2/threejs-webpack-boiler-staticsite)](https://github.com/ethanny2/threejs-webpack-boiler-staticsite/stargazers)[![GitHub forks](https://img.shields.io/github/forks/ethanny2/threejs-webpack-boiler-staticsite)](https://github.com/ethanny2/threejs-webpack-boiler-staticsite/network)[![Twitter Badge](https://img.shields.io/badge/chat-twitter-blue.svg)](https://twitter.com/ArrayLikeObj)

# Threejs + Webpack 4 Static Site

## [https://threejs-webpack-boilerplate.netlify.app/](https://threejs-webpack-boilerplate.netlify.app/)

<p align="center">
  <img width="460" height="300" src="https://media2.giphy.com/media/Ew5p0EpLDcPuXHhu7J/giphy.gif" alt="Demo gif">
</p>


## Background
This is a companion static site to promote my other project [threejs webpack boilerplate](https://github.com/ethanny2/threejs-es6-webpack-barebones-boilerplate). This is site is actually made from the boilerplate and demonstrates how to use it to make a simple Threejs site.

## Technology used
- SCSS
- CSS Custom Properties (Variables)
- Threejs running with webpack
- webpack 4 
- Tween js animation library
## Concepts

### webpack 4 bundling

Using my own custom webpack 4 dev and production configuration to have a local dev-server with [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/) and optimizied production build with minification, auto-prefixing for CSS properties and more.


### Threejs + Tweenjs
To more accurately animate the rotation of the cube I opted to use the Tween.js library which works very well with the [3D vectors](https://threejs.org/docs/#api/en/math/Vector3) in Threejs. 

```
  //Initialize the rotation tween from 0deg to 360deg
  cubeRotateTweenA = new TWEEN.Tween(mesh.rotation)
    .to(rotateCoords, duration)
    .easing(TWEEN.Easing.Linear.None);

  cubeRotateTweenA.start();
  cubeRotateTweenA.repeat(Infinity);

  //Rotate outer shell
  outerLayerTween = new TWEEN.Tween(outerCube.rotation)
    .to(rotateCoords, duration)
    .easing(TWEEN.Easing.Linear.None);

  outerLayerTween.start();
  outerLayerTween.repeat(Infinity);
```