'use client';

import React, {useState, useEffect} from 'react';
import {Box} from '@chakra-ui/react';

interface CustomAvatarProps {
    name?: string;
    src?: string;
    size?: string;
    border?: string;
    borderColor?: string;
    bg?: string;
    onError?: () => void;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({
                                                       name,
                                                       src,
                                                       size = '2xl',
                                                       border,
                                                       borderColor,
                                                       bg = 'gray.200',
                                                       onError
                                                   }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // 사이즈 매핑
    const sizeMap: Record<string, string> = {
        'xs': '24px',
        'sm': '32px',
        'md': '48px',
        'lg': '64px',
        'xl': '96px',
        '2xl': '128px',
    };

    const boxSize = sizeMap[size] || size;

    // 이미지 미리 로드
    useEffect(() => {
        if (!src) return;

        const img = new Image();

        // 이미지가 이미 캐시되어 있는 경우 처리
        if (img.complete) {
            setImageLoaded(true);
            setImageError(false);
        } else {
            img.onload = () => {
                setImageLoaded(true);
                setImageError(false);
            };
            img.onerror = () => {
                setImageError(true);
                setImageLoaded(false);
                if (onError) onError();
            };
        }

        img.src = src;
    }, [src, onError]);

    return (
        <Box
            position="relative"
            width={boxSize}
            height={boxSize}
            borderRadius="full"
            overflow="hidden"
            border={border}
            borderColor={borderColor}
            bg={bg}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            {/* 이미지 - 로드될 때까지 숨김 처리 */}
            {src && !imageError && (
                <img
                    src={src}
                    alt={name || 'Profile'}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: imageLoaded ? 1 : 0,
                        visibility: imageLoaded ? 'visible' : 'hidden',
                        transition: 'opacity 0.3s ease-in-out'
                    }}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setImageError(true);
                        if (onError) onError();
                    }}
                />
            )}
        </Box>
    );
};

export default CustomAvatar;
