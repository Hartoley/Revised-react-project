import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FeatureSection = ({ heroImg }) => (
  <section className="py-5 bg-light">
    <div className="container">
      <div className="row align-items-center gx-5">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img
            src="https://i.pinimg.com/736x/03/08/6b/03086b2cf8ebfba2808fdd68a31a6330.jpg"
            alt="Feature preview"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-lg-6">
          <h2 className="fw-bold mb-3">Learn skills that pay your bills</h2>
          <p className="lead text-secondary mb-4">
            Access expert-led courses on in-demand topics — anytime, anywhere.
          </p>
          <ul className="list-unstyled mb-4">
            <li className="mb-3">
              <i className="bi bi-check-circle-fill text-success me-2"></i> Over
              20,000 expert‑taught courses
            </li>
            <li className="mb-3">
              <i className="bi bi-check-circle-fill text-success me-2"></i>{" "}
              Lifetime access with any purchase
            </li>
            <li className="mb-3">
              <i className="bi bi-check-circle-fill text-success me-2"></i>{" "}
              Certificate of completion you can share
            </li>
          </ul>
          <button
            className="btn btn-lg mb-4"
            style={{
              backgroundColor: "rgb(45, 47, 49)",
              color: "white",
              border: "none",
            }}
          >
            Browse Courses
          </button>

          {/* <button className="btn btn-primary btn-lg"></button> */}
        </div>
      </div>
    </div>
  </section>
);

export default FeatureSection;
