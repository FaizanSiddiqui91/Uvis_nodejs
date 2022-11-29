import '@kitware/vtk.js/favicon';
//import './index2.js';


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
   
   // if (cases.innerHTML= 'case1')
   // {
	   // alert ("case 1");
   // }
  // if (cases.innerHTML= 'case2')
   // {
	   // alert ("case 2");
   // }
  //if (cases.innerHTML= 'case1')
   // {
	   
	    // const link_fibers = 'test';
 // const link_tumor = 'test';
 // const link_data = 'test';
 
 // if (cases.innerHTML= 'case1')
    // {
 const link_fibers = document.getElementById('link_fibers');
 const link_tumor = document.getElementById('link_tumor');
 const link_data = document.getElementById('link_data');
	// }
	 // if (cases.innerHTML= 'case2')
    // {
 // const link_fibers = document.getElementById('link_fibers');
 // const link_tumor = document.getElementById('link_tumor');
 // const link_data = document.getElementById('link_data');
	// }
	 // if (cases.innerHTML= 'case3')
    // {
 // const link_fibers = document.getElementById('link_fibers');
 // const link_tumor = document.getElementById('link_tumor');
 // const link_data = document.getElementById('link_data');
	// }
  // }
  
  const back=[0.2,0.3,0.4]
 // if (cases.innerHTML= 'case3')
	
	 // {
		 // back[2]=[0.8]
		// alert (cases.innerHTML)
	 // }

 
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
container.style.width = "500px";
container.style.paddingLeft = "400px";
document.querySelector('body').appendChild(container);
openglRenderWindow.setContainer(container);






const imageActorI = vtkImageSlice.newInstance();
const imageActorJ = vtkImageSlice.newInstance();
const imageActorK = vtkImageSlice.newInstance();

renderer.addActor(imageActorK);
renderer.addActor(imageActorJ);
renderer.addActor(imageActorI);


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
	  
	   // if (cases.innerHTML= 'case1')
   // {
	   
   
	   ['.sliceI', '.sliceJ', '.sliceK'].forEach((selector, idx) => {
         const el = document.querySelector(selector);
         el.setAttribute('min', extent[idx * 2 + 0]);
         el.setAttribute('max', extent[idx * 2 + 1]);
         el.setAttribute('value', 30);
       });
	   
   // }
      // if (cases.innerHTML= 'case2')
   // {
	   	   // ['.sliceI2', '.sliceJ2', '.sliceK2'].forEach((selector, idx) => {
         // const el = document.querySelector(selector);
         // el.setAttribute('min', extent[idx * 2 + 0]);
         // el.setAttribute('max', extent[idx * 2 + 1]);
         // el.setAttribute('value', 30);
       // });
   // }
   // if (cases.innerHTML= 'case3')
   // {
	    // ['.sliceI3', '.sliceJ3', '.sliceK3'].forEach((selector, idx) => {
         // const el = document.querySelector(selector);
         // el.setAttribute('min', extent[idx * 2 + 0]);
         // el.setAttribute('max', extent[idx * 2 + 1]);
         // el.setAttribute('value', 30);
       // });
   // }
	



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



 //test_text = myTab.item(1).innerHTML;
//alert(myTab.innerHTML);  


const reader = vtkPolyDataReader.newInstance();
//reader.setUrl(`https://faizansiddiqui91.github.io/Data/fibers.vtk`).then(() => {
	reader.setUrl(link_fibers.innerHTML).then(() => {
  const polydata = reader.getOutputData(0);
  const mapper1 = vtkMapper.newInstance();
  const actor1 = vtkActor.newInstance();

  actor1.setMapper(mapper1);
  mapper1.setInputData(polydata);

  renderer.addActor(actor1);

  renderer.resetCamera();
   //renderer.resetCameraClippingRange();
   renderWindow.render();	
});


const reader2 = vtkPolyDataReader.newInstance();
reader2.setUrl(link_tumor.innerHTML).then(() => {
  const polydata2 = reader2.getOutputData(0);
  const mapper2 = vtkMapper.newInstance();
  const actor2 = vtkActor.newInstance();

  actor2.setMapper(mapper2);
  mapper2.setInputData(polydata2);

  renderer.addActor(actor2);

  renderer.resetCamera();
   //renderer.resetCameraClippingRange();
   renderWindow.render();	
});


// const container = document.createElement('div');
// //container.style.zIndex = "5";
// container.style.width = "500px";
// container.style.paddingLeft = "800px";
// document.querySelector('body').appendChild(container);
// openglRenderWindow.setContainer(container);


 // const container = document.createElement('div');
 // container.style.width = "500px";
 // container.style.paddingLeft = "800px";
 // document.querySelector('body').appendChild(container);
 // openglRenderWindow.setContainer(container);


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
   
   
   


 // });
 
 
 
 
 // const trigger2 = document.getElementById('trigger2');
  // trigger2.addEventListener('load', function(e) {
	  // //alert ('checffk')

 
 
   // const cases = document.getElementById('case');
   

 // const link_fibers = document.getElementById('link_fibers');
 // const link_tumor = document.getElementById('link_tumor');
 // const link_data = document.getElementById('link_data');

  
  // const back=[0.2,0.3,0.4]


 
