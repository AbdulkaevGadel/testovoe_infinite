import { useEffect, RefObject } from 'react';

const useInfiniteScroll = (
    callback: () => void,
    listRef: RefObject<Element | null>,
    isLoading: boolean
) => {
    useEffect(() => {
        const element = listRef.current;
        if (!element) return;

        let isThrottled = false;

        const handleScroll = () => {
            if (isThrottled || isLoading) return;

            isThrottled = true;
            setTimeout(() => {
                const { scrollTop, clientHeight, scrollHeight } = element;
                const threshold = 200; // Расстояние до конца для подгрузки

                if (scrollHeight - (scrollTop + clientHeight) < threshold) {
                    callback();
                }
                isThrottled = false;
            }, 200);
        };

        element.addEventListener('scroll', handleScroll);
        return () => element.removeEventListener('scroll', handleScroll);
    }, [callback, listRef, isLoading]);
};

export default useInfiniteScroll;