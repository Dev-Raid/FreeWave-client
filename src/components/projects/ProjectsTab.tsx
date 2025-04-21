'use client';

import React from 'react';
import {
    Box, Button, Flex, Heading, VStack, Badge, HStack, Text, Progress,
    IconButton, Menu, MenuButton, MenuList, MenuItem
} from '@chakra-ui/react';
import {FaPlus, FaEllipsisV, FaComments} from 'react-icons/fa';
import {useRouter} from 'next/navigation';

interface Project {
    id: number;
    title: string;
    budget: string;
    deadline: string;
    skills: string[];
    status: string;
    progress: number;
}

interface User {
    userId?: string | number;
    nickname?: string;
    userRole?: string;
    email?: string;
    profileImage?: string;
}

interface ProjectsTabProps {
    user: User | null;
    projects: Project[];
    router: ReturnType<typeof useRouter>;
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({user, projects, router}) => {
    return (
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
            <Flex justify="space-between" align="center" mb={6}>
                <Heading size="md">
                    {user?.userRole === 'ROLE_CLIENT' ? '내 프로젝트' : '진행 중인 프로젝트'}
                </Heading>
                {user?.userRole === 'ROLE_CLIENT' && (
                    <Button
                        leftIcon={<FaPlus/>}
                        colorScheme="blue"
                        onClick={() => router.push('/projects/create')}
                    >
                        새 프로젝트 등록
                    </Button>
                )}
            </Flex>

            <VStack align="stretch" spacing={4}>
                {projects.map((project) => (
                    <Box
                        key={project.id}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        _hover={{borderColor: 'blue.300', boxShadow: 'sm'}}
                        transition="all 0.2s"
                    >
                        <Flex direction={{base: 'column', md: 'row'}} justify="space-between" align="start" gap={4}>
                            <Box flex={1}>
                                <Flex align="center" mb={2}>
                                    <Heading size="sm" mr={2}>{project.title}</Heading>
                                    <Badge
                                        colorScheme={
                                            project.status === '완료' ? 'green' :
                                                project.status === '진행중' ? 'blue' : 'yellow'
                                        }
                                    >
                                        {project.status}
                                    </Badge>
                                </Flex>

                                <HStack mb={2} color="gray.600" fontSize="sm">
                                    <Text>예산: {project.budget}</Text>
                                    <Text>기간: {project.deadline}</Text>
                                </HStack>

                                <Flex flexWrap="wrap" gap={2} mb={3}>
                                    {project.skills.map((skill, idx) => (
                                        <Badge key={idx} colorScheme="blue" variant="outline">
                                            {skill}
                                        </Badge>
                                    ))}
                                </Flex>

                                {project.status === '진행중' && (
                                    <Box mt={2}>
                                        <Flex justify="space-between" mb={1}>
                                            <Text fontSize="xs">진행률</Text>
                                            <Text fontSize="xs">{project.progress}%</Text>
                                        </Flex>
                                        <Progress value={project.progress} size="xs" colorScheme="blue"
                                                  borderRadius="full"/>
                                    </Box>
                                )}
                            </Box>

                            <HStack>
                                <Button size="sm" colorScheme="blue" variant="outline">
                                    {project.status === '견적 대기' ? '견적 확인' : '상세보기'}
                                </Button>
                                <Menu>
                                    <MenuButton
                                        as={IconButton}
                                        aria-label="Options"
                                        icon={<FaEllipsisV/>}
                                        variant="ghost"
                                        size="sm"
                                    />
                                    <MenuList>
                                        <MenuItem icon={<FaComments/>}>메시지 보내기</MenuItem>
                                    </MenuList>
                                </Menu>
                            </HStack>
                        </Flex>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default ProjectsTab;
