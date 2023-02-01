import '@kitware/vtk.js/favicon';
//import './index2.js';
// Import our custom CSS


// Import our custom CSS
//import './styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';

import vtkCircleSource from '@kitware/vtk.js/Filters/Sources/CircleSource';
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkOpenGLRenderWindow from '@kitware/vtk.js/Rendering/OpenGL/RenderWindow';
import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer';
import vtkInteractorStyleTrackballCamera from '@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera';
import vtkVolumeController from '@kitware/vtk.js/Interaction/UI/VolumeController';

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Volume';

// Force DataAccessHelper to have access to various data source
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper';

import macro from '@kitware/vtk.js/macros';

import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkGenericRenderWindow from '@kitware/vtk.js/Rendering/Misc/GenericRenderWindow';
import vtkRenderWindowWithControlBar from '@kitware/vtk.js/Rendering/Misc/RenderWindowWithControlBar';
import vtkHttpDataSetReader from '@kitware/vtk.js/IO/Core/HttpDataSetReader';
import vtkImageMapper from '@kitware/vtk.js/Rendering/Core/ImageMapper';
import vtkImageSlice from '@kitware/vtk.js/Rendering/Core/ImageSlice';
import vtkResourceLoader from '@kitware/vtk.js/IO/Core/ResourceLoader';
// Fetch the data. Other options include `fetch`, axios.
import vtkLiteHttpDataAccessHelper from '@kitware/vtk.js/IO/Core/DataAccessHelper/LiteHttpDataAccessHelper';
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
import vtkITKHelper from '@kitware/vtk.js/Common/DataModel/ITKHelper';
import vtkPolyDataReader from '@kitware/vtk.js/IO/Legacy/PolyDataReader';
import vtkXMLPolyDataReader from '@kitware/vtk.js/IO/XML/XMLPolyDataReader';
// import style from './style_1.css';



// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

  

 
   // const button_el=document.getElementById('random_button')
   
   // if (button_el !== null){
	// var randomlinks = JSON.parse(sessionStorage.getItem("randomlinks"));
	// button_el.addEventListener('click', function(event) {
	// const index=Math.floor(Math.random()*randomlinks.length)
	// if (randomlinks.length>0){
		
	
	// button_el.setAttribute("href", randomlinks[index]); 
	// var r=randomlinks.splice(index,1);   
	// sessionStorage.setItem('randomlinks', JSON.stringify(randomlinks));
	// // alert(randomlinks);
	// }
	// else{
	// button_el.setAttribute("href", "./Thankyou.html");
	// }
    // });
   // }
   
      // const button_el=document.getElementById('form')
   
   
	// var randomlinks = JSON.parse(sessionStorage.getItem("randomlinks"));
	// const index=Math.floor(Math.random()*randomlinks.length)
	// if (randomlinks.length>0){
	// button_el.setAttribute("action", randomlinks[index]); 
	// var r=randomlinks.splice(index,1);   
	// sessionStorage.setItem('randomlinks', JSON.stringify(randomlinks));
	// // alert(randomlinks);
	// }
	// else{
	// button_el.setAttribute("action", "./Thankyou.html");
	// }
    

				  
				  
   
   
   




 let element_loaded=0;
 let updated=0;
 let uncer=0;
 
const cases = document.getElementById('case');


const link_fiber_samples = document.getElementById('link_fiber_samples');
const link_fibers = document.getElementById('link_fibers');
const link_deterministic = document.getElementById('link_deterministic');
const link_tumor = document.getElementById('link_tumor');
const link_data = document.getElementById('link_data')
const link_fiber_samples_25 = document.getElementById('link_fiber_samples_25');
const link_fiber_samples_75 = document.getElementById('link_fiber_samples_75');

let tr=0;
if ((link_deterministic!==null) &&(link_fiber_samples!==null) )
{tr=1;}

let data=0;

const back = [0.9, 0.9, 0.9]



const renderWindow = vtkRenderWindow.newInstance();
const renderer = vtkRenderer.newInstance({ background: back });
// renderWindow.addRenderer(renderer);



