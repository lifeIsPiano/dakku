import { useState } from 'react';
import { Line } from 'rc-progress';
import { useAuthContext } from '../hooks/useAuthContext';
import { useMyChallenge } from '../hooks/data';
import '../assets/css/progress.scss'

const Progress = () => {
    const { user } = useAuthContext();
    const [num,setNum] = useState(7);
    const { challenge } = useMyChallenge(user.uid);

    const changeNum=(e:any)=>{
        setNum(e.target.value)
    }

    const onSubmit=async (e:any)=>{
        e.preventDefault();
    }

    const percentage=+(challenge.length/num * 100).toFixed(1);

    return (
        <div className='cal-wrapper'>
            <div className="wrap">
            <div className='cal-text'>
                <p><span>{user.displayName}</span> 님은</p>
                <p className='chal-text'>
                    총 <span>{challenge.length}</span> 개의 챌린지를 달성했어요!
                </p>
            </div>
            <form className='p-bar' onSubmit={onSubmit}>
                <p className='size'>챌린지 진행도 <span>{percentage}%</span></p>
                <Line percent={percentage} 
                strokeColor='#535bf2'
                strokeWidth={4}
                trailWidth={4}
                />
                목표치: <span>{challenge.length}</span> / 
                <input type="number" value={num} min={3} max={1000} onChange={changeNum} className='perc'/>
            </form>
            </div>
        </div>
    );
}

export default Progress;