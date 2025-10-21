import React from "react";
import { getCurrentYear, getFooterCopy } from "../utils/utils";

function Footer() {
  return (
    <div className="App-footer p-4 text-center italic" style={{ borderTop: '3px solid var(--main-color)' }}>
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>
    </div>
  );
}

export default Footer;