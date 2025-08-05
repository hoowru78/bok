import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility, VoiceGuide } from '../hooks/useAccessibility';
import { ArrowRight, ArrowLeft, User, Calendar, MapPin, AlertCircle } from 'lucide-react';

function UserInfoPage() {
  const navigate = useNavigate();
  const { speak } = useAccessibility();
  
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    region: '',
    district: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 지역 데이터
  const regions = [
    { code: '11', name: '서울특별시' },
    { code: '26', name: '부산광역시' },
    { code: '27', name: '대구광역시' },
    { code: '28', name: '인천광역시' },
    { code: '29', name: '광주광역시' },
    { code: '30', name: '대전광역시' },
    { code: '31', name: '울산광역시' },
    { code: '36', name: '세종특별자치시' },
    { code: '41', name: '경기도' },
    { code: '42', name: '강원도' },
    { code: '43', name: '충청북도' },
    { code: '44', name: '충청남도' },
    { code: '45', name: '전라북도' },
    { code: '46', name: '전라남도' },
    { code: '47', name: '경상북도' },
    { code: '48', name: '경상남도' },
    { code: '50', name: '제주특별자치도' },
  ];

  const districts = {
    '11': ['종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'],
    '26': ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'],
    // 다른 지역들도 추가 가능
  };

  useEffect(() => {
    speak('사용자 정보를 입력해주세요. 이름, 생년월일, 거주지 정보가 필요합니다.');
  }, [speak]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 에러 초기화
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // 지역 변경 시 시/군/구 초기화
    if (name === 'region') {
      setFormData(prev => ({
        ...prev,
        district: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 이름 검증
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '이름은 2글자 이상 입력해주세요.';
    }

    // 생년월일 검증
    if (!formData.birthDate) {
      newErrors.birthDate = '생년월일을 입력해주세요.';
    } else {
      const birthYear = new Date(formData.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;
      
      if (age < 65) {
        newErrors.birthDate = '만 65세 이상만 이용 가능한 서비스입니다.';
      } else if (age > 120) {
        newErrors.birthDate = '올바른 생년월일을 입력해주세요.';
      }
    }

    // 지역 검증
    if (!formData.region) {
      newErrors.region = '거주 지역을 선택해주세요.';
    }

    if (!formData.district) {
      newErrors.district = '시/군/구를 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      speak('입력 정보를 다시 확인해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 사용자 정보를 로컬 스토리지에 임시 저장
      const userInfo = {
        ...formData,
        regionName: regions.find(r => r.code === formData.region)?.name,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('welfare-user-info', JSON.stringify(userInfo));
      
      speak('정보가 저장되었습니다. 설문으로 이동합니다.');
      
      // 설문 페이지로 이동
      navigate('/survey/health');
      
    } catch (error) {
      console.error('Error saving user info:', error);
      speak('정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              기본 정보 입력
              <VoiceGuide text="기본 정보 입력" autoPlay />
            </h1>
            <p className="text-lg text-gray-600">
              맞춤 복지 추천을 위해 간단한 정보를 입력해주세요.
            </p>
          </div>

          {/* 진행률 표시 */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>1단계: 기본 정보</span>
              <span>1/4</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '25%' }}></div>
            </div>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이름 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                이름 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`input-field ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                placeholder="이름을 입력해주세요"
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <div id="name-error" className="mt-1 flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* 생년월일 */}
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                생년월일 *
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                max={new Date().toISOString().split('T')[0]}
                className={`input-field ${errors.birthDate ? 'border-red-500 focus:border-red-500' : ''}`}
                aria-describedby={errors.birthDate ? 'birth-error' : undefined}
              />
              {errors.birthDate && (
                <div id="birth-error" className="mt-1 flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.birthDate}
                </div>
              )}
            </div>

            {/* 거주 지역 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  시/도 *
                </label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className={`input-field ${errors.region ? 'border-red-500 focus:border-red-500' : ''}`}
                  aria-describedby={errors.region ? 'region-error' : undefined}
                >
                  <option value="">시/도를 선택해주세요</option>
                  {regions.map((region) => (
                    <option key={region.code} value={region.code}>
                      {region.name}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <div id="region-error" className="mt-1 flex items-center text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.region}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                  시/군/구 *
                </label>
                <select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  disabled={!formData.region}
                  className={`input-field ${errors.district ? 'border-red-500 focus:border-red-500' : ''} ${!formData.region ? 'bg-gray-100' : ''}`}
                  aria-describedby={errors.district ? 'district-error' : undefined}
                >
                  <option value="">시/군/구를 선택해주세요</option>
                  {formData.region && districts[formData.region]?.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <div id="district-error" className="mt-1 flex items-center text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.district}
                  </div>
                )}
              </div>
            </div>

            {/* 개인정보 안내 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-bold">i</span>
                  </div>
                </div>
                <div className="flex-1 text-sm text-blue-700">
                  <h4 className="font-medium mb-1">개인정보 처리 안내</h4>
                  <p>
                    입력하신 정보는 복지 추천을 위해서만 사용되며, 1년 후 자동으로 삭제됩니다. 
                    더 자세한 내용은 <a href="/privacy" className="underline hover:text-blue-800">개인정보 처리방침</a>을 참고해주세요.
                  </p>
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={handleGoBack}
                className="flex-1 btn-secondary flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                이전으로
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 btn-primary flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    저장 중...
                  </>
                ) : (
                  <>
                    다음 단계
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;