import { useState, type JSX } from 'react';
import styled from 'styled-components';
import arrowDown from '/src/assets/dropdown/arrow-down.svg';
import xMark from '/src/assets/dropdown/x-mark.svg';

// Props interface
interface ColorDropdownProps {
    Colors: string[];
}

// Define styled components for layout and styling.
const DropdownWrapper = styled.div`
    background-color: var(--bright1);
    max-width: 400px;
    min-height: 50px;
    margin: auto;
    margin-bottom: 20px;
`;

const DropdownButton = styled.button`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 30px;
    box-sizing: border-box;

    .button-content {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        font-size: 20px;
    }

    .icon {
        width: 2rem;
        height: 2rem;

        @media (min-width: 768px) {
            width: 2.25rem;
            height: 2.25rem;
        }

        @media (min-width: 1024px) {
            width: 2.5rem;
            height: 2.5rem;
        }
    }
`;

const DropdownContent = styled.div<{ isOpen: boolean }>`
    background-color: var(--bright1);
    height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
    overflow: hidden;
    transition: height 0.3s ease-out;
    padding: ${({ isOpen }) => (isOpen ? '10px' : '0')};
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};

    ul {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin: 1rem 0;
        padding: 0.5rem;
    }

    li {
        font-family: 'Merriweather Sans', sans-serif;
        font-weight: 300;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
//Create a functional component for the color dropdown menu
function Dropdowncolors({ Colors }: ColorDropdownProps): JSX.Element {
    // `JSX.Element` indicates that this function will return a JSX element
    const [isOpen, setIsOpen] = useState<boolean>(false); //Setting the type to boolean for type safety.

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    return (
        <DropdownWrapper>
            <DropdownButton onClick={toggleDropdown}>
                <div className="button-content">
                    <p>Välj färg</p>
                    <img
                        src={isOpen ? xMark : arrowDown}
                        alt="Dropdown arrow"
                        className={`icon transition-transform duration-150 transform ${
                            isOpen ? 'rotate-90' : ''
                        }`}
                    />
                </div>
            </DropdownButton>

            <DropdownContent isOpen={isOpen}>
                <ul>
                    {Colors.map((color, index) => (
                        <li key={index}>{color}</li>
                    ))}
                </ul>
            </DropdownContent>
        </DropdownWrapper>
    );
}

export default Dropdowncolors;