// const renderWindow = vtkRenderWindow.newInstance();
// const renderer = vtkRenderer.newInstance({ background: back });
// renderWindow.addRenderer(renderer);



// const openglRenderWindow = vtkOpenGLRenderWindow.newInstance();
// renderWindow.addView(openglRenderWindow);

// // ----------------------------------------------------------------------------
// // Create a div section to put this into
// // ----------------------------------------------------------------------------


// const container = document.createElement('div');
// //container.style.zIndex = "5";
// container.style.width = "500px";
// container.style.paddingLeft = "800px";
// document.querySelector('body').appendChild(container);
// openglRenderWindow.setContainer(container);





// const imageActorI = vtkImageSlice.newInstance();
// const imageActorJ = vtkImageSlice.newInstance();
// const imageActorK = vtkImageSlice.newInstance();

// renderer.addActor(imageActorK);
// renderer.addActor(imageActorJ);
// renderer.addActor(imageActorI);


// const actor = vtkVolume.newInstance();
// const mapper = vtkVolumeMapper.newInstance();
// mapper.setSampleDistance(0.7);
// actor.setMapper(mapper);
// // ----------------------------------------------------------------------------
// // Simple pipeline ConeSource --> Mapper --> Actor
// // ----------------------------------------------------------------------------






 // // show_graph({{ chart_type }}, {{ data }}, {{ options }});
 
  // async function update() {
    // const volumeArrayBuffer = await vtkLiteHttpDataAccessHelper.fetchBinary(
     // link_data.innerHTML	


    // );
  


    // const { image: itkImage, webWorker } = await window.itk.readImageArrayBuffer(
      // null,
      // volumeArrayBuffer,
	  // 'T1_mha_tumor.mha'
    // );
    // webWorker.terminate();

    // const vtkImage = vtkITKHelper.convertItkToVtkImage(itkImage);
	// const dataRange = vtkImage.getPointData().getScalars().getRange();
    // const extent = vtkImage.getExtent();


	
	
	   // const imageMapperK = vtkImageMapper.newInstance();
       // imageMapperK.setInputData(vtkImage);
       // imageMapperK.setKSlice(30);
       // imageActorK.setMapper(imageMapperK);

       // const imageMapperJ = vtkImageMapper.newInstance();
       // imageMapperJ.setInputData(vtkImage);
       // imageMapperJ.setJSlice(30);
       // imageActorJ.setMapper(imageMapperJ);

       // const imageMapperI = vtkImageMapper.newInstance();
       // imageMapperI.setInputData(vtkImage);
       // imageMapperI.setISlice(30);
       // imageActorI.setMapper(imageMapperI);
	  
	  // renderer.resetCamera();
      // renderer.resetCameraClippingRange();
      // renderWindow.render();	
	  
	   // if (cases.innerHTML= 'case1')
   // {
	   
   
	   // ['.sliceI', '.sliceJ', '.sliceK'].forEach((selector, idx) => {
         // const el = document.querySelector(selector);
         // el.setAttribute('min', extent[idx * 2 + 0]);
         // el.setAttribute('max', extent[idx * 2 + 1]);
         // el.setAttribute('value', 30);
       // });
	   
   // }
      // if (cases.innerHTML= 'case2')
   // {
	   	   // ['.sliceI2', '.sliceJ2', '.sliceK2'].forEach((selector, idx) => {
         // const el = document.querySelector(selector);
         // el.setAttribute('min', extent[idx * 2 + 0]);
         // el.setAttribute('max', extent[idx * 2 + 1]);
         // el.setAttribute('value', 30);
       // });
   // }
   // if (cases.innerHTML= 'case3')
   // {
	    // ['.sliceI3', '.sliceJ3', '.sliceK3'].forEach((selector, idx) => {
         // const el = document.querySelector(selector);
         // el.setAttribute('min', extent[idx * 2 + 0]);
         // el.setAttribute('max', extent[idx * 2 + 1]);
         // el.setAttribute('value', 30);
       // });
   // }
	



		   // imageActorI.getProperty().setColorLevel((dataRange[0] + dataRange[1]) / 2);
  // imageActorJ.getProperty().setColorLevel((dataRange[0] + dataRange[1]) / 2);
  // imageActorK.getProperty().setColorLevel((dataRange[0] + dataRange[1]) / 2);
  // renderWindow.render();
    // imageActorI.getProperty().setColorWindow(dataRange[1]);
  // imageActorJ.getProperty().setColorWindow(dataRange[1]);
  // imageActorK.getProperty().setColorWindow(dataRange[1]);
		 
      

  // }
  
  
  
  
  // update();

