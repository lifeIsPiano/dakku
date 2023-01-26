import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(()=>{
        window.scrollTo(0,0);
    }, [pathname]);
    return null;
};

//정규표현식
const regexMail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&~])[A-Za-z\d@$!%*#?&~]{6,}$/

export const mailCheck = (error:string,email:string) => {
    if (error !== null && error.includes('email-already-in-use')){
        return '이미 등록된 이메일입니다.'
    } else if (!regexMail.test(email) && email !== ''){
        return '이메일 형식이 아닙니다.'
    } else if (error !== null && error.includes('user-not-found')){
        return '등록되지 않은 이메일입니다.'
    } else if (error === null){
        return ''
    }
}

export const passwordCheck = (error:string,password:string) => {
    if (error !== null && error.includes('weak-password')){
        return '6자 이상 작성해주세요.'
    } else if (!regexPassword.test(password) && password !== ''){
        return '비밀번호 형식이 아닙니다.';
    } else if (error !== null && error.includes('wrong-password') && password !== ''){
        return '비밀번호가 틀립니다.'
    } else if (error === null){
        return ''
    }
}

export const replaceUrlWithLink = (text:any) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
};

export const shareWeb = (id:any) => {
    if (navigator.clipboard){
        navigator.clipboard
        .writeText(`http://localhost:5173/posting/${id}`)
        .then(()=>{
            alert('포스트 링크가 복사되었습니다.')
        })
        .catch(()=>{
            alert('복사에 실패했습니다.')
        })
    } else {
        alert('복사 기능 미지원 브라우저입니다.')
    }
}