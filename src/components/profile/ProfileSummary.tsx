'use client';

import React, {useState, useEffect} from 'react';
import {Box, Button, Flex, Heading, HStack, Icon, Text, VStack, Badge, Tag} from '@chakra-ui/react';
import {FaEdit, FaStar} from 'react-icons/fa';
import CustomAvatar from '../common/CustomAvatar';

interface User {
    userId?: string | number;
    nickname?: string;
    userRole?: string;
    imageUrl?: string;
    email?: string;
}

interface ProfileSummaryProps {
    user: User | null;
    profileImage: string;
    skills: string[];
    onEditClick: () => void;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({user, profileImage, skills, onEditClick}) => {
    const [imageSrc, setImageSrc] = useState<string>('');
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // 프로필 이미지 설정
    useEffect(() => {
        if (profileImage) {
            setImageSrc(profileImage);
            // 이미지 변경 시 로딩 상태 초기화
            setImageLoaded(false);
            setImageError(false);
        } else if (user?.imageUrl) {
            setImageSrc(user.imageUrl);
            setImageLoaded(false);
            setImageError(false);
        }
    }, [profileImage, user]);

    // 이미지 미리 로드
    useEffect(() => {
        if (!imageSrc) return;

        const img = new Image();
        img.src = imageSrc;

        // 이미지가 이미 캐시되어 있는 경우 complete 속성이 true
        if (img.complete) {
            setImageLoaded(true);
        } else {
            img.onload = () => setImageLoaded(true);
            img.onerror = () => {
                setImageError(true);
                handleImageError();
            };
        }
    }, [imageSrc]);

    const handleImageError = () => {
        const defaultImage = 'https://freewave.s3.ap-northeast-2.amazonaws.com/default+profile.png';
        setImageSrc(defaultImage);
        setImageError(true);
    };

    return (
        <Box
            bg="white"
            borderRadius="lg"
            boxShadow="md"
            p={6}
            mb={8}
        >
            <Flex direction={{base: 'column', md: 'row'}} gap={6} align="center">
                <CustomAvatar
                    name={user?.nickname}
                    src={imageSrc}
                    size="2xl"
                    border="4px solid"
                    borderColor="blue.400"
                    bg="gray.200"
                    onError={handleImageError}
                />

                <VStack align="start" flex={1} spacing={3}>
                    <Flex
                        width="100%"
                        justify="space-between"
                        align="center"
                    >
                        <Heading size="lg">{user?.nickname}</Heading>
                        <Button
                            leftIcon={<FaEdit/>}
                            colorScheme="blue"
                            variant="outline"
                            size="sm"
                            onClick={onEditClick}
                        >
                            프로필 수정
                        </Button>
                    </Flex>

                    <Text color="gray.600" fontSize="lg">
                        {user?.userRole === 'ROLE_CLIENT' ? '클라이언트' : 'UI/UX 디자이너 & 프론트엔드 개발자'}
                    </Text>

                    <HStack spacing={4}>
                        {user?.userRole === 'ROLE_FREELANCER' && (
                            <HStack>
                                <Icon as={FaStar} color="yellow.400"/>
                                <Text fontWeight="bold">4.9</Text>
                            </HStack>
                        )}
                        <Badge colorScheme="green" fontSize="0.8em" px={2} py={1} borderRadius="full">
                            {user?.userRole === 'ROLE_CLIENT' ? '인증된 클라이언트' : '인증된 프리랜서'}
                        </Badge>
                    </HStack>

                    {user?.userRole === 'ROLE_FREELANCER' && (
                        <Box width="100%" mt={2}>
                            <Flex flexWrap="wrap" gap={2}>
                                {skills.slice(0, 5).map((skill, index) => (
                                    <Tag key={index} colorScheme="blue" size="md">
                                        {skill}
                                    </Tag>
                                ))}
                                {skills.length > 5 && (
                                    <Tag colorScheme="gray" size="md">
                                        +{skills.length - 5}
                                    </Tag>
                                )}
                            </Flex>
                        </Box>
                    )}
                </VStack>
            </Flex>
        </Box>
    );
};

export default ProfileSummary;
