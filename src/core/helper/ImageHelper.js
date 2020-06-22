import React from 'react';
import {API} from "../../backend";


function ImageHelper({product}) {
    const imageURL = product
        ? `${API}/product/photo/${product._id}`
        : undefined

    return (
        <div className="rounded border border-success p-2">
            <img
                src={imageURL}
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                className="mb-3 rounded"
            />
        </div>
    );
}

export default ImageHelper;