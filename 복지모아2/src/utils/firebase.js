// Firebase 설정 (향후 확장용)
// 현재는 로컬 스토리지를 사용하지만, 필요시 Firebase 연동 가능

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase 초기화 (필요시 활성화)
/*
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
*/

// 로컬 스토리지 기반 데이터 관리
export const localStorageService = {
  // 사용자 정보 저장
  saveUserInfo: (userInfo) => {
    try {
      const encryptedData = btoa(JSON.stringify(userInfo));
      localStorage.setItem('welfare-user-info', encryptedData);
      return true;
    } catch (error) {
      console.error('Error saving user info:', error);
      return false;
    }
  },

  // 사용자 정보 불러오기
  getUserInfo: () => {
    try {
      const encryptedData = localStorage.getItem('welfare-user-info');
      if (!encryptedData) return null;
      return JSON.parse(atob(encryptedData));
    } catch (error) {
      console.error('Error loading user info:', error);
      return null;
    }
  },

  // 설문 응답 저장
  saveSurveyResponses: (responses) => {
    try {
      const encryptedData = btoa(JSON.stringify(responses));
      localStorage.setItem('welfare-survey-responses', encryptedData);
      return true;
    } catch (error) {
      console.error('Error saving survey responses:', error);
      return false;
    }
  },

  // 설문 응답 불러오기
  getSurveyResponses: () => {
    try {
      const encryptedData = localStorage.getItem('welfare-survey-responses');
      if (!encryptedData) return null;
      return JSON.parse(atob(encryptedData));
    } catch (error) {
      console.error('Error loading survey responses:', error);
      return null;
    }
  },

  // 추천 결과 저장
  saveRecommendations: (recommendations) => {
    try {
      const data = {
        recommendations,
        timestamp: new Date().toISOString()
      };
      const encryptedData = btoa(JSON.stringify(data));
      localStorage.setItem('welfare-recommendations', encryptedData);
      return true;
    } catch (error) {
      console.error('Error saving recommendations:', error);
      return false;
    }
  },

  // 추천 결과 불러오기
  getRecommendations: () => {
    try {
      const encryptedData = localStorage.getItem('welfare-recommendations');
      if (!encryptedData) return null;
      const data = JSON.parse(atob(encryptedData));
      
      // 24시간 후 만료 체크
      const timestamp = new Date(data.timestamp);
      const now = new Date();
      const hoursDiff = (now - timestamp) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        localStorage.removeItem('welfare-recommendations');
        return null;
      }
      
      return data.recommendations;
    } catch (error) {
      console.error('Error loading recommendations:', error);
      return null;
    }
  },

  // 모든 데이터 삭제
  clearAllData: () => {
    try {
      const keysToRemove = [
        'welfare-user-info',
        'welfare-survey-responses',
        'welfare-recommendations',
        'welfare-survey-completed'
      ];
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
      
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  },

  // 데이터 만료 체크 및 정리
  cleanupExpiredData: () => {
    try {
      // 사용자 정보 만료 체크 (1년)
      const userInfo = localStorage.getItem('welfare-user-info');
      if (userInfo) {
        try {
          const data = JSON.parse(atob(userInfo));
          if (data.createdAt) {
            const created = new Date(data.createdAt);
            const now = new Date();
            const daysDiff = (now - created) / (1000 * 60 * 60 * 24);
            
            if (daysDiff > 365) {
              localStorage.removeItem('welfare-user-info');
              localStorage.removeItem('welfare-survey-responses');
              localStorage.removeItem('welfare-recommendations');
            }
          }
        } catch (error) {
          // 파싱 오류 시 데이터 삭제
          localStorage.removeItem('welfare-user-info');
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error cleaning up expired data:', error);
      return false;
    }
  }
};

// 페이지 로드 시 만료된 데이터 정리
if (typeof window !== 'undefined') {
  localStorageService.cleanupExpiredData();
}