const openglRenderWindow = vtkOpenGLRenderWindow.newInstance();
renderWindow.addView(openglRenderWindow);
    renderWindow.addRenderer(renderer);

// ----------------------------------------------------------------------------
// Create a div section to put this into
// ----------------------------------------------------------------------------

var load = document.createElement('div');
load.classList.add("loader");
 
var load_text = document.createElement('div');
load_text.classList.add("loader_text");
load_text.style.textAlign = "center"
load_text.innerHTML = 'Downloading data...<br><br>Please wait for the interactor to be loaded. <br> It might take few minutes...';

var load_text_bottom = document.createElement('div');
load_text_bottom.classList.add("loader_text_bottom");
load_text_bottom.style.textAlign = "center"
load_text_bottom.style.fontSize = "small";
load_text_bottom.innerHTML = 'Please refresh the page if the loading takes <br> more than 5 minutes or the data is not properly loaded..';

const container = document.createElement('div');
//container.style.zIndex = "5";
container.style.width = "90%";
container.style.position = "relative";
container.style.paddingLeft = "5%";
//container.style.left="5%"
//container.style.right="50%" 
container.appendChild(load);
container.appendChild(load_text);
container.appendChild(load_text_bottom);
document.querySelector('.render').appendChild(container);
openglRenderWindow.setContainer(container);


const imageActorI = vtkImageSlice.newInstance();
const imageActorJ = vtkImageSlice.newInstance();
const imageActorK = vtkImageSlice.newInstance();

const actor1 = vtkActor.newInstance();
const mapper1 = vtkMapper.newInstance();
actor1.setMapper(mapper1);


const actor_samples_100 = vtkActor.newInstance();
const mapper_samples_100 = vtkMapper.newInstance();
actor_samples_100.setMapper(mapper_samples_100);

const actor_samples_25 = vtkActor.newInstance();
const mapper_samples_25 = vtkMapper.newInstance();
actor_samples_25.setMapper(mapper_samples_25);

const actor_samples_75 = vtkActor.newInstance();
const mapper_samples_75 = vtkMapper.newInstance();
actor_samples_75.setMapper(mapper_samples_75);




const actor1_3 = vtkActor.newInstance();
const mapper1_3 = vtkMapper.newInstance();
actor1_3.setMapper(mapper1_3);

const actor2 = vtkActor.newInstance();
const mapper2 = vtkMapper.newInstance();
actor2.setMapper(mapper2);

renderer.addActor(imageActorK);
renderer.addActor(imageActorJ);
renderer.addActor(imageActorI);
//renderer.addActor(actor1);
//renderer.addActor(actor_samples_100);
renderer.addActor(actor2);
//renderer.addActor(actor_samples_25);
//renderer.addActor(actor_samples_75);

const actor = vtkVolume.newInstance();
const mapper = vtkVolumeMapper.newInstance();
mapper.setSampleDistance(0.7);
actor.setMapper(mapper);
// ----------------------------------------------------------------------------
// Simple pipeline ConeSource --> Mapper --> Actor
// ----------------------------------------------------------------------------



// const progressCallback = (progressEvent) => {
	  // const a= macro.formatBytesToProperUnit(
           // progressEvent.total
         // );
// }

const { width, height } = container.getBoundingClientRect();
openglRenderWindow.setSize(width, height);


const interactor = vtkRenderWindowInteractor.newInstance();
interactor.setView(openglRenderWindow);
interactor.initialize();
interactor.bindEvents(container);

// ----------------------------------------------------------------------------
// Setup interactor style to use
// ----------------------------------------------------------------------------

//interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());	


