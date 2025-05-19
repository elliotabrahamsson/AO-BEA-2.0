import React from 'react'
import { useState } from 'react'
import xMark from '../assets/dropdown/x-mark.svg'
import arrowDown from '../assets/dropdown/arrow-down.svg'
/* import styled from 'styled-components' */


function DropdownProducts() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen((prev) => (!prev))
  }


  return (
    <div className='dropdown bg-[var(--bright2)] max-w-[400px] min-h-[50px] m-auto mb-[20px]'>
        {/* Knapp för dropdown */}
        <button className='dropdown-btn w-[100%] flex justify-center items-center cursor-pointer p-[30px] box-border' onClick={toggleDropdown}>
            <div className="button-content flex justify-around items-center text-[20px] w-[100%]">
                <p className='text-xl'>Produktbeskrivning</p>
                <img src={isOpen ? xMark : arrowDown} alt="Dropdown arrow"className='icon w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition duration-150 transform'/>
            </div>
        </button>
        <div className={isOpen ? "block" : "hidden"}>
            {/* innehåll */}
            <div className="id-container">
                {/* Temporärt */}
                <span className="id">ID </span>
                <span className="id-no"> 1263785001 </span>

            </div>
            {/* Rendera ut data */}
        </div>
    </div>
  )
}

export default DropdownProducts
