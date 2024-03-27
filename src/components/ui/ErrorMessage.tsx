import React from 'react'



function ErrorMessage({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-center my-4 bg-red-600 dark:bg-red-900 text-red-100 dark:text-red-400 font-bold p-3 uppercase text-sm rounded-xl">
            {children}
        </div>

    )
}

export default ErrorMessage