async function update() {
  const volumeArrayBuffer = await vtkLiteHttpDataAccessHelper.fetchBinary(
    link_data.innerHTML
  );



  const { image: itkImage, webWorker } = await window.itk.readImageArrayBuffer(
    null,
    volumeArrayBuffer,
    'T1_mha_tumor.mha'
   );
  webWorker.terminate();

  const vtkImage = vtkITKHelper.convertItkToVtkImage(itkImage);
  const dataRange = vtkImage.getPointData().getScalars().getRange();
  const extent = vtkImage.getExtent();




  const imageMapperK = vtkImageMapper.newInstance();
  imageMapperK.setInputData(vtkImage);
  imageMapperK.setKSlice(30);
  imageActorK.setMapper(imageMapperK);

  const imageMapperJ = vtkImageMapper.newInstance();
  imageMapperJ.setInputData(vtkImage);
  imageMapperJ.setJSlice(30);
  imageActorJ.setMapper(imageMapperJ);

  const imageMapperI = vtkImageMapper.newInstance();
  imageMapperI.setInputData(vtkImage);
  imageMapperI.setISlice(30);
  imageActorI.setMapper(imageMapperI);

  renderer.resetCamera();
  renderer.resetCameraClippingRange();
  //renderWindow.render();




  ['.sliceI', '.sliceJ', '.sliceK'].forEach((selector, idx) => {
    const el = document.querySelector(selector);
    el.setAttribute('min', extent[idx * 2 + 0]);
    el.setAttribute('max', extent[idx * 2 + 1]);
    el.setAttribute('value', 30);
  });






  imageActorI.getProperty().setColorLevel((dataRange[0] + dataRange[1]) / 2);
  imageActorJ.getProperty().setColorLevel((dataRange[0] + dataRange[1]) / 2);
  imageActorK.getProperty().setColorLevel((dataRange[0] + dataRange[1]) / 2);
  //renderWindow.render();
  imageActorI.getProperty().setColorWindow(dataRange[1]);
  imageActorJ.getProperty().setColorWindow(dataRange[1]);
  imageActorK.getProperty().setColorWindow(dataRange[1]);
  //renderWindow.render();
  element_loaded++;
  data=1;
checkStatus();
}
update();

// // // After the itk-wasm UMD script has been loaded, `window.itk` provides the itk-wasm API.
vtkResourceLoader
  .loadScript(
    'https://cdn.jsdelivr.net/npm/itk-wasm@1.0.0-b.8/dist/umd/itk-wasm.js'
  )
  .then(update);


  
 if (link_fibers !== null){
	 //uncer=1;
const reader = vtkXMLPolyDataReader.newInstance();
//reader.setUrl(`https://faizansiddiqui91.github.io/Data/fibers.vtk`).then(() => {
reader.setUrl(link_fibers.innerHTML).then(() => {
  const polydata = reader.getOutputData(0);
  actor1.getProperty().setColor(215.0 / 255.0, 48.0 / 255.0, 39.0 / 255.0);
  //actor1.getProperty().renderLinesAsTubesOn();
  actor1.modified();


  //actor1.setMapper(mapper1);
  mapper1.setInputData(polydata);
  mapper1.update();
  renderer.addActor(actor1);

  renderer.resetCamera();
  //renderer.resetCameraClippingRange();
  //renderWindow.render();
  element_loaded++;
checkStatus();
});
 }

let uncer_100=0;
  if (link_fiber_samples !== null){
	  
const reader_samples_100 = vtkXMLPolyDataReader.newInstance();
//reader.setUrl(`https://faizansiddiqui91.github.io/Data/fibers.vtk`).then(() => {
	
reader_samples_100.setUrl(link_fiber_samples.innerHTML).then(() => {
  const polydata_samples_100 = reader_samples_100.getOutputData(0);
 
  actor_samples_100.getProperty().setColor(253.0 / 255.0, 174.0 / 255.0, 97.0 / 255.0);
  actor_samples_100.getProperty().setLineWidth(3);
  actor_samples_100.getProperty().setOpacity(0.2);

  mapper_samples_100.setInputData(polydata_samples_100);

  renderer.addActor(actor_samples_100);

  renderer.resetCamera();
  //renderer.resetCameraClippingRange();
  //renderWindow.render();
  element_loaded++;
  uncer=1;
  uncer_100=1;
checkStatus();
});


}


