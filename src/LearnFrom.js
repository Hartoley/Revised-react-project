import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LearnAnywhereSection = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="row align-items-center gx-5">
          {/* Video Column */}
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="ratio ratio-16x9 rounded shadow overflow-hidden">
              <video
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                controls
                autoPlay
                muted
                loop
                className="img-fluid rounded shadow"
              ></video>
            </div>
          </div>

          {/* Text Column */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Learn from anywhere</h2>
            <p className="lead text-muted mb-4">
              Whether you're at home, commuting, or traveling — your next
              learning opportunity is always within reach.
            </p>
            <ul className="list-unstyled mb-4">
              <li className="mb-2">
                <i className="bi bi-laptop text-primary me-2"></i> Watch on any
                device
              </li>
              <li className="mb-2">
                <i className="bi bi-wifi text-primary me-2"></i> Seamless
                streaming anywhere
              </li>
              <li className="mb-2">
                <i className="bi bi-clock-history text-primary me-2"></i> Learn
                at your own pace
              </li>
            </ul>
            <a href="/courses" className="btn btn-outline-primary btn-lg">
              Start Learning
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnAnywhereSection;
