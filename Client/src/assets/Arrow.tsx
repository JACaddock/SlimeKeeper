export const Arrow = ({ className = "", style}: { className?: string, style?: React.CSSProperties }) => (
    <svg className={className} style={style}
        width="20px" height="18px"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1" viewBox="-0.5 -0.5 20 18">
    
        <path d="M -0.5 10.21 L -0.5 5.79 L 9 5.79 L 11.84 5.79 L 11.84 -0.03 L 18.5 8 L 11.84 16.03 L 11.84 10.21 L 9 10.21 Z" />
    
        <path d="M 11.84 5.79 L 11.84 -0.03 L 18.5 8 L 11.84 16.03 L 11.84 10.21" fill="none" />
    </svg>
);