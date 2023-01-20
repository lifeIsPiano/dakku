// 특정 글, 프로필 등에 들어갔을 때 상단에 표시되는 바

import { useNavigate } from "react-router-dom";

type BarTitle = {
    category?:string;
} & typeof defaultProps;

const defaultProps={
    category:'',
};

const Bar = ({category}:BarTitle):JSX.Element => {
    const navigate = useNavigate();

    return (
        <div className="bar">
            <button onClick={()=>navigate(-1)}><i className="icon-arrow-left"></i></button>
            {/* 그냥 전체 타임라인으로 돌아가는게 낫나.. */}
            <span>{category}</span>
        </div>
    );
}

export default Bar;