// npm run startar både frontend och backend
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Wrapper
const FooterContainer = styled.div`
  width: 100%;
  padding-bottom: 3rem;
  background: white;
`;

// Footer-ikon
const FooterIcon = styled.img`
  width: 85px;
  height: 85px;
  margin-bottom: 2rem;
`;

// Sociala medier
const SocialMediaList = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
`;

const SocialMediaItem = styled.li`
  margin: 1rem;
`;

// Copyright
const CopyrightBar = styled.div`
  padding: 1.5rem 1rem;
  background-color: #f3f4f6;
  font-size: 0.875rem;
  text-align: center;
  padding-bottom: 5rem;
`;

// Array-lista med sociala medier-ikoner
const socialIcons = [
  { src: "/footer/Icons/fb-icon.png", alt: "Facebook" },
  { src: "/footer/Icons/ig-icon.png", alt: "Instagram" },
  { src: "/footer/Icons/linkedin-icon.png", alt: "LinkedIn" },
  { src: "/footer/Icons/youtube-icon.png", alt: "YouTube" },
];

// React.FC typdefinition för Footer-komponenten (returnerar JSX)
const Footer: React.FC = () => {
  // Footer-komponenten
  return (
    <footer className="bg-white md:w-full">
      <div className="md:w-1/2">
        <FooterContainer>
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
              <div>
                <Link to="/">
                  <FooterIcon
                    src="/footer/Icons/Ao-bea-icon2.png"
                    alt="Brand icon"
                  />
                </Link>
                <ul className="text-black-500 font-medium">
                  <li className="mb-4">
                    <Link to="/about" className="hover:underline">
                      Om Ao Bea
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="/" className="hover:underline">
                      Kundtjänst
                    </Link>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Kontakt
                    </a>
                  </li>
                  <li className="mb-4">
                    <Link to="/" className="hover:underline">
                      Leverans
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="/" className="hover:underline">
                      Returer
                    </Link>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Storleksguide
                    </a>
                  </li>
                  <li className="mb-4">
                    <Link to="/" className="hover:underline">
                      FAQ
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="/" className="hover:underline">
                      Mitt konto
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* Loopa igenom sociala medier-ikoner */}
            <SocialMediaList>
              {socialIcons.map((icon, index) => (
                <SocialMediaItem key={index}>
                  <img src={icon.src} alt={icon.alt} />
                </SocialMediaItem>
              ))}
            </SocialMediaList>
          </div>
        </FooterContainer>
      </div>
      <div className="md:p-0">
        <CopyrightBar>
          © 2025 <Link to="/">Ao Bea™</Link>. Alla rättigheter förbehållna.
        </CopyrightBar>
      </div>
    </footer>
  );
};
export default Footer;
