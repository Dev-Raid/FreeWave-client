'use client';

import React, {useRef} from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Button, FormControl, FormLabel, Input, VStack, Avatar, Flex, Select, InputGroup,
    InputRightElement, FormHelperText
} from '@chakra-ui/react';
import {FaUpload, FaEye, FaEyeSlash} from 'react-icons/fa';

interface ProfileForm {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
    role: string;
    profileImage: string;
}

interface ProfileEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    profileForm: ProfileForm;
    onProfileChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onProfileUpdate: () => void;
    onProfileImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading?: boolean;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
                                                               isOpen,
                                                               onClose,
                                                               profileForm,
                                                               onProfileChange,
                                                               onProfileUpdate,
                                                               onProfileImageChange,
                                                               isLoading = false
                                                           }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUploadClick = (): void => {
        fileInputRef.current?.click();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>프로필 수정</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>
                    <VStack spacing={4} align="stretch">
                        {/* 프로필 이미지 */}
                        <FormControl>
                            <FormLabel>프로필 이미지</FormLabel>
                            <Flex direction="column" align="center" gap={4}>
                                <Avatar
                                    size="2xl"
                                    name={profileForm.nickname}
                                    src={profileForm.profileImage}
                                />
                                <Button
                                    leftIcon={<FaUpload/>}
                                    onClick={handleImageUploadClick}
                                >
                                    이미지 업로드
                                </Button>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    display="none"
                                    onChange={onProfileImageChange}
                                />
                            </Flex>
                        </FormControl>

                        {/* 이메일 */}
                        <FormControl>
                            <FormLabel>이메일</FormLabel>
                            <Input
                                name="email"
                                value={profileForm.email}
                                onChange={onProfileChange}
                                isReadOnly
                            />
                            <FormHelperText>이메일은 변경할 수 없습니다.</FormHelperText>
                        </FormControl>

                        {/* 별명 */}
                        <FormControl>
                            <FormLabel>별명</FormLabel>
                            <Input
                                name="nickname"
                                value={profileForm.nickname}
                                onChange={onProfileChange}
                                placeholder="별명을 입력하세요"
                            />
                        </FormControl>

                        {/* 비밀번호 */}
                        <FormControl>
                            <FormLabel>비밀번호</FormLabel>
                            <InputGroup>
                                <Input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={profileForm.password}
                                    onChange={onProfileChange}
                                    placeholder="변경할 비밀번호를 입력하세요"
                                />
                                <InputRightElement width="4.5rem">
                                    <Button
                                        h="1.75rem"
                                        size="sm"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormHelperText>변경하지 않으려면 비워두세요</FormHelperText>
                        </FormControl>

                        {/* 비밀번호 확인 */}
                        <FormControl>
                            <FormLabel>비밀번호 확인</FormLabel>
                            <InputGroup>
                                <Input
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={profileForm.confirmPassword}
                                    onChange={onProfileChange}
                                    placeholder="비밀번호를 다시 입력하세요"
                                />
                                <InputRightElement width="4.5rem">
                                    <Button
                                        h="1.75rem"
                                        size="sm"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        {/* 유저 역할 */}
                        <FormControl>
                            <FormLabel>유저 역할</FormLabel>
                            <Select
                                name="role"
                                value={profileForm.role}
                                onChange={onProfileChange}
                            >
                                <option value="ROLE_CLIENT">클라이언트</option>
                                <option value="ROLE_FREELANCER">프리랜서</option>
                            </Select>
                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        onClick={onProfileUpdate}
                        isLoading={isLoading} // isLoading 속성 사용
                        loadingText="저장 중"
                    >
                        저장
                    </Button>
                    <Button variant="ghost" onClick={onClose} ml={3}>취소</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ProfileEditModal;
