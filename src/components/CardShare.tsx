import { useState, useEffect, useRef } from "react";

const CardShare = ():JSX.Element => {
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
                <button><i className="icon-twitter"></i> 트위터 공유</button>
                <button><i className="icon-google"></i> 아무튼 공유</button>
            </div>}
        </>
    )
}

export default CardShare;