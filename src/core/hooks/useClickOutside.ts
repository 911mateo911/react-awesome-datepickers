import { useEffect, useRef } from 'react';

export const useClickOutside = <T extends Element>(cb: () => void) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const listener = (event: Event) => {
            if (ref.current && ref.current?.contains(event.target as Node | null)) return;
            cb()
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, []);

    return ref;
}
