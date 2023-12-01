import React, { useState } from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
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
                <DropdownItem tag={Link} className="text-dark" to="/categories/國產車" >國產車</DropdownItem>
                <DropdownItem tag={Link} className="text-dark" to="/categories/進口車">進口車</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="text-dark" nav caret>電子產品</DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} className="text-dark" to="/categories/手機" >手機</DropdownItem>
                <DropdownItem tag={Link} className="text-dark" to="/categories/耳機">耳機</DropdownItem>
                <DropdownItem tag={Link} className="text-dark" to="/categories/電腦配件">電腦配件</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="text-dark" nav caret>名牌精品</DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} className="text-dark" to="/categories/皮夾" >皮夾</DropdownItem>
                <DropdownItem tag={Link} className="text-dark" to="/categories/包包">包包</DropdownItem>
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

