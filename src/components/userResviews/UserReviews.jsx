import React from "react";

const reviews = [
  {
    name: "Ali Khan",
    role: "Software Engineer",
    review: "This AI tool improved my resume instantly. Very helpful and accurate feedback.",
  },
  {
    name: "Sara Ahmed",
    role: "Frontend Developer",
    review: "Very clean UI and powerful AI suggestions. Highly recommended for fresh graduates.",
  },
  {
    name: "Usman Tariq",
    role: "Full Stack Developer",
    review: "I improved my resume score from 60 to 90 using this tool. Amazing experience!",
  },
  {
    name: "Ayesha Malik",
    role: "UI/UX Designer",
    review: "The design feedback from AI was surprisingly accurate and helpful for my portfolio.",
  },
];

const UserReviews = () => {
  return (
    <div className="reviews-section py-5 border-top">

      <div className="container">

        {/* HEADER */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">What Users Say</h2>
          <p className="text-secondary">
            Real feedback from professionals using our AI tool
          </p>
        </div>

        {/* SLIDER */}
        <div className="slider">
          <div className="slider-track">

            {[...reviews,...reviews].map((item, index) => (
              <div className="slider-card" key={index}>

                <div className="mb-3">
                  <i className="bi bi-chat-quote-fill text-primary fs-3"></i>
                </div>

                <p className="text-secondary small">
                  "{item.review}"
                </p>

                <hr className="border-secondary" />

                <h6 className="mb-0 fw-bold">{item.name}</h6>
                <small className="text-secondary">{item.role}</small>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default UserReviews;