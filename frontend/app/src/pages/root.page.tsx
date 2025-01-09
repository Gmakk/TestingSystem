import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "../components/Stack";
import header from "../assets/header.svg";
import avatar from "../assets/avatar.svg";
import { PrimaryButton } from "../components/button.component";
import styled from "@emotion/styled";
import { toast } from "sonner";
import { UsersApi } from "../api/endpoints/users";
import { routes } from "../routes/routes";

export const StyledInput = styled.input`
    border-bottom: 2px solid ${p => p.theme.colors.accentBg};
    width: 350px;
    font-size: 20px;
`

export const RootPage: React.FC = () => {
    const [login, setLogin] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const navigate = useNavigate();

    const [redirectPath, setRedirectPath] = useState<routes | null>(null);

    useEffect(() => {
        if (redirectPath) {
            navigate(redirectPath)
            setRedirectPath(null)
        }
    }, [redirectPath, navigate])

    const logIn = async () => {
        if (!login || !password) {
            toast.error("Заполните все поля");
            return;
        }

        const res = await UsersApi.login({ login, password });

        if (res !== undefined && "error" in res) {
            toast.error("Ошибка при входе");
        } else {
            if (res?.role) {
                localStorage.setItem('userRole', res.role);
                localStorage.setItem("userName", res.fullName);
                let targetRoute: routes | null = null;
                switch (res.role) {
                    case 'tester':
                        targetRoute = routes.$tester
                        break;
                    case 'admin':
                        targetRoute = routes.$admin
                        break;
                    case 'analyst':
                        targetRoute = routes.$analyst
                        break;
                    case 'director':
                        targetRoute = routes.$director
                        break;
                    default:
                        toast.error("Вход в систему запрещен, либо пользователь не найден");
                }
                if (targetRoute) {
                    setRedirectPath(targetRoute)
                }
            } else {
                toast.error("Неверный логин или пароль");
            }
        }
    };

    return (
        <Stack direction="column" gap={80}>
            <img src={header}></img>
            <Stack direction="column" align="center" gap={60}>
                <img src={avatar}></img>
                <Stack direction="column" gap={30}>
                    <StyledInput placeholder="Логин" value={login} onChange={v => setLogin(v.target.value)} />
                    <StyledInput type="password" placeholder="Пароль" value={password} onChange={v => setPassword(v.target.value)} />
                </Stack>
                <PrimaryButton text="Войти" onClick={logIn} />
            </Stack>
        </Stack>
    );
};
