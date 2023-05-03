import { useState } from "react";

interface Props {
  children: string;
  maxChars?: number;
}

// Very smart coding
const ExpandableText = ({ children, maxChars = 100 }: Props) => {
  const [showMore, setShowMore] = useState(true);
  // if less character then return direct without button
  if (children.length < 10) return <>{children}</>;
  const text = showMore ? children.slice(0, maxChars) + "..." : children; // Finialize text first, if we keep text in state then there were unnecessary re-rener
  return (
    <div>
      {text}
      <button
        onClick={() => {
          setShowMore(!showMore);
        }}
      >
        {/*show less or more on state */}
        {showMore ? "More" : "Less"}
      </button>
    </div>
  );
};

export default ExpandableText;
