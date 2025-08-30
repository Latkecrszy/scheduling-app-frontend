export default function Blur({ children }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity
        duration-300 ease-out">
            {children}
        </div>
    )
}