import { useEffect } from 'react';

const useInfiniteScroll = (callback: () => void) => {
    useEffect(() => {
        let isThrottled = false;

        const handleScroll = () => {
            if (isThrottled) return;

            isThrottled = true;
            setTimeout(() => {
                const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
                if (scrollHeight - (scrollTop + clientHeight) < 200) {
                    callback();
                }
                isThrottled = false;
            }, 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [callback]);
};

export default useInfiniteScroll;