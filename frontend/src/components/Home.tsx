import styled from 'styled-components';

// Wrapper för hela länken
const SectionLink = styled.a`
    text-decoration: none;
`;

// Del för dammode
const Women = styled.div`
    display: flex;
    flex-direction: column;
    height: 41vh;
    background-color: var(--bg-women);
    background-image: url('/src/assets/main-img/arketwomen.jpg');
    background-repeat: no-repeat;
    background-size: 230px 300px;
    background-position: 90% 50%;
    text-align: left;
    justify-content: center;

    h2 {
        margin-left: 3%;
        display: flex;
        font-size: 1.5rem;
        font-weight: bold;
        height: 100%;
        align-items: center;
        justify-content: flex-start;
    }
`;

// Del för herrmode
const Men = styled.div`
    display: flex;
    flex-direction: column;
    height: 41vh;
    background-color: var(--bg-men);
    background-image: url('/src/assets/main-img/arketmen.jpg');
    background-repeat: no-repeat;
    background-size: 230px 300px;
    background-position: 30px 40px;

    h2 {
        margin-right: 0.5rem;
        display: flex;
        font-size: 1.5rem;
        font-weight: bold;
        height: 100%;
        align-items: center;
        justify-content: flex-end;
    }
`;

// Centrering för loggan
const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

// Loggan i mitten
const Logo = styled.img`
    position: absolute;
    z-index: 2;
    width: 100px;
    height: 100px;
`;

export default function Home() {
    return (
        <>
            {/* Gör en href i väntan på react router */}
            <SectionLink href="/shop/womens_fashion">
                <Women>
                    <h2>Dammode</h2>
                </Women>
                <MainContainer>
                    <Logo
                        src="/src/assets/footer/Icons/Ao-bea-icon2.png"
                        alt="Ao Bea logotype"
                    />
                </MainContainer>
            </SectionLink>

            <SectionLink href="/shop/mens_fashion">
                <Men>
                    <h2>Herrmode</h2>
                </Men>
            </SectionLink>
        </>
    );
}