// // // // After the itk-wasm UMD script has been loaded, `window.itk` provides the itk-wasm API.
  // vtkResourceLoader
    // .loadScript(
      // 'https://cdn.jsdelivr.net/npm/itk-wasm@1.0.0-b.8/dist/umd/itk-wasm.js'
    // )
    // .then(update);



 // //test_text = myTab.item(1).innerHTML;
// //alert(myTab.innerHTML);  


// const reader = vtkPolyDataReader.newInstance();
// //reader.setUrl(`https://faizansiddiqui91.github.io/Data/fibers.vtk`).then(() => {
	// reader.setUrl(link_fibers.innerHTML).then(() => {
  // const polydata = reader.getOutputData(0);
  // const mapper1 = vtkMapper.newInstance();
  // const actor1 = vtkActor.newInstance();

  // actor1.setMapper(mapper1);
  // mapper1.setInputData(polydata);

  // renderer.addActor(actor1);

  // renderer.resetCamera();
   // //renderer.resetCameraClippingRange();
   // renderWindow.render();	
// });


// const reader2 = vtkPolyDataReader.newInstance();
// reader2.setUrl(link_tumor.innerHTML).then(() => {
  // const polydata2 = reader2.getOutputData(0);
  // const mapper2 = vtkMapper.newInstance();
  // const actor2 = vtkActor.newInstance();

  // actor2.setMapper(mapper2);
  // mapper2.setInputData(polydata2);

  // renderer.addActor(actor2);

  // renderer.resetCamera();
   // //renderer.resetCameraClippingRange();
   // renderWindow.render();	
// });


// const { width, height } = container.getBoundingClientRect();
// openglRenderWindow.setSize(width, height);


// const interactor = vtkRenderWindowInteractor.newInstance();
// interactor.setView(openglRenderWindow);
// interactor.initialize();
// interactor.bindEvents(container);

// // ----------------------------------------------------------------------------
// // Setup interactor style to use
// // ----------------------------------------------------------------------------

// interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());


 
// document.querySelector('.sliceI2').addEventListener('input', (e) => {
 // imageActorI.getMapper().setISlice(Number(e.target.value));
 // renderWindow.render();
// });		 

// document.querySelector('.sliceJ2').addEventListener('input', (e) => {
  // imageActorJ.getMapper().setJSlice(Number(e.target.value));
  // renderWindow.render();
// });

// document.querySelector('.sliceK2').addEventListener('input', (e) => {
  // imageActorK.getMapper().setKSlice(Number(e.target.value));
  // renderWindow.render();
// });

  


 // });
 
 
 
 // const trigger3 = document.getElementById('trigger3');
  // trigger3.addEventListener('load', function(e) {
	  // //alert ('checffk')
// alert('hey')
  
 
   // const cases = document.getElementById('case');
   

 // const link_fibers = document.getElementById('link_fibers');
 // const link_tumor = document.getElementById('link_tumor');
 // const link_data = document.getElementById('link_data');

  
  // const back=[0.8,0.3,0.4]


 
// const renderWindow = vtkRenderWindow.newInstance();
// const renderer = vtkRenderer.newInstance({ background: back });
// renderWindow.addRenderer(renderer);



// const openglRenderWindow = vtkOpenGLRenderWindow.newInstance();
// renderWindow.addView(openglRenderWindow);

// // ----------------------------------------------------------------------------
// // Create a div section to put this into
// // ----------------------------------------------------------------------------


// const container = document.createElement('div');
// //container.style.zIndex = "5";
// container.style.width = "500px";
// container.style.paddingLeft = "800px";
// document.querySelector('body').appendChild(container);
// openglRenderWindow.setContainer(container);





// const imageActorI = vtkImageSlice.newInstance();
// const imageActorJ = vtkImageSlice.newInstance();
// const imageActorK = vtkImageSlice.newInstance();

// renderer.addActor(imageActorK);
// renderer.addActor(imageActorJ);
// renderer.addActor(imageActorI);


