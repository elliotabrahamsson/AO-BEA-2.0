import styled from 'styled-components';
// All CSS for the About component is contained in the 'AboutStyle' styled-component.
const AboutStyle = styled.div`
    h1 {
        font-size: 30px;
    }

    h2 {
        font-size: 30px;
    }

    /* För responsiviteten behöver man anpassa overlaysen med media queries. */
    .relative {
        position: relative;
    }

    .letter-vertical {
        writing-mode: vertical-lr;
        text-orientation: upright;
    }
`;
// Created a styled-component variable for each team member
// and transferred the CSS from the Vue project into each variable.
const AboutAntonia = styled.div`
    .relative-container {
        position: relative;
    }
    .letter-overlay-antonia {
        position: absolute;
        top: -65px;
        right: 180px;
        z-index: 2;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .letter-overlay-antonia h2 {
        font-size: 30px;
        background-color: rgba(0, 0, 0, 0.6);
    }
`;

const AboutOliver = styled.div`
    .letter-overlay-oliver {
        position: absolute;
        top: 661px;
        right: 180px;
        z-index: 2;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .letter-overlay-oliver h2 {
        font-size: 30px;
        background-color: rgba(0, 0, 0, 0.6);
    }
`;

const AboutBrian = styled.div`
    .letter-overlay-brian {
        position: absolute;
        top: 1297px;
        right: 180px;
        z-index: 2;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .letter-overlay-brian h2 {
        font-size: 30px;
        background-color: rgba(0, 0, 0, 0.6);
    }
`;
const AboutElliot = styled.div`
    .letter-overlay-elliot {
        position: absolute;
        top: 1981px;
        right: 180px;
        z-index: 2;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .letter-overlay-elliot h2 {
        font-size: 30px;
        background-color: rgba(0, 0, 0, 0.6);
    }
`;

const AboutAlexander = styled.div`
    .letter-overlay-alexander {
        position: absolute;
        top: 2699px;
        right: 180px;
        z-index: 2;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .letter-overlay-alexander h2 {
        font-size: 30px;
        background-color: rgba(0, 0, 0, 0.6);
    }
`;

function About() {
    return (
        <>
            <AboutStyle>
                <div className="text-center">
                    <h1 className="mt-4">About</h1>
                    <p className="text-left text-pretty text mt-4 ml-3 p-5">
                        <strong>AO BEA</strong> är ett skandinaviskt
                        modevarumärke som förenar stilren design med tidlös
                        elegans. Vi skapar kläder för både herr och dam – plagg
                        som kombinerar minimalistisk estetik med högkvalitativa
                        material och genomtänkta detaljer.
                        <br />
                        <br />
                        Välkommen till <strong>AO BEA</strong> – Zalando fast
                        bättre.
                    </p>
                    <h2 className="text-center mt-10">Vilka är vi?</h2>
                </div>

                <AboutAntonia>
                    <div className="relative-container">
                        <img
                            className="relative mt-4"
                            src="/about-team-img/Antonia.jpeg"
                            alt="Antonia"
                        />
                        <div className="letter-overlay-antonia">
                            <a
                                href="https://www.linkedin.com/in/antonia-noaksson-20ba132b1/"
                                target="_blank"
                            >
                                <h2 className="text-[var(--bg-women)] letter-vertical">
                                    <span className="text-[50px]">A</span>
                                    <span className="font-[merriweather-sans] font-light text-[36px]">
                                        ntonia
                                    </span>
                                </h2>
                            </a>
                        </div>
                    </div>
                </AboutAntonia>

                <AboutOliver>
                    <div className="relative-container">
                        <img
                            className="relative mt-4"
                            src="/about-team-img/Oliver.jpg"
                            alt="Oliver"
                        />
                        <div className="letter-overlay-oliver">
                            <a
                                href="https://www.linkedin.com/in/oliverfernstrom/"
                                target="_blank"
                            >
                                <h2 className="text-[var(--bg-men)] letter-vertical">
                                    <span className="text-[50px]">O</span>
                                    <span className="font-[merriweather-sans] font-light text-[36px]">
                                        liver
                                    </span>
                                </h2>
                            </a>
                        </div>
                    </div>
                </AboutOliver>
                <AboutBrian>
                    <div className="relative-container">
                        <img
                            className="relative mt-4"
                            src="/about-team-img/Brian.jpg"
                            alt="Brian"
                        />
                        <div className="letter-overlay-brian">
                            <a
                                href="https://www.linkedin.com/in/brian-tivar-castillo/"
                                target="_blank"
                            >
                                <h2 className="text-[var(--bg-women)] letter-vertical">
                                    <span className="text-[50px]">B</span>
                                    <span className="font-[merriweather-sans] font-light text-[36px]">
                                        rian
                                    </span>
                                </h2>
                            </a>
                        </div>
                    </div>
                </AboutBrian>
                <AboutElliot>
                    <div className="relative-container">
                        <img
                            className="relative mt-4"
                            src="/about-team-img/Elliot.jpg"
                            alt="Elliot"
                        />
                        <div className="letter-overlay-elliot">
                            <a
                                href="https://www.linkedin.com/in/elliot-abrahamsson-a8558a267/"
                                target="_blank"
                            >
                                <h2 className="text-[var(--bg-men)] letter-vertical">
                                    <span className="text-[50px]">E</span>
                                    <span className="font-[merriweather-sans] font-light text-[36px]">
                                        lliot
                                    </span>
                                </h2>
                            </a>
                        </div>
                    </div>
                </AboutElliot>
                <AboutAlexander>
                    <div className="relative-container">
                        <img
                            className="relative mt-4"
                            src="/about-team-img/Alexander.jpg"
                            alt="Alexander"
                        />
                        <div className="letter-overlay-alexander">
                            <a
                                href="https://www.linkedin.com/in/alexanderahlstr%C3%B6m/"
                                target="_blank"
                            >
                                <h2 className="text-[var(--bg-women)] letter-vertical">
                                    <span className="text-[50px]">A</span>
                                    <span className="font-[merriweather-sans] font-light text-[36px]">
                                        lexander
                                    </span>
                                </h2>
                            </a>
                        </div>
                    </div>
                </AboutAlexander>
                <p className="text-pretty text-start mt-4 ml-3 mb-8 text-xl p-6">
                    Vi är Antonia, Oliver, Brian, Elliot och Alexander.
                    Tillsammans har vi skapat och utvecklat AO BEA.
                </p>
            </AboutStyle>
        </>
    );
}

export default About;
