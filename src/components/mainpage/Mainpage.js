import React from 'react';
import Item from './Item';
// import Itemlist from './Itemlist';
// import "./mainpage.css";

const Mainpage = ({buyAsset}) => {
    return (
        <div>
            <Item buyAsset={buyAsset}/>
        </div>
    )
}

export default Mainpage
