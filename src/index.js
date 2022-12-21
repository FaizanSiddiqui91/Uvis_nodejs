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
import vtkPolyDataReader from '@kitware/vtk.js/IO/Legacy/PolyDataReader'



// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------


 // const button = document.getElementById('myButton');
 // button.addEventListener('click', function(e) {
	// alert ('check')
 //});
 
  // const trigger = document.getElementById('trigger');
   // trigger.addEventListener('load', function(e) {
	  //alert ('checffk')
//const button = document.getElementById('myButton1');
 //button.addEventListener('click', function(e) {
  
 
   const cases = document.getElementById('case');
   

const link_fiber_samples = document.getElementById('link_fiber_samples');
 const link_fibers = document.getElementById('link_fibers');
 const link_deterministic = document.getElementById('link_deterministic');
 const link_tumor = document.getElementById('link_tumor');
 const link_data = document.getElementById('link_data')
 const link_fiber_samples_25 = document.getElementById('link_fiber_samples_25');
 const link_fiber_samples_75 = document.getElementById('link_fiber_samples_75');
	

  
  const back=[0.2,0.3,0.4]


 
const renderWindow = vtkRenderWindow.newInstance();
const renderer = vtkRenderer.newInstance({ background: back });
renderWindow.addRenderer(renderer);



const openglRenderWindow = vtkOpenGLRenderWindow.newInstance();
renderWindow.addView(openglRenderWindow);

// ----------------------------------------------------------------------------
// Create a div section to put this into
// ----------------------------------------------------------------------------

const container = document.createElement('div');
//container.style.zIndex = "5";
container.style.width = "800px";
container.style.position = "relative";
//container.style.paddingLeft = "350px";
container.style.left="25%"
//container.style.right="50%" 
document.querySelector('body').appendChild(container);
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






 // show_graph({{ chart_type }}, {{ data }}, {{ options }});
 
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
      renderWindow.render();	
	  

	   
   
	   ['.sliceI', '.sliceJ', '.sliceK'].forEach((selector, idx) => {
         const el = document.querySelector(selector);
         el.setAttribute('min', extent[idx * 2 + 0]);
         el.setAttribute('max', extent[idx * 2 + 1]);
         el.setAttribute('value', 30);
       });
	   

	



  imageActorI.getProperty().setColorLevel((dataRange[0] + dataRange[1]) / 2);
  imageActorJ.getProperty().setColorLevel((dataRange[0] + dataRange[1]) / 2);
  imageActorK.getProperty().setColorLevel((dataRange[0] + dataRange[1]) / 2);
  renderWindow.render();
  imageActorI.getProperty().setColorWindow(dataRange[1]);
  imageActorJ.getProperty().setColorWindow(dataRange[1]);
  imageActorK.getProperty().setColorWindow(dataRange[1]);
  renderWindow.render(); 
      

  }
  
  
  
  
  update();

// // // After the itk-wasm UMD script has been loaded, `window.itk` provides the itk-wasm API.
  vtkResourceLoader
    .loadScript(
      'https://cdn.jsdelivr.net/npm/itk-wasm@1.0.0-b.8/dist/umd/itk-wasm.js'
    )
    .then(update);



  const reader = vtkPolyDataReader.newInstance();
  //reader.setUrl(`https://faizansiddiqui91.github.io/Data/fibers.vtk`).then(() => {
  reader.setUrl(link_fibers.innerHTML).then(() => {
  const polydata = reader.getOutputData(0);
  actor1.getProperty().setColor(215.0/255.0, 48.0/255.0, 39.0/255.0);
  //actor1.getProperty().renderLinesAsTubesOn();
  actor1.modified();
 
  
  //actor1.setMapper(mapper1);
  mapper1.setInputData(polydata);
  mapper1.update();
  renderer.addActor(actor1);

  renderer.resetCamera();
   //renderer.resetCameraClippingRange();
   renderWindow.render();	
});

const reader_samples_100 = vtkPolyDataReader.newInstance();
//reader.setUrl(`https://faizansiddiqui91.github.io/Data/fibers.vtk`).then(() => {
	reader_samples_100.setUrl(link_fiber_samples.innerHTML).then(() => {
	const polydata_samples_100 = reader_samples_100.getOutputData(0);
	actor_samples_100.getProperty().setColor(253.0/255.0, 174.0/255.0, 97.0/255.0);
	actor_samples_100.getProperty().setLineWidth(3);
	actor_samples_100.getProperty().setOpacity(0.2);
	
	mapper_samples_100.setInputData(polydata_samples_100);

	renderer.addActor(actor_samples_100);

	renderer.resetCamera();
	//renderer.resetCameraClippingRange();
	renderWindow.render();	
});


const reader_samples_25 = vtkPolyDataReader.newInstance();
//reader.setUrl(`https://faizansiddiqui91.github.io/Data/fibers.vtk`).then(() => {
	reader_samples_25.setUrl(link_fiber_samples_25.innerHTML).then(() => {
	const polydata_samples_25 = reader_samples_25.getOutputData(0);
	actor_samples_25.getProperty().setColor(253.0/255.0, 174.0/255.0, 97.0/255.0);
	actor_samples_25.getProperty().setLineWidth(3);
	actor_samples_25.getProperty().setOpacity(0.2);
	//actor1_2.setMapper(mapper1_2);
	mapper_samples_25.setInputData(polydata_samples_25);

	renderer.addActor(actor_samples_25);

	renderer.resetCamera();
	//renderer.resetCameraClippingRange();
	renderWindow.render();	
});

