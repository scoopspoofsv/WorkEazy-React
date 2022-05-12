import React from "react";
import './style.scss';

const LoadingShimmer = () => {
    return(
        <div className="loading-screen">
            <div className="card br">
                <div className="wrapper">
                    <div className="comment br animate w80"></div>
                    <div className="comment br animate"></div>
                    <div className="comment br animate"></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingShimmer