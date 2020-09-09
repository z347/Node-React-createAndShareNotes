import React, { useEffect } from 'react';

function Home() {
    useEffect(() => {
        document.title = `Nerdy Soft`;
    });

    return <h1>Home page</h1>;
}

export default Home;
