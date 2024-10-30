import styled from "@emotion/styled";
import { Property } from "csstype";
import React, { PropsWithChildren } from "react";

export interface LayoutProps {
    className?: string
    style?: React.CSSProperties

    orientation: "vertical" | "horizontal"
    areas: string[] | string

    alignItems?: string
    columnsGap?: string
    rowsGap?: string
    spacing?: string
}

export const Grid: React.FC<PropsWithChildren<LayoutProps>> = x => (
    <div className={x.className} style={{
        display: "grid",
        [x.orientation === "horizontal" ? "gridTemplateRows" : "gridTemplateColumns"]:
            typeof x.areas === "string" ? x.areas : x.areas.join(" "),
        alignItems: x.alignItems,
        gridAutoFlow: x.orientation === "horizontal" ? "column" : "row",
        gridColumnGap: x.columnsGap,
        gridRowGap: x.rowsGap,
        ...x.style,
    }}>
        { x.children }
    </div>
);

interface AdaptiveGridProps {
    screenWidth?: number
    gap?: number
    template?: Property.GridTemplate
    width?: number
}

export const AdaptiveGrid = styled.div<AdaptiveGridProps>`
    max-width: ${p => (p.width ? `${p.width}px` : "100%")};
    display: grid;
    grid-template-columns: ${p => (p.template ? p.template : "1fr 1fr")};
    grid-gap: ${p => (p.gap ? p.gap : 30)}px;
    row-gap: 30px;
    @media screen and (width < ${p => (p.screenWidth ? `${p.screenWidth}px` : "1800px")}) {
    grid-template-columns: 1fr;
      >*{
        grid-column: 1 !important;
      }
    }
`;

export const GridForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 30px;
  @media screen and (width < 1800){
    grid-template-columns: 1fr 1fr 1fr ;
  }
`;
