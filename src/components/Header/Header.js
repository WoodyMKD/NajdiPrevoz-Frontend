import React, {useState} from 'react';
import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {withRouter} from 'react-router';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faCalendarAlt, faCar, faHome, faSignOutAlt, faUserAlt} from "@fortawesome/free-solid-svg-icons";

import './Header.css';
import {soonNotification} from "../../utils/notifications";

const Header = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	let menu;
    console.log(props);
	if (props.isAuthenticated) {
        menu = (
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/"><FontAwesomeIcon icon={faHome}/> Почетна</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/trips"><FontAwesomeIcon icon={faCar}/> Понуди</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink  tag={Link} to="/my-trips"><FontAwesomeIcon icon={faCalendarAlt}/> Мои Понуди</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/my-profile">
						<span className="btn btn-outline-secondary my-2 my-sm-0">
								<FontAwesomeIcon icon={faUserAlt}/> {props.currentUser.name}
						</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={props.onLogout}>
						<span className="btn btn-outline-secondary my-2 my-sm-0">
								<FontAwesomeIcon icon={faSignOutAlt}/>
						</span>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
		);
	} else {
		menu = (
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/"><FontAwesomeIcon icon={faHome}/> Почетна</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/trips"><FontAwesomeIcon icon={faCar}/> Понуди</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to={"/login"}>
						<span className="btn btn-outline-secondary my-2 my-sm-0">
								Најава
						</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to={"/register"}>
						<span className="btn btn-outline-secondary my-2 my-sm-0">
								Регистрација
						</span>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
		);
	}

	return (
		<Navbar dark expand="md">
			<Container>
				<NavbarBrand tag={Link} to="/">
					<img src="img/logo.png" alt="logo"/>
				</NavbarBrand>
				<NavbarToggler onClick={toggle}/>
				{menu}
			</Container>
		</Navbar>
	);
};

export default withRouter(Header);