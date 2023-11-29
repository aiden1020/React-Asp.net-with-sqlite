import React, { useState } from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Nav, 
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import  AuthenticationLayout  from "./AuthenticationLayout" 

export default function NavMenu(){
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <header>
      <Navbar className="navbar-expand-sm NavMenu" container light>
        <NavbarBrand tag={Link} to="/">BidHUB</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Nav className="ml-auto" navbar> 

          <ul className="navbar-nav flex-grow">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="text-dark" nav caret>汽車</DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} className="text-dark" to="/categories/domestic-car" >國產車</DropdownItem>
                <DropdownItem tag={Link} className="text-dark" to="/categories/import-car">進口車</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="text-dark" nav caret>電子產品</DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} className="text-dark" to="/categories/mobile-phone" >手機/平板</DropdownItem>
                <DropdownItem tag={Link} className="text-dark" to="/categories/earphone">耳機</DropdownItem>
                <DropdownItem tag={Link} className="text-dark" to="/categories/computer-component">電腦配件</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="text-dark" nav caret>名牌精品</DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} className="text-dark" to="/categories/wallet" >皮夾</DropdownItem>
                <DropdownItem tag={Link} className="text-dark" to="/categories/packet">包包</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <AuthenticationLayout />
            </NavItem>
          </ul>
        </Nav>
      </Navbar>
    </header>
  );
};

