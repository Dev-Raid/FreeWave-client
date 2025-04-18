'use client';

import {Avatar, Badge, Box, Button, Flex, Heading, HStack, Icon, Text, VStack} from '@chakra-ui/react';
import {FaStar} from 'react-icons/fa';

interface FreelancerCardProps {
    freelancer: {
        id: number;
        name: string;
        title: string;
        rating: number;
        skills: string[];
        completedProjects: number;
    };
}

const FreelancerCard = ({freelancer}: FreelancerCardProps) => {
    const {name, title, rating, skills, completedProjects} = freelancer;

    return (
        <Box
            bg="white"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            transition="transform 0.3s, box-shadow 0.3s"
            _hover={{transform: 'translateY(-5px)', boxShadow: 'lg'}}
        >
            <Box p={6}>
                <VStack align="center" spacing={4}>
                    <Avatar size="xl" name={name} src={`https://i.pravatar.cc/150?u=${name}`}/>

                    <VStack spacing={1} textAlign="center">
                        <Heading as="h3" size="md">
                            {name}
                        </Heading>
                        <Text color="gray.600">{title}</Text>
                    </VStack>

                    <HStack>
                        <HStack>
                            <Icon as={FaStar} color="yellow.400"/>
                            <Text fontWeight="bold">{rating}</Text>
                        </HStack>
                        <Text color="gray.600" fontSize="sm">
                            {completedProjects}개 프로젝트 완료
                        </Text>
                    </HStack>

                    <Box width="100%">
                        <Text fontSize="sm" fontWeight="medium" mb={2} textAlign="center">
                            보유 기술:
                        </Text>
                        <Flex flexWrap="wrap" gap={2} justify="center">
                            {skills.map((skill, index) => (
                                <Badge key={index} colorScheme="blue" variant="outline">
                                    {skill}
                                </Badge>
                            ))}
                        </Flex>
                    </Box>

                    <Button colorScheme="blue" size="sm" width="full">
                        프로필 보기
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default FreelancerCard;
