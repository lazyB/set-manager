import * as React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Outlet} from "react-router-dom";
import {AppRoutes} from "../../navigation/AppRouter";

export function LayoutWithNavbar() {
    return (<Container>
            <Navbar>
                <Container>
                    <LinkContainer to={AppRoutes.Song.Index}>
                        <Nav.Link >Songs</Nav.Link>
                    </LinkContainer>
                </Container>
            </Navbar>
            <Container>
                <Outlet/>
            </Container>
        </Container>
    )
}