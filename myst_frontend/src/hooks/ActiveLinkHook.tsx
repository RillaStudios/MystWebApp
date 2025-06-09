import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// LinkItem type definition
type LinkItem = {
    link: string;
    label: string;
    legal?: boolean;
};

/**
 * Custom hook to determine the active link based on the current URL.
 * It checks the first segment of the path to find a matching link.
 *
 * @param {LinkItem[]} links - Array of link items to check against.
 * @returns {Object} - Contains the active link and a function to set it.
 * 
 * @author IFD
 * @since 2025-06-09
 */
const useActiveLink = (links: LinkItem[]) => {
    const location = useLocation();
    const { pathname, hash } = location;

    const getActiveLink = () => {
        return (
            links.find(link => {

                // Exact match for home page
                if (link.link === "/") {
                    return pathname === "/";
                }

                // Match first path segment
                const linkFirstSegment = link.link.split("/")[1];
                const currentFirstSegment = pathname.split("/")[1];
                return linkFirstSegment === currentFirstSegment;
            })?.link || links[0].link
        );
    };

    const [active, setActive] = useState(getActiveLink());

    useEffect(() => {
        setActive(getActiveLink());
    }, [pathname, hash]);

    return { active, setActive };
};

export default useActiveLink;
