import { useEffect } from "react";

const DEFAULT_TITLE = "PhysicianMeds | Expert Medical Billing & Revenue Cycle Management";

/**
 * Sets the document title for the current page.
 * Format: "Page Name | PhysicianMeds"
 * Resets to the default title on unmount.
 */
const usePageTitle = (title?: string) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | PhysicianMeds`;
    } else {
      document.title = DEFAULT_TITLE;
    }

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
};

export default usePageTitle;
