import React from "react";
import { useState } from "react";

const UmeedCards = ({ iconImage, title, description, Phone }) => {
  
    const [copiedPhone, setCopiedPhone] = useState(false);

  // Copy Phone Number
  const copyPhoneToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(Phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch (err) {
      console.error("Failed to copy phone number:", err);
    }
  };

  return (
    <div>
      <div className="feature-card">
        <i className={iconImage}></i>
        <h3>{title}</h3>
        <p>{description}</p>
        <strong
          className="contact-phone"
          onClick={copyPhoneToClipboard}
        >
          {copiedPhone ? (
            <>
              Phone number copied!
            </>
          ) : (
            Phone
          )}
        </strong>{" "}
      </div>
    </div>
  );
};

export default UmeedCards;
