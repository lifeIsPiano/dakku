import { useState, useEffect, useRef } from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";

const CardShare = ({shareSNS,shareLink}:any):JSX.Element => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const node:any = useRef();

    useEffect(() => {
        const clickOutside = (e:any) => {
            if (modalOpen && node.current && !node.current.contains(e.target)) {
                setModalOpen(false);
            }
        };
        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [modalOpen]);

    return (
        <>
            <button className="share" onClick={()=>setModalOpen(!modalOpen)}>
                <i className="icon-share-2"></i>
            </button>
            {modalOpen && <div className="shares mdl" ref={node}>
            <TwitterShareButton 
            style={{padding:'10px'}}
            url={`http://localhost:5173/posting/${shareSNS}`}>
                <TwitterIcon size={24} round={true} borderRadius={24} />
                <span className="hover-color">트위터 공유</span>
            </TwitterShareButton>
            <button onClick={shareLink}>
                <i className="icon-edit"></i>링크 복사</button>
            </div>
            }
        </>
    )
}

export default CardShare;