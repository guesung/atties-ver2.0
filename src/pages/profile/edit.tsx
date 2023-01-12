import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import DoubleCheckButton from '@components/common/DoubleCheckButton';
import authApi from '@apis/auth/authApi';
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@features/hooks';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { isUser } from '@utils/isUser';
import { useQuery } from 'react-query';
import Loader from '@components/common/Loader';
import { Member } from 'types/user';
import useCheckDuplicate from '@hooks/queries/useCheckDuplicate';
interface EditForm {
  nickname: string;
  email: string;
  education: string;
  history: string;
  description: string;
  instagram: string;
  behance: string;
  image?: FileList;
}

export default function Edit() {
  const [nickNameValidation, setNickNameValidation] = useState<boolean>(false);
  const [emailValidation, setEmailValidation] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    setValue,
  } = useForm<EditForm>();

  const { isLoading, data: profileInfo } = useQuery<Member>(
    'user',
    () => authApi.getUserProfile(),
    {
      onSuccess: (res: any) => {
        setValue('nickname', res.data.nickname);
        setValue('email', res.data.email);
      },
      onError: (err) => {
        console.log(err);
      },
    },
  );

  const nickname = watch('nickname');
  const email = watch('email');

  useEffect(() => {
    setEmailValidation(false);
    clearErrors('email');
  }, [email]);
  useEffect(() => {
    setNickNameValidation(false);
    clearErrors('nickname');
  }, [nickname]);

  const handleDoubleCheckNickName = async () => {
    const data = await authApi.getCheckNickname(nickname);
    if (data.status === 409) {
      setError('nickname', {
        type: 'nickname duplicate',
        message: '중복되는 닉네임 입니다.',
      });
      return;
    } else {
      setNickNameValidation(true);
      clearErrors('nickname');
    }
  };

  const handleDoubleCheckEmail = async () => {
    const response = await authApi.getCheckEmail(email);
    if (response.status === 409) {
      setError('email', {
        type: 'email duplicate',
        message: '이미 가입된 이메일 입니다.',
      });
      return;
    } else {
      setEmailValidation(true);
      clearErrors('email');
    }
  };

  const router = useRouter();
  const onLeftButton = () => {
    router.push('/profile');
  };

  const [imageFile, setImageFile] = useState('');

  const profileImage = watch('image');
  useEffect(() => {
    if (profileImage && profileImage.length > 0) {
      const file = profileImage[0];
      setImageFile(URL.createObjectURL(file));
    }
  }, [profileImage]);

  const onSubmit = async (form: EditForm) => {
    if (!nickNameValidation) {
      setError('nickname', {
        type: 'need nickname duplicate',
        message: '닉네임 중복체크를 해주세요',
      });
      return;
    }
    if (!emailValidation) {
      setError('email', {
        type: 'need email duplicate',
        message: '이메일 중복체크를 해주세요',
      });
    }
    const formData = new FormData();
    formData.append('email', watch('email'));
    formData.append('nickname', watch('nickname'));
    formData.append('image', watch('image'));
    const response = await authApi.patchUserInfo(formData);
    console.log(response);
  };

  if (isLoading) return <Loader />;

  return (
    <Layout>
      <Navigate
        right_message="완료"
        left_message={
          <Image
            alt="X"
            src="/svg/icons/icon_close.svg"
            width="18"
            height="0"
          />
        }
        handleLeftButton={onLeftButton}
        handleRightButton={handleSubmit(onSubmit)}
      />
      <label className="flex justify-center h-[150px]" htmlFor="profileImage">
        {imageFile ? (
          <Image
            src={imageFile}
            width="120"
            height="0"
            className="rounded-full w-[120px] h-[120px]"
            alt="profile"
          />
        ) : (
          <div className=" flex justify-center items-center w-[99px] h-[99px] rounded-full border-2 border-[#999999] bg-[#FFFFFF] relative">
            <Image
              src="/svg/icons/icon_avatar.svg"
              width="60"
              height="0"
              alt="profile"
            />
            <div className="w-[26px] h-[26px] rounded-full bg-[#575757] flex justify-center items-center absolute right-0 bottom-0">
              <Image
                src="/svg/icons/icon_camera.svg"
                width="15"
                height="0"
                alt="profile"
                className=""
              />
            </div>
          </div>
        )}
      </label>
      <input
        type="file"
        accept="image/*"
        id="profileImage"
        className="hidden"
        {...register('image')}
      />

      <section className="relative">
        <Input
          type="text"
          label="닉네임"
          placeholder="닉네임을 입력해 주세요."
          defaultValue={profileInfo?.nickname}
          $error={errors.nickname ? true : false}
          register={register('nickname', {
            required: true,
            pattern: {
              value: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/i,
              message: '닉네임을 형식에 맞게 입력해주세요.',
            },
          })}
        />
        <DoubleCheckButton
          $valid={!nickNameValidation}
          onClick={handleDoubleCheckNickName}
          text={nickNameValidation ? '사용가능' : '중복확인'}
        />
        {errors.nickname ? (
          <ErrorMessage message={errors.nickname.message} />
        ) : (
          ''
        )}
      </section>
      <section className="relative">
        <Input
          type="text"
          label="이메일"
          defaultValue={profileInfo?.email}
          placeholder="이메일을 입력해 주세요."
          $error={errors.email ? true : false}
          register={register('email', {
            required: true,
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: '이메일을 형식에 맞게 입력해주세요.',
            },
          })}
        />
        <DoubleCheckButton
          $valid={!emailValidation}
          onClick={handleDoubleCheckEmail}
          text={emailValidation ? '사용가능' : '중복확인'}
        />
        {errors.email ? <ErrorMessage message={errors.email.message} /> : ''}
      </section>

      {!isUser && (
        <section>
          <Input
            type="text"
            label="학력"
            defaultValue={data?.education}
            placeholder="학교와 학위, 전공 등을 입력해 주세요."
            value={education}
            $error={errors.education ? true : false}
            register={register('education', {
              required: true,
            })}
          />
          {errors.education && (
            <ErrorMessage message={errors.education.message} />
          )}

          <Input
            type="text"
            label="이력"
            placeholder="이력을 작성해 주세요."
            value={history}
            $error={errors.history ? true : false}
            register={register('history', {
              required: true,
            })}
          />
          {errors.history && <ErrorMessage message={errors.history.message} />}
          <Input
            type="text"
            label="작가소개"
            placeholder="소개를 작성해 주세요."
            value={description}
            $error={errors.description ? true : false}
            register={register('description', {
              required: true,
            })}
          />
          {errors.description && (
            <ErrorMessage message={errors.description.message} />
          )}

          <article className="flex items-center mt-3">
            <label htmlFor="instagram">
              <Image
                src="/svg/icons/icon_instagram_gray.svg"
                width="22"
                height="10"
                className="mr-1"
                alt="instagram"
              />
            </label>
            <input
              placeholder="인스타그램 추가하기"
              value={instagram}
              {...register('instagram')}
              id="instagram"
              className="h-[30px] placeholder:text-[#999] text-12 indent-1 "
            />

            <label htmlFor="behance">
              <Image
                src="/svg/icons/icon_behance_gray.svg"
                width="20"
                height="0"
                className="mr-1"
                alt="behance"
              />
            </label>
            <input
              placeholder="비헨스 추가하기"
              value={behance}
              {...register('behance')}
              id="behance"
              className="h-[30px] placeholder:text-[#999] text-12 indent-1"
            />
          </article>
        </section>
      )}
    </Layout>
  );
}
