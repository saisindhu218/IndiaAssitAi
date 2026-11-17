import { useEffect, useRef } from "react";
import { useStateFilter } from "../context/StateFilterContext";
import { getUserProfile } from "../firebase/firestore";

// Runs once after login. If the Services state filter has never been set on
// this phone but the person has a state in their profile, start the filter
// from it. After that the two are independent: changing the filter on the
// Services page never changes the profile.
export default function ProfileStateSync({ uid }) {
  const { selectedState, setSelectedState, ready } = useStateFilter();
  const done = useRef(false);

  useEffect(() => {
    if (!ready || done.current) return;
    done.current = true;
    if (selectedState) return;
    getUserProfile(uid).then((profile) => {
      if (profile?.state) setSelectedState(profile.state);
    });
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
