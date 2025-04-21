'use client';

import React, {useState} from 'react';
import {Box} from '@chakra-ui/react';

interface LazyImageProps {
    src: string;
    alt: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: string;
    className?: string;
    style?: React.CSSProperties;
}

const LazyImage: React.FC<LazyImageProps> = ({
                                                 src,
                                                 alt,
                                                 width = '100%',
                                                 height = '100%',
                                                 borderRadius = 'full',
                                                 className,
                                                 style
                                             }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Box
            position="relative"
            width={width}
            height={height}
            borderRadius={borderRadius}
            overflow="hidden"
            className={className}
            style={style}
        >
            <img
                src={src}
                alt={alt}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                }}
                onLoad={() => setIsLoaded(true)}
            />
        </Box>
    );
};

export default LazyImage;