// const actor = vtkVolume.newInstance();
// const mapper = vtkVolumeMapper.newInstance();
// mapper.setSampleDistance(0.7);
// actor.setMapper(mapper);
// // ----------------------------------------------------------------------------
// // Simple pipeline ConeSource --> Mapper --> Actor
// // ----------------------------------------------------------------------------






 // // show_graph({{ chart_type }}, {{ data }}, {{ options }});
 
  // async function update() {
    // const volumeArrayBuffer = await vtkLiteHttpDataAccessHelper.fetchBinary(
     // link_data.innerHTML	


    // );
  


    // const { image: itkImage, webWorker } = await window.itk.readImageArrayBuffer(
      // null,
      // volumeArrayBuffer,
	  // 'T1_mha_tumor.mha'
    // );
    // webWorker.terminate();

    // const vtkImage = vtkITKHelper.convertItkToVtkImage(itkImage);
	// const dataRange = vtkImage.getPointData().getScalars().getRange();
    // const extent = vtkImage.getExtent();


	
	
	   // const imageMapperK = vtkImageMapper.newInstance();
       // imageMapperK.setInputData(vtkImage);
       // imageMapperK.setKSlice(30);
       // imageActorK.setMapper(imageMapperK);

       // const imageMapperJ = vtkImageMapper.newInstance();
       // imageMapperJ.setInputData(vtkImage);
       // imageMapperJ.setJSlice(30);
       // imageActorJ.setMapper(imageMapperJ);

       // const imageMapperI = vtkImageMapper.newInstance();
       // imageMapperI.setInputData(vtkImage);
       // imageMapperI.setISlice(30);
       // imageActorI.setMapper(imageMapperI);
	  
	  // renderer.resetCamera();
      // renderer.resetCameraClippingRange();
      // renderWindow.render();	
	  


   
   
	    // ['.sliceI3', '.sliceJ3', '.sliceK3'].forEach((selector, idx) => {
         // const el = document.querySelector(selector);
         // el.setAttribute('min', extent[idx * 2 + 0]);
         // el.setAttribute('max', extent[idx * 2 + 1]);
         // el.setAttribute('value', 30);
       // });
   
	



		   // imageActorI.getProperty().setColorLevel((dataRange[0] + dataRange[1]) / 2);
  // imageActorJ.getProperty().setColorLevel((dataRange[0] + dataRange[1]) / 2);
  // imageActorK.getProperty().setColorLevel((dataRange[0] + dataRange[1]) / 2);
  // renderWindow.render();
    // imageActorI.getProperty().setColorWindow(dataRange[1]);
  // imageActorJ.getProperty().setColorWindow(dataRange[1]);
  // imageActorK.getProperty().setColorWindow(dataRange[1]);
		 
      

  // }
  
  
  
  
  // update();

// // // // After the itk-wasm UMD script has been loaded, `window.itk` provides the itk-wasm API.
  // vtkResourceLoader
    // .loadScript(
      // 'https://cdn.jsdelivr.net/npm/itk-wasm@1.0.0-b.8/dist/umd/itk-wasm.js'
    // )
    // .then(update);



 // //test_text = myTab.item(1).innerHTML;
// //alert(myTab.innerHTML);  


// const reader = vtkPolyDataReader.newInstance();
// //reader.setUrl(`https://faizansiddiqui91.github.io/Data/fibers.vtk`).then(() => {
	// reader.setUrl(link_fibers.innerHTML).then(() => {
  // const polydata = reader.getOutputData(0);
  // const mapper1 = vtkMapper.newInstance();
  // const actor1 = vtkActor.newInstance();

  // actor1.setMapper(mapper1);
  // mapper1.setInputData(polydata);

  // renderer.addActor(actor1);

  // renderer.resetCamera();
   // //renderer.resetCameraClippingRange();
   // renderWindow.render();	
// });


// const reader2 = vtkPolyDataReader.newInstance();
// reader2.setUrl(link_tumor.innerHTML).then(() => {
  // const polydata2 = reader2.getOutputData(0);
  // const mapper2 = vtkMapper.newInstance();
  // const actor2 = vtkActor.newInstance();

  // actor2.setMapper(mapper2);
  // mapper2.setInputData(polydata2);

  // renderer.addActor(actor2);

  // renderer.resetCamera();
   // //renderer.resetCameraClippingRange();
   // renderWindow.render();	
// });


// const { width, height } = container.getBoundingClientRect();
// openglRenderWindow.setSize(width, height);


// const interactor = vtkRenderWindowInteractor.newInstance();
// interactor.setView(openglRenderWindow);
// interactor.initialize();
// interactor.bindEvents(container);

// // ----------------------------------------------------------------------------
// // Setup interactor style to use
// // ----------------------------------------------------------------------------

// interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());


 
// document.querySelector('.sliceI3').addEventListener('input', (e) => {
 // imageActorI.getMapper().setISlice(Number(e.target.value));
 // renderWindow.render();
// });		 

// document.querySelector('.sliceJ3').addEventListener('input', (e) => {
  // imageActorJ.getMapper().setJSlice(Number(e.target.value));
  // renderWindow.render();
// });

// document.querySelector('.sliceK3').addEventListener('input', (e) => {
  // imageActorK.getMapper().setKSlice(Number(e.target.value));
  // renderWindow.render();
// });

  


 // });