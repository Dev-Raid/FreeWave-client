'use client';

import React, {useState, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {
    Box, Container, Tabs, TabList, TabPanels, Tab, TabPanel, Icon, useDisclosure, useToast
} from '@chakra-ui/react';
import {
    FaUser, FaClipboardList, FaComments, FaCreditCard, FaFileAlt
} from 'react-icons/fa';
import {useAuth} from '@/contexts/AuthContext';
import api from '@/services/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProfileSummary from '@/components/profile/ProfileSummary';
import ProfileTab from '@/components/profile/ProfileTab';
import ProjectsTab from '@/components/projects/ProjectsTab';
import MessagesTab from '@/components/messages/MessagesTab';
import PaymentsTab from '@/components/payments/PaymentsTab';
import ResumeTab from '@/components/resume/ResumeTab';
import ProfileEditModal from '@/components/profile/ProfileEditModal';
import PortfolioAddModal from '@/components/portfolio/PortfolioAddModal';
import {useProfile, ProfileUpdateData} from '@/contexts/ProfileContext';

// 임시 데이터 - 프로젝트
const myProjects = [
    {
        id: 1,
        title: '모바일 앱 UI/UX 디자인',
        budget: '2,000,000원',
        deadline: '2주',
        skills: ['Figma', 'Adobe XD', 'UI/UX'],
        clientName: '테크스타트',
        status: '진행중',
        progress: 65,
    },
    {
        id: 2,
        title: '웹사이트 백엔드 개발',
        budget: '3,500,000원',
        deadline: '1개월',
        skills: ['Java', 'Spring Boot', 'MySQL'],
        clientName: '이커머스 코리아',
        status: '견적 대기',
        progress: 0,
    },
    {
        id: 3,
        title: '마케팅 콘텐츠 제작',
        budget: '1,500,000원',
        deadline: '3주',
        skills: ['콘텐츠 마케팅', '카피라이팅'],
        clientName: '브랜드 솔루션즈',
        status: '완료',
        progress: 100,
    },
    {
        id: 4,
        title: '데이터 분석 및 시각화',
        budget: '2,800,000원',
        deadline: '3주',
        skills: ['Python', 'Pandas', 'Tableau'],
        clientName: '데이터인사이트',
        status: '진행중',
        progress: 30,
    },
    {
        id: 5,
        title: 'SNS 마케팅 전략 수립',
        budget: '1,200,000원',
        deadline: '2주',
        skills: ['소셜미디어 마케팅', '콘텐츠 기획'],
        clientName: '소셜브랜드',
        status: '견적 대기',
        progress: 0,
    }
];

// 임시 데이터 - 메시지
const messages = [
    {
        id: 1,
        sender: '김디자이너',
        avatar: 'https://i.pravatar.cc/150?u=김디자이너',
        projectTitle: '모바일 앱 UI/UX 디자인',
        lastMessage: '수정된 디자인 시안을 보내드립니다. 피드백 부탁드립니다.',
        unread: 2,
        timestamp: '오늘 14:30',
    },
    {
        id: 2,
        sender: '이마케터',
        avatar: 'https://i.pravatar.cc/150?u=이마케터',
        projectTitle: '마케팅 콘텐츠 제작',
        lastMessage: '최종 콘텐츠 파일 전달드립니다. 확인 후 연락주세요.',
        unread: 0,
        timestamp: '어제 18:45',
    },
    {
        id: 3,
        sender: '테크스타트',
        avatar: 'https://i.pravatar.cc/150?u=테크스타트',
        projectTitle: '웹사이트 백엔드 개발',
        lastMessage: '견적서 검토 중입니다. 조만간 답변 드리겠습니다.',
        unread: 0,
        timestamp: '2025-04-16 09:20',
    },
    {
        id: 4,
        sender: '박데이터',
        avatar: 'https://i.pravatar.cc/150?u=박데이터',
        projectTitle: '데이터 분석 및 시각화',
        lastMessage: '분석 중간 결과를 공유드립니다. 방향성에 대한 의견 부탁드립니다.',
        unread: 1,
        timestamp: '오늘 10:15',
    },
    {
        id: 5,
        sender: '소셜브랜드',
        avatar: 'https://i.pravatar.cc/150?u=소셜브랜드',
        projectTitle: 'SNS 마케팅 전략 수립',
        lastMessage: '제안서 잘 받았습니다. 내부 검토 후 연락드리겠습니다.',
        unread: 0,
        timestamp: '2025-04-17 16:40',
    }
];

// 임시 데이터 - 포트폴리오
const portfolioItems = [
    {
        id: 1,
        title: '핀테크 모바일 앱 UI/UX 디자인',
        description: '사용자 경험을 최우선으로 고려한 핀테크 앱 디자인 프로젝트. 직관적인 인터페이스와 보안을 강조한 디자인으로 사용자 만족도를 높였습니다.',
        pdfFile: 'https://example.com/pdfs/fintech-app-design.pdf',
        link: 'https://example.com/portfolio/1',
        tags: ['UI/UX', 'Figma', 'Mobile App', 'Fintech'],
    },
    {
        id: 2,
        title: '이커머스 웹사이트 리디자인',
        description: '전환율 향상을 위한 사용자 중심 이커머스 웹사이트 리디자인. 결제 프로세스 간소화와 상품 검색 기능 개선으로 매출 20% 증가에 기여했습니다.',
        pdfFile: 'https://example.com/pdfs/ecommerce-redesign.pdf',
        link: 'https://example.com/portfolio/2',
        tags: ['Web Design', 'E-commerce', 'Adobe XD', 'Conversion Rate'],
    },
    {
        id: 3,
        title: '브랜드 아이덴티티 디자인',
        description: '스타트업을 위한 브랜드 아이덴티티 및 로고 디자인. 회사의 핵심 가치와 비전을 시각적으로 표현하여 브랜드 인지도 향상에 기여했습니다.',
        pdfFile: 'https://example.com/pdfs/brand-identity.pdf',
        link: 'https://example.com/portfolio/3',
        tags: ['Branding', 'Logo Design', 'Identity', 'Startup'],
    },
    {
        id: 4,
        title: '헬스케어 대시보드 UI 개발',
        description: '의료 전문가를 위한 환자 데이터 모니터링 대시보드 디자인 및 프론트엔드 개발. 복잡한 의료 데이터를 직관적으로 시각화하여 의사결정 지원.',
        pdfFile: 'https://example.com/pdfs/healthcare-dashboard.pdf',
        link: 'https://example.com/portfolio/4',
        tags: ['Dashboard', 'Healthcare', 'React', 'Data Visualization'],
    },
    {
        id: 5,
        title: '모바일 뱅킹 앱 프로토타입',
        description: '차세대 모바일 뱅킹 앱을 위한 프로토타입 개발. 생체인식 로그인, 개인화된 금융 조언 등 혁신적인 기능을 포함한 사용자 중심 설계.',
        pdfFile: 'https://example.com/pdfs/mobile-banking.pdf',
        link: 'https://example.com/portfolio/5',
        tags: ['Prototype', 'Banking', 'Mobile', 'FinTech', 'Figma'],
    }
];

// 임시 데이터 - 결제 내역
const payments = [
    {
        id: 1,
        projectTitle: '모바일 앱 UI/UX 디자인',
        amount: '1,800,000원',
        date: '2025-04-10',
        status: '결제완료',
        type: '에스크로 입금',
        recipient: '김디자이너',
    },
    {
        id: 2,
        projectTitle: '마케팅 콘텐츠 제작',
        amount: '1,400,000원',
        date: '2025-03-25',
        status: '정산완료',
        type: '프로젝트 완료 정산',
        recipient: '이마케터',
    },
    {
        id: 3,
        projectTitle: '로고 디자인',
        amount: '500,000원',
        date: '2025-03-15',
        status: '환불완료',
        type: '프로젝트 취소',
        recipient: '최디자이너',
    },
    {
        id: 4,
        projectTitle: '웹사이트 백엔드 개발',
        amount: '1,750,000원',
        date: '2025-04-05',
        status: '결제완료',
        type: '중간 결제',
        recipient: '박개발자',
    },
    {
        id: 5,
        projectTitle: '데이터 분석 및 시각화',
        amount: '1,400,000원',
        date: '2025-04-18',
        status: '결제완료',
        type: '선금',
        recipient: '박데이터',
    }
];

// 임시 데이터 - 견적
const estimates = [
    {
        id: 1,
        projectId: 2,
        projectTitle: '웹사이트 백엔드 개발',
        freelancerName: '박개발자',
        amount: '3,200,000원',
        duration: '4주',
        message: '스프링 부트와 MySQL을 활용한 백엔드 개발 경험이 풍부합니다. 요구사항에 맞게 안정적인 서버를 구축해드리겠습니다.',
        status: '대기중',
        createdAt: '2025-04-15',
    },
    {
        id: 2,
        projectId: 1,
        projectTitle: '모바일 앱 UI/UX 디자인',
        freelancerName: '김디자이너',
        amount: '1,800,000원',
        duration: '2주',
        message: '핀테크 앱 UI/UX 디자인 경험이 있으며, 사용자 중심의 직관적인 디자인을 제공합니다.',
        status: '수락됨',
        createdAt: '2025-04-10',
    },
    {
        id: 3,
        projectId: 3,
        projectTitle: '마케팅 콘텐츠 제작',
        freelancerName: '이마케터',
        amount: '1,400,000원',
        duration: '3주',
        message: '브랜드 아이덴티티에 맞는 콘텐츠 제작 전략을 수립하고 실행해 드립니다.',
        status: '수락됨',
        createdAt: '2025-03-25',
    },
    {
        id: 4,
        projectId: 5,
        projectTitle: 'SNS 마케팅 전략 수립',
        freelancerName: '정마케터',
        amount: '1,150,000원',
        duration: '2주',
        message: '소셜 미디어 트렌드를 반영한 맞춤형 마케팅 전략을 제안해 드립니다. 타겟 고객층 분석과 콘텐츠 캘린더 포함.',
        status: '대기중',
        createdAt: '2025-04-17',
    },
    {
        id: 5,
        projectId: 4,
        projectTitle: '데이터 분석 및 시각화',
        freelancerName: '박데이터',
        amount: '2,800,000원',
        duration: '3주',
        message: '파이썬과 태블로를 활용한 데이터 분석 및 인사이트 도출. 사용자 친화적인 대시보드로 비즈니스 의사결정을 지원합니다.',
        status: '수락됨',
        createdAt: '2025-04-12',
    }
];

interface ProfileForm {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
    role: string;
    profileImage: string;
}

interface Portfolio {
    id: number;
    title: string;
    description: string;
    pdfFile: File | string;
    link: string;
    tags: string[];
}

interface Resume {
    bio: string;
    skills: string[];
    newSkill: string;
    portfolios: Portfolio[];
    newPortfolio: {
        title: string;
        description: string;
        pdfFile: File | null;
        link: string;
        tags: string[];
    };
}

const MyPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {isAuthenticated} = useAuth();
    const [tabIndex, setTabIndex] = useState<number>(0);
    const toast = useToast();

    // ProfileContext 사용
    const {profile, updateProfile, uploadProfileImage, refreshProfile, isLoading} = useProfile();

    // 이미지 관련 상태
    const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // 프로필 수정 모달
    const {isOpen: isProfileModalOpen, onOpen: onProfileModalOpen, onClose: onProfileModalClose} = useDisclosure();

    // 포트폴리오 추가 모달
    const {
        isOpen: isPortfolioModalOpen,
        onOpen: onPortfolioModalOpen,
        onClose: onPortfolioModalClose
    } = useDisclosure();

    // 프로필 수정 폼 상태 - ProfileContext의 profile 데이터 사용
    const [profileForm, setProfileForm] = useState<ProfileForm>({
        email: profile?.email || '',
        nickname: profile?.nickname || '',
        password: '',
        confirmPassword: '',
        role: profile?.userRole || 'ROLE_FREELANCER',
        profileImage: profile?.imageUrl || ''
    });

    // 이력서 상태
    const [resume, setResume] = useState<Resume>({
        bio: '8년 경력의 UI/UX 디자이너이자 프론트엔드 개발자입니다. 사용자 중심의 디자인과 최신 기술을 활용한 개발로 최상의 결과물을 제공합니다. 핀테크, 이커머스 분야에 전문성이 있습니다.',
        skills: ['React', 'TypeScript', 'UI/UX', 'Figma', 'Next.js'],
        newSkill: '',
        portfolios: portfolioItems,
        newPortfolio: {
            title: '',
            description: '',
            pdfFile: null,
            link: '',
            tags: []
        }
    });

    // PDF 변경 핸들러
    const handlePDFChange = (file: File): void => {
        setResume({
            ...resume,
            newPortfolio: {
                ...resume.newPortfolio,
                pdfFile: file
            }
        });
    };

    useEffect(() => {
        // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        // URL 파라미터에서 탭 인덱스 가져오기
        const tabParam = searchParams.get('tab');
        if (tabParam) {
            setTabIndex(parseInt(tabParam));
        }
    }, [isAuthenticated, router, searchParams]);

    // ProfileContext의 profile 데이터가 변경될 때 프로필 폼 업데이트
    useEffect(() => {
        if (profile) {
            setProfileForm(prev => ({
                ...prev,
                email: profile.email || prev.email,
                nickname: profile.nickname || prev.nickname,
                role: profile.userRole || prev.role,
                profileImage: profile.imageUrl || prev.profileImage
            }));
        }
    }, [profile]);

    // 사용자가 인증된 상태이고 프로필 정보가 없을 때 프로필 정보 로드
    useEffect(() => {
        if (isAuthenticated && !profile) {
            refreshProfile();
        }
    }, [isAuthenticated, profile, refreshProfile]);

    // 탭 변경 핸들러
    const handleTabChange = (index: number): void => {
        setTabIndex(index);
        router.push(`/mypage?tab=${index}`, {scroll: false});
    };

    // 프로필 폼 변경 핸들러
    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const {name, value} = e.target;
        setProfileForm({
            ...profileForm,
            [name]: value
        });
    };

    // 프로필 이미지 변경 핸들러
    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setIsImageChanged(true);

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileForm({
                    ...profileForm,
                    profileImage: reader.result as string
                });
            };
            reader.readAsDataURL(file);
        }
    };

    // 프로필 업데이트 핸들러 - ProfileContext의 updateProfile 및 uploadProfileImage 사용
    const handleProfileUpdate = async () => {
        // 비밀번호 확인
        if (profileForm.password && profileForm.password !== profileForm.confirmPassword) {
            toast({
                title: '비밀번호가 일치하지 않습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            // 프로필 정보 업데이트
            const updateData: ProfileUpdateData = {
                nickname: profileForm.nickname,
                password: profileForm.password,
                userRole: profileForm.role as 'ROLE_CLIENT' | 'ROLE_FREELANCER'
            };

            await updateProfile(updateData);

            // 이미지가 변경된 경우 이미지 업로드
            if (isImageChanged && imageFile) {
                await uploadProfileImage(imageFile);
                setIsImageChanged(false);
                setImageFile(null);
            }

            onProfileModalClose();
        } catch (error) {
            console.error('프로필 업데이트 실패:', error);
        }
    };

    // 이력서 Bio 변경 핸들러
    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setResume({
            ...resume,
            bio: e.target.value
        });
    };

    // 이력서 스킬 변경 핸들러
    const handleSkillsChange = (newSkills: string[]): void => {
        setResume({
            ...resume,
            skills: newSkills
        });
    };

    // 포트폴리오 폼 변경 핸들러
    const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target;
        setResume({
            ...resume,
            newPortfolio: {
                ...resume.newPortfolio,
                [name]: value
            }
        });
    };

    // 포트폴리오 태그 추가 핸들러
    const handleAddPortfolioTag = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim() !== '') {
            e.preventDefault();
            const newTag = (e.target as HTMLInputElement).value.trim();
            if (!resume.newPortfolio.tags.includes(newTag)) {
                setResume({
                    ...resume,
                    newPortfolio: {
                        ...resume.newPortfolio,
                        tags: [...resume.newPortfolio.tags, newTag]
                    }
                });
                (e.target as HTMLInputElement).value = '';
            }
        }
    };

    // 포트폴리오 태그 삭제 핸들러
    const handleRemovePortfolioTag = (tagToRemove: string): void => {
        setResume({
            ...resume,
            newPortfolio: {
                ...resume.newPortfolio,
                tags: resume.newPortfolio.tags.filter(tag => tag !== tagToRemove)
            }
        });
    };

    // 포트폴리오 추가 핸들러
    const handleAddPortfolio = async (): Promise<void> => {
        const {title, description, pdfFile, link, tags} = resume.newPortfolio;

        if (!title || !description || !pdfFile) {
            toast({
                title: '필수 정보를 모두 입력해주세요.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            // 포트폴리오 PDF 파일 업로드 API 호출
            const formData = new FormData();
            if (pdfFile instanceof File) {
                formData.append('file', pdfFile);
                formData.append('title', title);
                formData.append('description', description);
                formData.append('link', link || '');
                tags.forEach(tag => formData.append('tags', tag));

                const response = await api.post('/api/v1/portfolio', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                });

                // 응답에서 새 포트폴리오 정보 가져오기
                const newPortfolio = response.data;

                // 포트폴리오 목록에 추가
                setResume({
                    ...resume,
                    portfolios: [...resume.portfolios, newPortfolio],
                    newPortfolio: {
                        title: '',
                        description: '',
                        pdfFile: null,
                        link: '',
                        tags: []
                    }
                });

                // 모달 닫기
                onPortfolioModalClose();

                // 성공 메시지 표시
                toast({
                    title: '포트폴리오가 추가되었습니다.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                throw new Error('유효한 PDF 파일이 아닙니다.');
            }
        } catch (error) {
            console.error('포트폴리오 추가 오류:', error);
            toast({
                title: '포트폴리오 추가에 실패했습니다.',
                description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // 포트폴리오 삭제 핸들러
    const handleDeletePortfolio = async (id: number): Promise<void> => {
        try {
            // 포트폴리오 삭제 API 호출
            await api.delete(`/api/v1/portfolio/${id}`, {
                withCredentials: true
            });

            // 포트폴리오 목록에서 제거
            setResume({
                ...resume,
                portfolios: resume.portfolios.filter(portfolio => portfolio.id !== id)
            });

            // 성공 메시지 표시
            toast({
                title: '포트폴리오가 삭제되었습니다.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('포트폴리오 삭제 오류:', error);
            toast({
                title: '포트폴리오 삭제에 실패했습니다.',
                description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box bg="gray.50" minH="100vh">
            <Header/>

            <Container maxW="container.xl" py={8}>
                {/* 프로필 요약 - ProfileContext의 profile 데이터 사용 */}
                <ProfileSummary
                    user={profile}
                    profileImage={profileForm.profileImage}
                    skills={resume.skills}
                    onEditClick={onProfileModalOpen}
                />

                {/* 탭 네비게이션 */}
                <Tabs
                    isLazy
                    colorScheme="blue"
                    index={tabIndex}
                    onChange={handleTabChange}
                    variant="enclosed"
                >
                    <TabList>
                        <Tab><Icon as={FaUser} mr={2}/> 프로필</Tab>
                        <Tab><Icon as={FaClipboardList}
                                   mr={2}/> {profile?.userRole === 'ROLE_CLIENT' ? '내 프로젝트' : '프로젝트 & 견적'}</Tab>
                        <Tab><Icon as={FaComments} mr={2}/> 메시지</Tab>
                        <Tab><Icon as={FaCreditCard} mr={2}/> 결제 & 정산</Tab>
                        <Tab><Icon as={FaFileAlt} mr={2}/> 이력서</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <ProfileTab
                                user={profile}
                                resume={resume}
                                onBioChange={handleBioChange}
                            />
                        </TabPanel>
                        <TabPanel>
                            <ProjectsTab
                                user={profile}
                                projects={myProjects}
                                router={router}
                            />
                        </TabPanel>
                        <TabPanel>
                            <MessagesTab messages={messages}/>
                        </TabPanel>
                        <TabPanel>
                            <PaymentsTab payments={payments} estimates={estimates}/>
                        </TabPanel>
                        <TabPanel>
                            <ResumeTab
                                resume={resume}
                                onBioChange={handleBioChange}
                                onSkillsChange={handleSkillsChange}
                                onPortfolioModalOpen={onPortfolioModalOpen}
                                onDeletePortfolio={handleDeletePortfolio}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>

            {/* 모달 */}
            <ProfileEditModal
                isOpen={isProfileModalOpen}
                onClose={onProfileModalClose}
                profileForm={profileForm}
                onProfileChange={handleProfileChange}
                onProfileUpdate={handleProfileUpdate}
                onProfileImageChange={handleProfileImageChange}
                isLoading={isLoading}
            />

            <PortfolioAddModal
                isOpen={isPortfolioModalOpen}
                onClose={onPortfolioModalClose}
                portfolio={resume.newPortfolio}
                onPortfolioChange={handlePortfolioChange}
                onPDFChange={handlePDFChange}
                onAddPortfolio={handleAddPortfolio}
                onAddPortfolioTag={handleAddPortfolioTag}
                onRemovePortfolioTag={handleRemovePortfolioTag}
            />

            <Footer/>
        </Box>
    );
};

export default MyPage;