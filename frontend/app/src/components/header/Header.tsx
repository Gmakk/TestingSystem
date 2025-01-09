import styled from "@emotion/styled"
import logo from "../../assets/logo.svg";
import { Stack } from "../Stack";
import { StyledText } from "../Text";
import { useTheme } from "@emotion/react";
import logout from "../../assets/logout.svg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    min-height: 100px;
    background: ${p => p.theme.colors.secondaryBg};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 70px;
`;

export const Header = () => {
    const theme = useTheme();
    const nanigate = useNavigate();
    const logOut = () => {
        nanigate("/");
    }
    return (
        <Container>
            <img src={logo} width={300} />
            <Stack direction="row" align="center" gap={20} >
                <Stack direction="column">
                    <StyledText color={theme.colors.text.secondary} size={22}>
                        { localStorage.getItem("userName") ?? "Неизвестный пользователь" }
                    </StyledText>
                    <StyledText color={theme.colors.text.secondary} size={15}>
                        { localStorage.getItem("userRole") ?? "Нет роли" }
                    </StyledText>
                </Stack>
                <img src={logout} height={28} style={{ cursor: "pointer" }} onClick={logOut}/>
            </Stack>
        </Container>
    )
}
