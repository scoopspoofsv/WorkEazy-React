import React from "react";
import './style.scss';

const LoadingShimmer = () => {
    return(
        <div className="loading-screen">
            <div class="card br">
                <div class="wrapper">
                    <div class="comment br animate w80"></div>
                    <div class="comment br animate"></div>
                    <div class="comment br animate"></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingShimmer