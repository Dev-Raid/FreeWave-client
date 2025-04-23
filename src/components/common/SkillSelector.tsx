'use client';

import React, {useState, useRef, useEffect} from 'react';
import {
    Box, Input, InputGroup, InputRightElement, Icon, Flex, Text,
    Checkbox, Button, Tag, IconButton, VStack, Divider,
    useOutsideClick, Spinner, TagCloseButton, TagLabel,
} from '@chakra-ui/react';
import {FaSearch, FaTrash} from 'react-icons/fa';

// 타입 정의
interface SkillSelectorProps {
    selectedSkills: string[];
    onSkillsChange: (skills: string[]) => void;
    onDeleteSkill?: (skill: string) => void;
    isLoading?: boolean;
}

// TechStack Enum을 프론트엔드에서 사용할 수 있는 형태로 변환
interface TechStackItem {
    name: string;        // Enum 이름 (JAVA, REACT 등)
    displayName: string; // 화면에 표시될 이름 (Java, React.js 등)
}

// 백엔드의 TechStack Enum을 기반으로 한 기술 스택 목록
const techStackList: TechStackItem[] = [
    // 프로그래밍 언어
    {name: "JAVA", displayName: "Java"},
    {name: "PYTHON", displayName: "Python"},
    {name: "JAVASCRIPT", displayName: "JavaScript"},
    {name: "TYPESCRIPT", displayName: "TypeScript"},
    {name: "KOTLIN", displayName: "Kotlin"},
    {name: "SWIFT", displayName: "Swift"},
    {name: "GO", displayName: "Go"},
    {name: "RUST", displayName: "Rust"},
    {name: "C", displayName: "C"},
    {name: "CPP", displayName: "C++"},
    {name: "CSHARP", displayName: "C#"},
    {name: "PHP", displayName: "PHP"},
    {name: "RUBY", displayName: "Ruby"},
    {name: "SCALA", displayName: "Scala"},
    {name: "DART", displayName: "Dart"},
    {name: "HASKELL", displayName: "Haskell"},
    {name: "PERL", displayName: "Perl"},
    {name: "R", displayName: "R"},
    {name: "GROOVY", displayName: "Groovy"},
    {name: "CLOJURE", displayName: "Clojure"},

    // 프론트엔드 프레임워크 및 라이브러리
    {name: "REACT", displayName: "React.js"},
    {name: "ANGULAR", displayName: "Angular"},
    {name: "VUE", displayName: "Vue.js"},
    {name: "NEXT", displayName: "Next.js"},
    {name: "SVELTE", displayName: "Svelte"},
    {name: "JQUERY", displayName: "jQuery"},
    {name: "BACKBONE", displayName: "Backbone.js"},
    {name: "EMBER", displayName: "Ember.js"},
    {name: "PREACT", displayName: "Preact"},
    {name: "SOLID_JS", displayName: "SolidJS"},
    {name: "GATSBY", displayName: "Gatsby.js"},
    {name: "NUXT", displayName: "Nuxt.js"},
    {name: "REMIX", displayName: "Remix"},
    {name: "ASTRO", displayName: "Astro"},

    // 백엔드 프레임워크 및 라이브러리
    {name: "SPRING", displayName: "Spring Framework"},
    {name: "SPRING_BOOT", displayName: "Spring Boot"},
    {name: "DJANGO", displayName: "Django"},
    {name: "FLASK", displayName: "Flask"},
    {name: "EXPRESS", displayName: "Express.js"},
    {name: "LARAVEL", displayName: "Laravel"},
    {name: "DOTNET", displayName: ".NET"},
    {name: "RUBY_ON_RAILS", displayName: "Ruby on Rails"},
    {name: "NESTJS", displayName: "NestJS"},
    {name: "FASTAPI", displayName: "FastAPI"},
    {name: "PHOENIX", displayName: "Phoenix"},
    {name: "SYMFONY", displayName: "Symfony"},
    {name: "ASPNET", displayName: "ASP.NET"},
    {name: "STRAPI", displayName: "Strapi"},

    // CSS 프레임워크 및 도구
    {name: "TAILWIND", displayName: "Tailwind CSS"},
    {name: "BOOTSTRAP", displayName: "Bootstrap"},
    {name: "SASS", displayName: "Sass"},
    {name: "LESS", displayName: "Less"},
    {name: "STYLED_COMPONENTS", displayName: "Styled Components"},
    {name: "EMOTION", displayName: "Emotion"},
    {name: "BULMA", displayName: "Bulma"},
    {name: "FOUNDATION", displayName: "Foundation"},
    {name: "MATERIALIZE", displayName: "Materialize CSS"},
    {name: "CHAKRA_UI", displayName: "Chakra UI"},
    {name: "MATERIAL_UI", displayName: "Material UI"},
    {name: "ANT_DESIGN", displayName: "Ant Design"},
    {name: "SEMANTIC_UI", displayName: "Semantic UI"},

    // UI/UX 디자인 도구
    {name: "FIGMA", displayName: "Figma"},
    {name: "SKETCH", displayName: "Sketch"},
    {name: "ADOBE_XD", displayName: "Adobe XD"},
    {name: "INVISION", displayName: "InVision"},
    {name: "ZEPLIN", displayName: "Zeplin"},
    {name: "ADOBE_ILLUSTRATOR", displayName: "Adobe Illustrator"},
    {name: "ADOBE_PHOTOSHOP", displayName: "Adobe Photoshop"},
    {name: "PROTOPIE", displayName: "ProtoPie"},
    {name: "AXURE", displayName: "Axure RP"},
    {name: "FRAMER", displayName: "Framer"},
    {name: "BALSAMIQ", displayName: "Balsamiq"},
    {name: "PRINCIPLE", displayName: "Principle"},
    {name: "ADOBE_AFTER_EFFECTS", displayName: "Adobe After Effects"},
    {name: "UIZARD", displayName: "Uizard"},
    {name: "KHROMA", displayName: "Khroma"},
    {name: "ATTENTION_INSIGHT", displayName: "Attention Insight"},
    {name: "ADOBE_FIREFLY", displayName: "Adobe Firefly"},
    {name: "VISILY", displayName: "Visily"},

    // 데이터베이스
    {name: "MYSQL", displayName: "MySQL"},
    {name: "POSTGRESQL", displayName: "PostgreSQL"},
    {name: "ORACLE", displayName: "Oracle"},
    {name: "MONGODB", displayName: "MongoDB"},
    {name: "REDIS", displayName: "Redis"},
    {name: "ELASTICSEARCH", displayName: "Elasticsearch"},
    {name: "MARIADB", displayName: "MariaDB"},
    {name: "MSSQL", displayName: "Microsoft SQL Server"},
    {name: "DYNAMODB", displayName: "Amazon DynamoDB"},
    {name: "CASSANDRA", displayName: "Apache Cassandra"},
    {name: "COUCHDB", displayName: "CouchDB"},
    {name: "NEO4J", displayName: "Neo4j"},
    {name: "FIREBASE_FIRESTORE", displayName: "Firebase Firestore"},
    {name: "SQLITE", displayName: "SQLite"},
    {name: "INFLUXDB", displayName: "InfluxDB"},

    // 인프라 및 DevOps
    {name: "DOCKER", displayName: "Docker"},
    {name: "KUBERNETES", displayName: "Kubernetes"},
    {name: "JENKINS", displayName: "Jenkins"},
    {name: "GITHUB_ACTIONS", displayName: "GitHub Actions"},
    {name: "TERRAFORM", displayName: "Terraform"},
    {name: "ANSIBLE", displayName: "Ansible"},
    {name: "GITLAB_CI", displayName: "GitLab CI/CD"},
    {name: "CIRCLE_CI", displayName: "Circle CI"},
    {name: "TRAVIS_CI", displayName: "Travis CI"},
    {name: "PROMETHEUS", displayName: "Prometheus"},
    {name: "GRAFANA", displayName: "Grafana"},
    {name: "NGINX", displayName: "NGINX"},
    {name: "APACHE", displayName: "Apache HTTP Server"},
    {name: "PUPPET", displayName: "Puppet"},
    {name: "CHEF", displayName: "Chef"},

    // 클라우드
    {name: "AWS", displayName: "Amazon Web Services"},
    {name: "AZURE", displayName: "Microsoft Azure"},
    {name: "GCP", displayName: "Google Cloud Platform"},
    {name: "HEROKU", displayName: "Heroku"},
    {name: "DIGITAL_OCEAN", displayName: "Digital Ocean"},
    {name: "IBM_CLOUD", displayName: "IBM Cloud"},
    {name: "ALIBABA_CLOUD", displayName: "Alibaba Cloud"},
    {name: "ORACLE_CLOUD", displayName: "Oracle Cloud"},
    {name: "VERCEL", displayName: "Vercel"},
    {name: "NETLIFY", displayName: "Netlify"},
    {name: "CLOUDFLARE", displayName: "Cloudflare"},
    {name: "LINODE", displayName: "Linode"},

    // 모바일
    {name: "ANDROID", displayName: "Android"},
    {name: "IOS", displayName: "iOS"},
    {name: "REACT_NATIVE", displayName: "React Native"},
    {name: "FLUTTER", displayName: "Flutter"},
    {name: "XAMARIN", displayName: "Xamarin"},
    {name: "IONIC", displayName: "Ionic"},
    {name: "CORDOVA", displayName: "Apache Cordova"},
    {name: "KOTLIN_MULTIPLATFORM", displayName: "Kotlin Multiplatform"},
    {name: "SWIFT_UI", displayName: "SwiftUI"},
    {name: "JETPACK_COMPOSE", displayName: "Jetpack Compose"},

    // 테스트 도구
    {name: "JEST", displayName: "Jest"},
    {name: "MOCHA", displayName: "Mocha"},
    {name: "CYPRESS", displayName: "Cypress"},
    {name: "SELENIUM", displayName: "Selenium"},
    {name: "JUNIT", displayName: "JUnit"},
    {name: "TESTNG", displayName: "TestNG"},
    {name: "PUPPETEER", displayName: "Puppeteer"},
    {name: "JASMINE", displayName: "Jasmine"},
    {name: "ENZYME", displayName: "Enzyme"},
    {name: "TESTING_LIBRARY", displayName: "Testing Library"},
    {name: "PLAYWRIGHT", displayName: "Playwright"},

    // 상태 관리
    {name: "REDUX", displayName: "Redux"},
    {name: "MOBX", displayName: "MobX"},
    {name: "RECOIL", displayName: "Recoil"},
    {name: "ZUSTAND", displayName: "Zustand"},
    {name: "JOTAI", displayName: "Jotai"},
    {name: "VUEX", displayName: "Vuex"},
    {name: "PINIA", displayName: "Pinia"},
    {name: "CONTEXT_API", displayName: "React Context API"},
    {name: "NGXS", displayName: "NGXS"},

    // 웹 개발 도구
    {name: "WEBPACK", displayName: "Webpack"},
    {name: "VITE", displayName: "Vite"},
    {name: "PARCEL", displayName: "Parcel"},
    {name: "ROLLUP", displayName: "Rollup"},
    {name: "BABEL", displayName: "Babel"},
    {name: "ESLINT", displayName: "ESLint"},
    {name: "PRETTIER", displayName: "Prettier"},
    {name: "STORYBOOK", displayName: "Storybook"},
    {name: "CHROME_DEVTOOLS", displayName: "Chrome DevTools"},
    {name: "POSTMAN", displayName: "Postman"},
    {name: "VS_CODE", displayName: "Visual Studio Code"},
    {name: "WEBSTORM", displayName: "WebStorm"},

    // 3D 및 그래픽
    {name: "THREE_JS", displayName: "Three.js"},
    {name: "WEBGL", displayName: "WebGL"},
    {name: "UNITY", displayName: "Unity"},
    {name: "UNREAL_ENGINE", displayName: "Unreal Engine"},
    {name: "BLENDER", displayName: "Blender"},
    {name: "D3", displayName: "D3.js"},
    {name: "CANVAS_API", displayName: "Canvas API"},
    {name: "SVG", displayName: "SVG"},
    {name: "BABYLON_JS", displayName: "Babylon.js"},
    {name: "PIXIJS", displayName: "PixiJS"},

    // AR/VR
    {name: "ARKIT", displayName: "ARKit"},
    {name: "ARCORE", displayName: "ARCore"},
    {name: "VUFORIA", displayName: "Vuforia"},
    {name: "OCULUS_SDK", displayName: "Oculus SDK"},
    {name: "AFRAME", displayName: "A-Frame"},
    {name: "WEBXR", displayName: "WebXR"},

    // 기타
    {name: "GIT", displayName: "Git"},
    {name: "GRAPHQL", displayName: "GraphQL"},
    {name: "KAFKA", displayName: "Apache Kafka"},
    {name: "HADOOP", displayName: "Apache Hadoop"},
    {name: "SPARK", displayName: "Apache Spark"},
    {name: "WEBSOCKET", displayName: "WebSocket"},
    {name: "REST_API", displayName: "REST API"},
    {name: "GRPC", displayName: "gRPC"},
    {name: "OAUTH", displayName: "OAuth"},
    {name: "JWT", displayName: "JSON Web Token"},
    {name: "MICRO_FRONTENDS", displayName: "Micro Frontends"},
    {name: "HEADLESS_CMS", displayName: "Headless CMS"},
    {name: "PWA", displayName: "Progressive Web App"},
    {name: "WEB_COMPONENTS", displayName: "Web Components"},
    {name: "WEBASSEMBLY", displayName: "WebAssembly"},
    {name: "SERVERLESS", displayName: "Serverless"},
    {name: "JAMSTACK", displayName: "JAMstack"},
    {name: "OPENAI_API", displayName: "OpenAI API"},
    {name: "WEB3", displayName: "Web3.js"},
    {name: "BLOCKCHAIN", displayName: "Blockchain"}
];

const SkillSelector: React.FC<SkillSelectorProps> = ({
                                                         selectedSkills,
                                                         onSkillsChange,
                                                         onDeleteSkill,
                                                         isLoading = false
                                                     }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 감지
    useOutsideClick({
        ref: dropdownRef as React.RefObject<HTMLElement>,
        handler: () => {
            if (isOpen) setIsOpen(false);
        },
    });

    // 검색어에 따라 필터링된 기술 스택 목록
    const filteredTechStacks = searchTerm.trim() === ''
        ? techStackList
        : techStackList.filter(tech =>
            tech.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tech.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    // 화면 표시용 이름으로 변환
    const getDisplayNameFromEnumName = (enumName: string): string | undefined => {
        const tech = techStackList.find(t => t.name === enumName);
        return tech?.displayName;
    };

    // 기술 선택 토글
    const handleSkillToggle = (tech: TechStackItem): void => {
        const enumName = tech.name;
        if (selectedSkills.includes(enumName)) {
            onSkillsChange(selectedSkills.filter(s => s !== enumName));
        } else {
            onSkillsChange([...selectedSkills, enumName]);
        }
        // 토글 후에도 입력 필드에 포커스 유지
        inputRef.current?.focus();
    };

    // 입력 변경 핸들러
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
        if (!isOpen) setIsOpen(true);
    };

    // 검색 입력 필드 포커스 핸들러
    const handleInputFocus = (): void => {
        setIsOpen(true);
    };

    // 검색 결과에서 새 기술 추가
    const handleAddSearchTerm = (): void => {
        if (searchTerm.trim() === '') return;

        // 검색어와 일치하는 기술 찾기
        const matchedTech = techStackList.find(
            tech => tech.displayName.toLowerCase() === searchTerm.trim().toLowerCase()
        );

        if (matchedTech) {
            // Enum에 있는 기술이면 해당 Enum 이름으로 추가
            if (!selectedSkills.includes(matchedTech.name)) {
                onSkillsChange([...selectedSkills, matchedTech.name]);
            }
        } else {
            // Enum에 없는 기술은 추가하지 않음 (백엔드에서 처리 불가)
            alert('지원하지 않는 기술입니다. 목록에서 선택해주세요.');
        }

        setSearchTerm('');
        inputRef.current?.focus();
    };

    // 키보드 이벤트 처리
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    // 개별 기술 스택 삭제 핸들러
    const handleDeleteSkill = (skill: string) => {
        if (onDeleteSkill) {
            onDeleteSkill(skill);
        } else {
            // onDeleteSkill이 제공되지 않은 경우 기본 동작
            const newSkills = selectedSkills.filter(s => s !== skill);
            onSkillsChange(newSkills);
        }
    };

    // 전체 기술 스택 삭제 핸들러
    const handleClearAllSkills = () => {
        onSkillsChange([]);
    };

    return (
        <Box position="relative" ref={dropdownRef}>
            <InputGroup>
                <Input
                    ref={inputRef}
                    placeholder="기술을 검색하세요"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                    isDisabled={isLoading}
                />
                <InputRightElement>
                    {isLoading ? (
                        <Spinner size="sm" color="blue.500"/>
                    ) : (
                        <Icon as={FaSearch} color="gray.500"/>
                    )}
                </InputRightElement>
            </InputGroup>

            {/* 선택된 기술 스택 관리 섹션 */}
            {selectedSkills.length > 0 && (
                <Box mt={4}>
                    <Flex justifyContent="space-between" alignItems="center" width="100%" mb={2}>
                        <Text fontWeight="bold">선택된 기술 스택 ({selectedSkills.length})</Text>
                    </Flex>
                    <Flex flexWrap="wrap" mt={2}>
                        {selectedSkills.map((skillName, index) => {
                            const displayName = getDisplayNameFromEnumName(skillName) || skillName;
                            return (
                                <Tag
                                    key={index}
                                    size="md"
                                    borderRadius="full"
                                    variant="solid"
                                    colorScheme="blue"
                                    m={1}
                                >
                                    <TagLabel>{displayName}</TagLabel>
                                    <TagCloseButton
                                        onClick={() => handleDeleteSkill(skillName)}
                                        isDisabled={isLoading}
                                    />
                                </Tag>
                            );
                        })}
                    </Flex>
                </Box>
            )}

            {isOpen && !isLoading && (
                <Box
                    position="absolute"
                    top="100%"
                    left={0}
                    right={0}
                    mt={2}
                    bg="white"
                    borderRadius="md"
                    boxShadow="md"
                    maxH="300px"
                    overflowY="auto"
                    zIndex={10}
                    border="1px solid"
                    borderColor="gray.200"
                >
                    <VStack align="stretch" spacing={0} divider={<Divider/>}>
                        {filteredTechStacks.length > 0 ? (
                            filteredTechStacks.map((tech) => (
                                <Flex
                                    key={tech.name}
                                    p={2}
                                    align="center"
                                    _hover={{bg: "gray.50"}}
                                    cursor="pointer"
                                    onClick={() => handleSkillToggle(tech)}
                                >
                                    <Checkbox
                                        isChecked={selectedSkills.includes(tech.name)}
                                        mr={2}
                                        onChange={() => {
                                        }}
                                    />
                                    <Text>{tech.displayName}</Text>
                                </Flex>
                            ))
                        ) : (
                            <Box p={2}>
                                <Text>검색 결과가 없습니다.</Text>
                                {searchTerm.trim() !== '' && (
                                    <Button
                                        size="sm"
                                        mt={2}
                                        colorScheme="blue"
                                        onClick={handleAddSearchTerm}
                                    >
                                        {`"${searchTerm}" 추가하기`}
                                    </Button>
                                )}
                            </Box>
                        )}
                    </VStack>
                </Box>
            )}
        </Box>
    );
};

export default SkillSelector;