if (link_fiber_samples_25 !== null){
	
 const reader_samples_25 = vtkXMLPolyDataReader.newInstance({ fetchGzip: true });
reader_samples_25.setUrl(link_fiber_samples_25.innerHTML ).then(() => {
	
	
  reader_samples_25.loadData().then(() => {
	  
  const polydata_samples_25 = reader_samples_25.getOutputData(0);

  actor_samples_25.getProperty().setColor(253.0 / 255.0, 174.0 / 255.0, 97.0 / 255.0);
  actor_samples_25.getProperty().setLineWidth(3);
  actor_samples_25.getProperty().setOpacity(0.2);
  //actor1_2.setMapper(mapper1_2);
  mapper_samples_25.setInputData(polydata_samples_25);

  renderer.addActor(actor_samples_25);

  renderer.resetCamera();
  //renderer.resetCameraClippingRange();
  //renderWindow.render();
  element_loaded++;
  uncer=1;
checkStatus();
});
})}

if (link_fiber_samples_75 !== null){
	
const reader_samples_75 = vtkXMLPolyDataReader.newInstance();

//reader.setUrl(`https://faizansiddiqui91.github.io/Data/fibers.vtk`).then(() => {
reader_samples_75.setUrl(link_fiber_samples_75.innerHTML).then(() => {
  const polydata_samples_75 = reader_samples_75.getOutputData(0);
  actor_samples_75.getProperty().setColor(253.0 / 255.0, 174.0 / 255.0, 97.0 / 255.0);
  actor_samples_75.getProperty().setLineWidth(3);
  actor_samples_75.getProperty().setOpacity(0.2);
  //actor1_2.setMapper(mapper1_2);
  mapper_samples_75.setInputData(polydata_samples_75);

  renderer.addActor(actor_samples_75);

  // renderer.resetCamera();
  //renderer.resetCameraClippingRange();
  //renderWindow.render();
  element_loaded++;
  uncer=1;
checkStatus();
});
}



let det=0;
if (link_deterministic !== null){
	 
const reader1_3 = vtkXMLPolyDataReader.newInstance();
//reader.setUrl(`https://faizansiddiqui91.github.io/Data/fibers.vtk`).then(() => {
reader1_3.setUrl(link_deterministic.innerHTML).then(() => {
	
			
		
  const polydata1_3 = reader1_3.getOutputData(0);

  actor1_3.getProperty().setColor(25.0 / 255.0, 180.0 / 255.0, 25.0 / 255.0);

  actor1_3.modified();
  actor1_3.getProperty().setOpacity(0);
  
  if (document.getElementById('range_single').checked) {
    actor1_3.getProperty().setOpacity(1);
  }

  mapper1_3.setInputData(polydata1_3);
  mapper1_3.update();
  renderer.addActor(actor1_3);
  renderer.resetCamera();
  //renderWindow.render();
  element_loaded++;
  det=1;
checkStatus();
});
}


if (link_tumor !== null){
const reader2 = vtkPolyDataReader.newInstance();
reader2.setUrl(link_tumor.innerHTML).then(() => {
  const polydata2 = reader2.getOutputData(0);
  //const mapper2 = vtkMapper.newInstance();
  //const actor2 = vtkActor.newInstance();

  //actor2.setMapper(mapper2);
  mapper2.setInputData(polydata2);

  renderer.addActor(actor2);

  renderer.resetCamera();
  //renderer.resetCameraClippingRange();
  //renderWindow.render();
  element_loaded++;
  checkStatus();
});
}






document.querySelector('.sliceI').addEventListener('input', (e) => {
  imageActorI.getMapper().setISlice(Number(e.target.value));
  renderWindow.render();
});

document.querySelector('.sliceJ').addEventListener('input', (e) => {
  imageActorJ.getMapper().setJSlice(Number(e.target.value));
  renderWindow.render();
});

document.querySelector('.sliceK').addEventListener('input', (e) => {
  imageActorK.getMapper().setKSlice(Number(e.target.value));
  renderWindow.render();
});




const tumor = document.getElementById("tumor_check");

if (tumor !== null){

tumor.addEventListener('change', function(event) {
  if (event.target.checked) {
    actor2.getProperty().setOpacity(1);
    renderWindow.render();
  } else {
    actor2.getProperty().setOpacity(0);
    renderWindow.render();
  }
});
}

