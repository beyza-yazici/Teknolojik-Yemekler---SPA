import React from "react";
import "../../images/iteration-1-images/logo.svg";
import "../css/Success.css";

function SuccessPage() {
    return (
        <div className="success-page">
            <div className="logo">
                <img src="../../images/iteration-1-images/logo.svg" alt="logo" />
            </div>
            <div className="success-message">
                <p>TEBRİKLER!</p>
                <p>SİPARİŞİNİZ ALINDI!</p>
            </div>
            </div>
    );
}

export default SuccessPage;