const reader_samples_75 = vtkPolyDataReader.newInstance();
//reader.setUrl(`https://faizansiddiqui91.github.io/Data/fibers.vtk`).then(() => {
	reader_samples_75.setUrl(link_fiber_samples_75.innerHTML).then(() => {
	const polydata_samples_75 = reader_samples_75.getOutputData(0);
	actor_samples_75.getProperty().setColor(253.0/255.0, 174.0/255.0, 97.0/255.0);
	actor_samples_75.getProperty().setLineWidth(3);
	actor_samples_75.getProperty().setOpacity(0.2);
	//actor1_2.setMapper(mapper1_2);
	mapper_samples_75.setInputData(polydata_samples_75);

	renderer.addActor(actor_samples_75);

	renderer.resetCamera();
	//renderer.resetCameraClippingRange();
	renderWindow.render();	
});






	const reader1_3 = vtkPolyDataReader.newInstance();
	//reader.setUrl(`https://faizansiddiqui91.github.io/Data/fibers.vtk`).then(() => {
	reader.setUrl(link_deterministic.innerHTML).then(() => {
	const polydata1_3 = reader.getOutputData(0);
  
	actor1_3.getProperty().setColor(25.0/255.0, 180.0/255.0, 25.0/255.0);
  
	actor1_3.modified();
 
  
  actor1_3.getProperty().setOpacity(0);
	mapper1_3.setInputData(polydata1_3);
	mapper1_3.update();
	renderer.addActor(actor1_3);
	renderer.resetCamera();
	renderWindow.render();	
});



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
   renderWindow.render();	
});





const { width, height } = container.getBoundingClientRect();
openglRenderWindow.setSize(width, height);


const interactor = vtkRenderWindowInteractor.newInstance();
interactor.setView(openglRenderWindow);
interactor.initialize();
interactor.bindEvents(container);

// ----------------------------------------------------------------------------
// Setup interactor style to use
// ----------------------------------------------------------------------------

interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());


	
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
   
     document.getElementById("withTumor").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {
        
		
		 actor2.getProperty().setOpacity(1);
		renderWindow.render();
		
    }
});

   document.getElementById("withoutTumor").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {
        
	
		 actor2.getProperty().setOpacity(0);
		renderWindow.render();
		
    }
}); 
   
   document.getElementById("without").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {
		
		
        //imageActorK.getMapper().setKSlice(Number(30));
		actor1.getProperty().setOpacity(1);
		actor_samples_25.getProperty().setOpacity(0);
		actor_samples_75.getProperty().setOpacity(0);
		actor_samples_100.getProperty().setOpacity(0);
		renderWindow.render();
		
    }
});

   document.getElementById("with").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {
        
		actor1.getProperty().setOpacity(1);
		actor_samples_25.getProperty().setOpacity(0.2);
		actor_samples_75.getProperty().setOpacity(0.2);
		actor_samples_100.getProperty().setOpacity(0.2);
		renderWindow.render();
		
    }
});

   document.getElementById("range_25").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {
        
		actor_samples_25.getProperty().setOpacity(0.2);
		actor_samples_75.getProperty().setOpacity(0);
		actor_samples_100.getProperty().setOpacity(0);
		actor1_3.getProperty().setOpacity(0);
		actor1.getProperty().setOpacity(1);
		
		renderWindow.render();
		
    }
});

   document.getElementById("range_75").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {
        
		actor_samples_25.getProperty().setOpacity(0);
		actor_samples_75.getProperty().setOpacity(0.2);
		actor_samples_100.getProperty().setOpacity(0);
		actor1_3.getProperty().setOpacity(0);
		actor1.getProperty().setOpacity(1);
		
		renderWindow.render();
		
    }
});

   document.getElementById("range_100").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {
        
		actor_samples_25.getProperty().setOpacity(0);
		actor_samples_75.getProperty().setOpacity(0);
		actor_samples_100.getProperty().setOpacity(0.2);
		actor1_3.getProperty().setOpacity(0);
		actor1.getProperty().setOpacity(1);
		
		renderWindow.render();
		
    }
});


   document.getElementById("range_single").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {
        
		actor_samples_25.getProperty().setOpacity(0);
		actor_samples_75.getProperty().setOpacity(0);
		actor_samples_100.getProperty().setOpacity(0.0);
		actor1_3.getProperty().setOpacity(1);
		actor1.getProperty().setOpacity(0);
		renderWindow.render();
		
    }
});


   document.getElementById("range_representative").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {
        
		actor_samples_25.getProperty().setOpacity(0);
		actor_samples_75.getProperty().setOpacity(0);
		actor_samples_100.getProperty().setOpacity(0.0);
		actor1_3.getProperty().setOpacity(0);
		actor1.getProperty().setOpacity(1);
		renderWindow.render();
		
    }
});







 