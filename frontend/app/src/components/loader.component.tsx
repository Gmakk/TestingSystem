import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Stack } from "./stack.component.tsx";
import { Typography } from "./text.component.tsx";

const Wrapper = styled.div<{ visible?: boolean }>`
    align-items: center;
    display: flex;
    ${p => (p.visible ? `
    transition: opacity 1s ease-out;
    opacity: 0;
    height: 0 !important;
    overflow: hidden;
    ` : `
    opacity: 1;
    display: flex;
    `)}
    justify-content: center;
    position: absolute;
    z-index: 999;
    backdrop-filter: blur(8px);
    width: 100vw;
    top: 0;
    left: 0;
    height: 100vh; 
`;

const Card = styled.div`
    font-size: 33px;
    width: 290px;
    height: 290px;
    max-width: 290px;
    max-height: 290px;
    background: rgba(30, 43, 77);
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    display: flex !important;
    flex-direction: column;
    ::after{
        position: absolute;
        border-radius: 20px;
        z-index: -1;
        content: '';
        height: 292px;
        width: 292px;
        background-image:linear-gradient(135deg, rgba(189,215,255,0.4) 0%, rgba(189,215,255,0) 40%, rgba(189,215,255,0) 57%, rgba(189,215,255,0.1) 100%);;
    }
`;

const Spinner = styled.div`
        font-size: 17px;
        width: 1em;
    margin-top: -50px;
    margin-bottom: 39px;
        height: 1em;
        border-radius: 50%;
        text-indent: -9999em;
        animation: mulShdSpin 1.1s infinite ease;
        transform: translateZ(0);
    @keyframes mulShdSpin {
        0%,
        100% {
            box-shadow: 0em -2.6em 0em 0em #3F91FD, 1.8em -1.8em 0 0em #3F91FD33, 2.5em 0em 0 0em #3F91FD33, 1.75em 1.75em 0 0em #3F91FD33, 0em 2.5em 0 0em #3F91FD33, -1.8em 1.8em 0 0em #3F91FD33, -2.6em 0em 0 0em #3F91FD80, -1.8em -1.8em 0 0em #3F91FDB3;
        }
        12.5% {
            box-shadow: 0em -2.6em 0em 0em #3F91FDB3, 1.8em -1.8em 0 0em #3F91FD, 2.5em 0em 0 0em #3F91FD33, 1.75em 1.75em 0 0em #3F91FD33, 0em 2.5em 0 0em #3F91FD33, -1.8em 1.8em 0 0em #3F91FD33, -2.6em 0em 0 0em #3F91FD33, -1.8em -1.8em 0 0em #3F91FD80;
        }
        25% {
            box-shadow: 0em -2.6em 0em 0em #3F91FD80, 1.8em -1.8em 0 0em #3F91FDB3, 2.5em 0em 0 0em #3F91FD, 1.75em 1.75em 0 0em #3F91FD33, 0em 2.5em 0 0em #3F91FD33, -1.8em 1.8em 0 0em #3F91FD33, -2.6em 0em 0 0em #3F91FD33, -1.8em -1.8em 0 0em #3F91FD33;
        }
        37.5% {
            box-shadow: 0em -2.6em 0em 0em #3F91FD33, 1.8em -1.8em 0 0em #3F91FD80, 2.5em 0em 0 0em #3F91FDB3, 1.75em 1.75em 0 0em #3F91FD, 0em 2.5em 0 0em #3F91FD33, -1.8em 1.8em 0 0em #3F91FD33, -2.6em 0em 0 0em #3F91FD33, -1.8em -1.8em 0 0em #3F91FD33;
        }
        50% {
            box-shadow: 0em -2.6em 0em 0em #3F91FD33, 1.8em -1.8em 0 0em #3F91FD33, 2.5em 0em 0 0em #3F91FD80, 1.75em 1.75em 0 0em #3F91FDB3, 0em 2.5em 0 0em #3F91FD, -1.8em 1.8em 0 0em #3F91FD33, -2.6em 0em 0 0em #3F91FD33, -1.8em -1.8em 0 0em #3F91FD33;
        }
        62.5% {
            box-shadow: 0em -2.6em 0em 0em #3F91FD33, 1.8em -1.8em 0 0em #3F91FD33, 2.5em 0em 0 0em #3F91FD33, 1.75em 1.75em 0 0em #3F91FD80, 0em 2.5em 0 0em #3F91FDB3, -1.8em 1.8em 0 0em #3F91FD, -2.6em 0em 0 0em #3F91FD33, -1.8em -1.8em 0 0em #3F91FD33;
        }
        75% {
            box-shadow: 0em -2.6em 0em 0em #3F91FD33, 1.8em -1.8em 0 0em #3F91FD33, 2.5em 0em 0 0em #3F91FD33, 1.75em 1.75em 0 0em #3F91FD33, 0em 2.5em 0 0em #3F91FD80, -1.8em 1.8em 0 0em #3F91FDB3, -2.6em 0em 0 0em #3F91FD, -1.8em -1.8em 0 0em #3F91FD33;
        }
        87.5% {
            box-shadow: 0em -2.6em 0em 0em #3F91FD33, 1.8em -1.8em 0 0em #3F91FD33, 2.5em 0em 0 0em #3F91FD33, 1.75em 1.75em 0 0em #3F91FD33, 0em 2.5em 0 0em #3F91FD33, -1.8em 1.8em 0 0em #3F91FD80, -2.6em 0em 0 0em #3F91FD,B3 -1.8em -1.8em 0 0em #3F91FD
    }`;

export const Loader: FC<{ visible?: boolean; loadingText?: string;finallyText?: string; pending?: boolean }> = observer(({ visible, loadingText, finallyText, pending }) => (
    <Wrapper visible={visible}>
        <Card>
            <Stack.Vertical gap={61} align="center" style={{ paddingTop: "150px" }}>
                <Spinner />
                <Typography>{ loadingText }</Typography>
            </Stack.Vertical>
        </Card>
    </Wrapper>
));
