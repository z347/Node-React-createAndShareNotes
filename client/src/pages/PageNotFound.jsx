import React, { useEffect } from 'react';

function PageNotFound() {
    useEffect(() => {
        document.title = `Page not found`;
    });

    return <h1>Page not found</h1>;
}

export default PageNotFound;
