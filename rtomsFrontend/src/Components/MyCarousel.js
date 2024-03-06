import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import './MyCarousel.css'; // Import a separate CSS file for custom styling
import Logo from '../Assets/RTOMSimages/logo.webp';

const MyCarousel = () => {
  return (
    <div id="carouselExample" className="carousel slide d-flex vw-100 align-items-center" data-bs-ride="carousel">
      <div className="carousel-inner">
        <center>
        <div className="carousel-item active">
          <img src="..." className="d-block " alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src="..." className="d-block " alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src="..." className="d-block " alt="Slide 3" />
        </div>
        </center>
      </div>
      <button className="carousel-control-prev " type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default MyCarousel;

// import React from 'react';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
// import './MyCarousel.css'; // Import a separate CSS file for custom styling
// import Logo from '../Assets/RTOMSimages/logo.webp';

// const MyCarousel = () => {
//   return (
//     <div className="container"> {/* Add a container to control the width */}
//       <div id="carouselExample" className="carousel slide d-flex align-items-center" data-bs-ride="carousel">
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <img src="..." className="d-block w-100" alt="Slide 1" /> {/* Use w-100 to set width */}
//           </div>
//           <div className="carousel-item">
//             <img src="..." className="d-block w-100" alt="Slide 2" />
//           </div>
//           <div className="carousel-item">
//             <img src="..." className="d-block w-100" alt="Slide 3" />
//           </div>
//         </div>
//         <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyCarousel;
