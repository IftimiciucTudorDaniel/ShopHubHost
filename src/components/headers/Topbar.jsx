import React from "react";
import { Link } from "react-router-dom";
import LanguageSelect from "../common/LanguageSelect";

export default function Topbar() {
  return (
    <div className="tf-topbar bg-main">
      <div className="container">
        <div className="tf-topbar_wrap d-flex align-items-center justify-content-center justify-content-xl-between">
          <ul className="topbar-left">
            <li>
              <a className="text-caption-1 text-white" href="tel:+40 (745) 757 086">
                +40 (745) 757 086
              </a>
            </li>
            <li>
              <a className="text-caption-1 text-white" href="#">
                office@alpacas.ro
              </a>
            </li>
          </ul>
          <div className="topbar-right d-none d-xl-block">
            <div className="tf-cur justify-content-end">
              <div className="tf-languages position-relative">
                <LanguageSelect
                  parentClassName="image-select center style-default type-languages color-white"
                  topStart={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
