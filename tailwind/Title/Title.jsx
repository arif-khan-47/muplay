const Title = ({ children, className }) => {
    return (
        <div className={`text-lg text-opacity-10 font-semibold text-white opacity-80 ${className}`}>
            {children}
        </div>
    );
}

export default Title;