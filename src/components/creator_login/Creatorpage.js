import React from 'react';
import Creatordrawer from "./Creatordrawer";

const Creatorpage = ({captureFile,uploadAsset, earnings}) => {
    return (
        <div>
            <Creatordrawer captureFile={captureFile}
              earnings={earnings}
              uploadAsset={uploadAsset}/>
        </div>
    )
}

export default Creatorpage
