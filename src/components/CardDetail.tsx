export const CardDetail = ():JSX.Element => {
    return (
        <>
            <span className="tag">{`다꾸 팁`}</span>
            <button className="comment">
                <i className="icon-message-circle"></i>
                댓글 {1}
            </button>
            <button className="like">
                <i className="icon-star"></i>
                {/* 클릭되었을 시 icon-full-star로 */}
                좋아요 {2}
            </button>
            <button className="share">
                <i className="icon-share-2"></i>
            </button>
            <button className="more">
                <i className="icon-more-horizontal"></i>
            </button>
        </>
    )
}

export default CardDetail;