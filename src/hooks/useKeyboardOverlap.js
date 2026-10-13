import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, Platform } from "react-native";

/**
 * Returns { ref, overlap, onLayout }.
 * Attach `ref` and `onLayout` to the screen's root <View> and apply `overlap`
 * as its paddingBottom.
 *
 * It measures how many pixels of that View are actually covered by the
 * keyboard, so it works whether or not the OS resized the window (Modals,
 * edge-to-edge mode, tab bars that hide/show, etc.).
 *
 * The measurement is repeated a few times after the keyboard opens and every
 * time the container's layout changes, because on Android the window resize /
 * tab-bar hiding can finish a moment AFTER the keyboard event fires.
 * If the OS already resized the window, the overlap is 0 (no double padding).
 */
export default function useKeyboardOverlap() {
  const ref = useRef(null);
  const keyboardTopRef = useRef(null); // null = keyboard hidden
  const timersRef = useRef([]);
  const [overlap, setOverlap] = useState(0);

  const measure = useCallback(() => {
    const node = ref.current;
    const keyboardTop = keyboardTopRef.current;
    if (!node || keyboardTop === null) return;
    node.measureInWindow((x, y, w, h) => {
      if (keyboardTopRef.current === null) return;
      setOverlap(Math.max(0, Math.round(y + h - keyboardTop)));
    });
  }, []);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillChangeFrame" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const clearTimers = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    const showSub = Keyboard.addListener(showEvent, (e) => {
      keyboardTopRef.current = e.endCoordinates.screenY;
      measure();
      clearTimers();
      timersRef.current = [120, 350, 700].map((ms) => setTimeout(measure, ms));
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      keyboardTopRef.current = null;
      clearTimers();
      setOverlap(0);
    });

    return () => {
      clearTimers();
      showSub.remove();
      hideSub.remove();
    };
  }, [measure]);

  return { ref, overlap, onLayout: measure };
}