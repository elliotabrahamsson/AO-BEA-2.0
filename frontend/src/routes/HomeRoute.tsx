import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Del för dammode
const Women = styled.div`
    display: flex;
    flex-direction: column;
    height: 41vh;
    background-color: var(--bg-women);
    background-image: url('/main-img/arketwomen.jpg');
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
    background-image: url('/main-img/arketmen.jpg');
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

export default function HomeRoute() {
    return (
        <>
            <Link to="/shop/dammode">
                <Women>
                    <h2>Dammode</h2>
                </Women>
            </Link>
            <MainContainer>
                <Logo
                    src="/footer/Icons/Ao-bea-icon2.png"
                    alt="Ao Bea logotype"
                />
            </MainContainer>
            <Link to="/shop/herrmode">
                <Men>
                    <h2>Herrmode</h2>
                </Men>
            </Link>
        </>
    );
}
