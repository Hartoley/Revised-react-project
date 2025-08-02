// Subcat.jsx or CourseSidebar.jsx
import React from "react";
import { PaystackButton } from "react-paystack";
import { toast } from "react-toastify";

const CourseSidebar = ({
  course = {},
  isPaid = false,
  userData = {},
  id = "",
}) => {
  const email = userData?.email || "";
  const username = userData?.username || "";

  const componentProps = {
    email,
    amount: (course.price || 9900) * 100,
    reference: new Date().getTime().toString(),
    metadata: {
      name: username,
      userId: id,
    },
    publicKey: "pk_test_6dbb10e57606b65e31e7be9d5ab4e13b3e5f74e1",
    text: "Buy now",
    onSuccess: () => toast.success("Payment successful!"),
    onClose: () => toast.error("Transaction was not completed."),
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        color: "#1c1d1f",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 0 1px #d1d1d1",
        width: "100%",
        zIndex: 2,
      }}
    >
      <div style={{ marginBottom: "16px", textAlign: "center" }}>
        {course.previewVideo ? (
          <video
            src={course.previewVideo}
            controls
            style={{
              width: "100%",
              borderRadius: "8px",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              backgroundColor: "#f1f1f1",
              height: "180px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
            }}
          >
            <p>No preview available</p>
          </div>
        )}
      </div>

      {!isPaid ? (
        <>
          <h2 style={{ fontSize: "24px", fontWeight: "700" }}>₦9,900</h2>
          <p style={{ fontSize: "14px", textDecoration: "line-through" }}>
            ₦57,900
          </p>
          <p style={{ color: "#b32d0f", fontWeight: "bold", fontSize: "14px" }}>
            83% off
          </p>
          <p style={{ color: "#b32d0f", fontSize: "12px", marginTop: "8px" }}>
            ⏰ 11 hours left at this price!
          </p>

          <button
            style={{
              width: "100%",
              marginTop: "16px",
              backgroundColor: "#a435f0",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => toast.info("Added to cart (mock logic)")}
          >
            Add to cart
          </button>

          <div style={{ marginTop: "8px" }}>
            <PaystackButton {...componentProps} className="paystack-button" />
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              backgroundColor: "#d4f5dd",
              color: "#107c41",
              padding: "8px 18px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: "600",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            ✅ Already Purchased
          </div>
          <p
            style={{ fontSize: "14px", marginTop: "12px", textAlign: "center" }}
          >
            You have access to this course.
          </p>
        </>
      )}

      <p style={{ fontSize: "12px", textAlign: "center", marginTop: "14px" }}>
        30-Day Money-Back Guarantee
      </p>
    </div>
  );
};

export default CourseSidebar;
