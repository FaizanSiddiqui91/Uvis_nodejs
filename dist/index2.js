import '@kitware/vtk.js/favicon';

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

function myfunction() {   
alert("how are you");  
}

 
// const renderWindow = vtkRenderWindow.newInstance();
// const renderer = vtkRenderer.newInstance({ background: [0, 0, 0] });
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




 
 
  // async function update() {
    // const volumeArrayBuffer = await vtkLiteHttpDataAccessHelper.fetchBinary(
     // `https://faizansiddiqui91.github.io/Data/T1_mha_tumor.mha`	
	 // // `https://github.com/FaizanSiddiqui91/TestData/raw/290952b4cc733fa991889cfe6ce744fe1c46102e/T1_dwireg_fullsize.mha`

    // );
  
 // // // // 'https://github.com/FaizanSiddiqui91/TestData/blob/5912b1ed5504f076850f17de43a884277506965d'/DWI_tumor.nrrd'

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
	  
	  
	   // ['.sliceI', '.sliceJ', '.sliceK'].forEach((selector, idx) => {
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


// //https://kitware.github.io/vtk-js/data/cow.vtp

	 // // const reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });
// // reader.setUrl(`https://faizansiddiqui91.github.io/Data/cow.vtp`).then(() => {  //https://faizansiddiqui91.github.io/Data/tumor_model.vtp
  // // reader.loadData().then(() => {
    // // renderer.resetCamera();
    // // renderWindow.render();
  // // });
// // });

// // const mapper1 = vtkMapper.newInstance();
// // mapper1.setInputConnection(reader.getOutputPort());

// // const actor1 = vtkActor.newInstance();
// // actor1.setMapper(mapper1);

// // actor1.setVisibility(1);


// // renderer.addActor(actor1);
// // renderWindow.render();

// const reader = vtkPolyDataReader.newInstance();
// reader.setUrl(`https://faizansiddiqui91.github.io/Data/fibers.vtk`).then(() => {
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


// // const reader2 = vtkPolyDataReader.newInstance();
// // reader2.setUrl(`https://faizansiddiqui91.github.io/Data/tumor.vtk`).then(() => {
  // // const polydata2 = reader2.getOutputData(0);
  // // const mapper2 = vtkMapper.newInstance();
  // // const actor2 = vtkActor.newInstance();

  // // actor2.setMapper(mapper2);
  // // mapper2.setInputData(polydata2);

  // // renderer.addActor(actor2);

  // // renderer.resetCamera();
   // // //renderer.resetCameraClippingRange();
   // // renderWindow.render();	
// // });





	
	// document.querySelector('.sliceI').addEventListener('input', (e) => {
  // imageActorI.getMapper().setISlice(Number(e.target.value));
  // renderWindow.render();
// });		 

// document.querySelector('.sliceJ').addEventListener('input', (e) => {
  // imageActorJ.getMapper().setJSlice(Number(e.target.value));
  // renderWindow.render();
// });

// document.querySelector('.sliceK').addEventListener('input', (e) => {
  // imageActorK.getMapper().setKSlice(Number(e.target.value));
  // renderWindow.render();
// });

// // document
  // // .querySelector('.colorLevel')
  // // .addEventListener('input', updateColorLevel);
// // document
  // // .querySelector('.colorWindow')
  // // .addEventListener('input', updateColorWindow);
    


 
// // ----------------------------------------------------------------------------
// // Use OpenGL as the backend to view the all this
// // ----------------------------------------------------------------------------

// // const openglRenderWindow = vtkOpenGLRenderWindow.newInstance();
// // renderWindow.addView(openglRenderWindow);

// // // ----------------------------------------------------------------------------
// // // Create a div section to put this into
// // // ----------------------------------------------------------------------------

// // const container = document.createElement('div');
// // container.style.width = "500px";
// // container.style.paddingLeft = "800px";
// // document.querySelector('body').appendChild(container);
// // openglRenderWindow.setContainer(container);



// // ----------------------------------------------------------------------------
// // Capture size of the container and set it to the renderWindow
// // ----------------------------------------------------------------------------

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

            

// global.source = reader;
// global.mapper = mapper1;
// global.actor = actor1;
// global.renderer = renderer;
// global.renderWindow = renderWindow;

			