const range_25=document.getElementById("range_25");
if (range_25 !== null){
range_25.addEventListener('click', function(event) {
  if (event.target && event.target.matches("input[type='radio']")) {

    actor_samples_25.getProperty().setOpacity(0.2);
    actor_samples_75.getProperty().setOpacity(0);
    actor_samples_100.getProperty().setOpacity(0);
    actor1_3.getProperty().setOpacity(0);
    actor1.getProperty().setOpacity(1);

    renderWindow.render();

  }
});
}

const range_75 = document.getElementById("range_75");
if (range_75 !== null){
range_75.addEventListener('click', function(event) {
  if (event.target && event.target.matches("input[type='radio']")) {

    actor_samples_25.getProperty().setOpacity(0);
    actor_samples_75.getProperty().setOpacity(0.2);
    actor_samples_100.getProperty().setOpacity(0);
    actor1_3.getProperty().setOpacity(0);
    actor1.getProperty().setOpacity(1);

    renderWindow.render();

  }
});
}


const range_100=document.getElementById("range_100");
if (range_100 !== null){
range_100.addEventListener('click', function(event) {
  if (event.target && event.target.matches("input[type='radio']")) {
    actor_samples_25.getProperty().setOpacity(0);
    actor_samples_75.getProperty().setOpacity(0);
    actor_samples_100.getProperty().setOpacity(0.2);
    actor1_3.getProperty().setOpacity(0);
    actor1.getProperty().setOpacity(1);

    renderWindow.render();

  }
});
}

const range_single = document.getElementById("range_single");
if (range_single !== null){
range_single.addEventListener('click', function(event) {
  if (event.target && event.target.matches("input[type='radio']")) {

    actor_samples_25.getProperty().setOpacity(0);
    actor_samples_75.getProperty().setOpacity(0);
    actor_samples_100.getProperty().setOpacity(0.0);
    actor1_3.getProperty().setOpacity(1);
    actor1.getProperty().setOpacity(0);
    renderWindow.render();

  }
});
}

const range_representative = document.getElementById("range_representative");
if (range_representative !== null){
range_representative.addEventListener('click', function(event) {
  if (event.target && event.target.matches("input[type='radio']")) {

    actor_samples_25.getProperty().setOpacity(0);
    actor_samples_75.getProperty().setOpacity(0);
    actor_samples_100.getProperty().setOpacity(0.0);
    actor1_3.getProperty().setOpacity(0);
    actor1.getProperty().setOpacity(1);
    renderWindow.render();

  }
});
}

// const progressContainer = document.createElement('div');
    // progressContainer.setAttribute('class', style.progress);
    // container.appendChild(progressContainer);
	

function checkStatus(){
if (det ==0 && uncer==1 && tr==0 && data==1)
  { load.remove();
	load_text.remove();
	load_text_bottom.remove();
	renderWindow.render(); 
	interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());	
  }
  if (det ==1 && uncer==0 && tr==0 && data==1)
   { 
    load.remove();
	load_text.remove();
	load_text_bottom.remove();
	
	renderWindow.render(); 
	interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());	
  }
  
    if (tr==1 && uncer_100==1 && data==1)
    { 
     load.remove();
	 load_text.remove();
	 load_text_bottom.remove();
	 renderWindow.render(); 
	 interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());	
   }
  
  

}

var txt = document.getElementById('case_text');
 if (txt !== null){
			var randomlinks = JSON.parse(sessionStorage.getItem("randomlinks"));
			const number = 8-randomlinks.length;
			txt.innerHTML = 'Case '+ number+' out of 8';

 }

								
							let elements = document.querySelectorAll('.form-control');
							
							elements.forEach((item) => {
							item.addEventListener("keydown", (event) => {
							var regex = /^[A-Za-z]+$/;
							var isValid = regex.test(String.fromCharCode(event.keyCode));
							if (isValid){
							 event.preventDefault(); 
							 item.value += event.key;
							}
							 return ;							   
								});															
							});
							
								
						
						
						