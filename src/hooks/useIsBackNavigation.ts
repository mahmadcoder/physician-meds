import { useNavigationType } from "react-router-dom";

/**
 * Returns true if the current navigation was triggered by
 * the browser back/forward buttons (POP navigation).
 * Use this to skip entrance animations on back navigation
 * so users see the page content instantly at their saved scroll position.
 */
export default function useIsBackNavigation(): boolean {
  return useNavigationType() === "POP";
}
