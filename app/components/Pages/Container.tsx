import React from 'react'

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
      <div className="w-full px-4 lg:px-56 py-4 lg:py-10">
        {children}
      </div>
  )
}

export default Container