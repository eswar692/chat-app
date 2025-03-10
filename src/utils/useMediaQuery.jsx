import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);

        const listener = () => setMatches(media.matches);

        media.addEventListener("change", listener);

        // Cleanup listener when component unmounts
        return () => media.removeEventListener("change", listener);
    }, [query]); // Dependency lo query pass cheyyali, valla dynamic ga update avuthadi

    return matches;
};

export default useMediaQuery;
