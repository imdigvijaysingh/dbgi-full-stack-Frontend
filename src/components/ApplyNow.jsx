import {Link} from "react-router-dom";
import CtaButton from "./common/CtaButton";

const ApplyNow = ({
  heading,
  description,
  btnText,
}) => {
  return (
    <div>
      <section className="bg-[var(--color-secondary)] text-white text-center py-[80px] px-[20px]" id="admissions">
        <div className="container">
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] mb-[20px]">{heading}</h2>
          <p className="text-[clamp(1rem,2vw,1.2rem)] max-w-[700px] mx-auto mb-[30px] leading-[1.6]">
            {description}
          </p>
          <CtaButton>
            {btnText}
          </CtaButton>
        </div>
      </section>
    </div>
  );
};

export default ApplyNow;
