

export default function Button({ theme, click, children }) {



    switch (theme) {
        case 'Transparent':
            return <span
                className={`w-[100%] bg-gray-100 text-gray-700 text-[14px] text-center font-medium px-2.5 py-0.5 my-1 rounded-2xl 
                border border-gray-700 shadow-md`}
                onClick={click}
            >
                {children}
            </span>
            break
        case 'Primary':
            return <span
                className={`w-[100%] bg-gray-800 text-white text-[14px] text-center font-medium px-2.5 py-0.5 my-1 rounded-2xl 
                border border-gray-700 shadow-md`}
                onClick={click}
            >
                {children}
            </span>
            break
        case 'Secondary':
            return <span
                className={`w-[100%] bg-white text-gray-700 text-[14px] text-center font-medium px-2.5 py-0.5 my-1 rounded-2xl 
                border border-gray-700 shadow-md`}
                onClick={click}
            >
                {children}
            </span>

        case 'Success':
            return <span
                className={`w-[40%] lg:w-[100%] bg-[#0064FA] text-gray-400 text-[14px] text-center font-medium px-2.5 py-0.5 my-1 rounded-2xl 
                border border-gray-700 shadow-md`}
                onClick={click}
            >
                {children}
            </span>
        default:
    }
}

  