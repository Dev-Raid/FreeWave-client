'use client';

import {Badge, Box, Button, Flex, Heading, HStack, Text, VStack} from '@chakra-ui/react';

interface ProjectCardProps {
    project: {
        id: number;
        title: string;
        budget: string;
        deadline: string;
        skills: string[];
        clientName: string;
    };
}

const ProjectCard = ({project}: ProjectCardProps) => {
    const {title, budget, deadline, skills, clientName} = project;

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
                <VStack align="start" spacing={4}>
                    <Heading as="h3" size="md" noOfLines={2}>
                        {title}
                    </Heading>

                    <HStack>
                        <Badge colorScheme="green" fontSize="sm">
                            예산: {budget}
                        </Badge>
                        <Badge colorScheme="purple" fontSize="sm">
                            기간: {deadline}
                        </Badge>
                    </HStack>

                    <Text fontSize="sm" color="gray.600">
                        클라이언트: {clientName}
                    </Text>

                    <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={2}>
                            필요 기술:
                        </Text>
                        <Flex flexWrap="wrap" gap={2}>
                            {skills.map((skill, index) => (
                                <Badge key={index} colorScheme="blue" variant="outline">
                                    {skill}
                                </Badge>
                            ))}
                        </Flex>
                    </Box>

                    <Button colorScheme="blue" size="sm" width="full">
                        견적 제안하기
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default ProjectCard;
