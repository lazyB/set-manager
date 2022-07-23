import * as React from "react";
import {Container, Navbar} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export function LayoutWithNavbar() {
    return (<>
            <Navbar bg={"dark"}  variant={"dark"}>
                <Container>
                    <Navbar.Text>
                        This is my first link
                    </Navbar.Text>
                </Container>
                <Container>
                    <Navbar.Text>
                        This is my second link
                    </Navbar.Text>
                </Container>
                <Container>
                    <Navbar.Text>
                        This is my third link
                    </Navbar.Text>
                </Container>
            </Navbar>
            <Outlet/>
        </>
    )
}