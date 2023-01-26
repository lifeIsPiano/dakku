import { useState } from 'react';
import Calendar from 'react-calendar';
import { useAuthContext } from '../hooks/useAuthContext';
import { useMyChallenge } from '../hooks/data';
import 'react-calendar/dist/Calendar.css';
import '../assets/css/calendar.scss'

const CalendarView = () => {
    const { user } = useAuthContext();
    const [value, onChange] = useState(new Date());
    const { challenge } = useMyChallenge(user.uid);

    return (
        <div className='cal-wrapper'>
            <div className='cal-text'>
                <p><span>{user.displayName}</span> 님은</p>
                <p className='chal-text'>
                    총 <span>{challenge.length}</span> 개의 챌린지를 달성했어요!
                </p>
            </div>
            <Calendar 
            onChange={onChange} 
            value={value} 
            calendarType="US"
            formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
            />
        </div>
    );
}

export default CalendarView;