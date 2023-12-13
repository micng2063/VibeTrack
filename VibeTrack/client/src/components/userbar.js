import React from 'react';
import { ProSidebar, Menu, MenuItem, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { BiCog } from 'react-icons/bi';
import { FaList, FaRegHeart } from 'react-icons/fa';
import "../css/userbar.css";

const UserBar = ({ logOut }) => {
  return (
    <div id="header" style={{position: 'absolute', width: '220px'}}>
      <ProSidebar>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem icon={<FiHome />}>
              <a href={`/profile`}>Profile</a>
            </MenuItem>
            <MenuItem icon={<BiCog />}>
              <a href="/security">Security</a>
            </MenuItem>
            <MenuItem icon={<FaList />}>
              <a href={`/contact`}>Contact</a>
            </MenuItem>
            <MenuItem icon={<FaRegHeart />}>
              <a href={`/favorite`}>Favorite</a>
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />} onClick={logOut}>
              Logout
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default UserBar;
