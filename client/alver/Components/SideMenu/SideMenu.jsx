import React, { useState } from "react"
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
  Container,
  ListItemButton,
  Button,
} from "@mui/material"
import {
  ExpandLess,
  ExpandMore,
  Menu,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { Box } from "@mui/system"

import "./SideMenu.scss"

const drawerWidth = 240

// Styled Box for RTL support
const RtlBox = styled(Box)({
  direction: "rtl",
})

export default function SideMenu() {
  const [open, setOpen] = useState(false)
  const [subMenuOpen, setSubMenuOpen] = useState({})

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const handleSubMenuToggle = (menu) => {
    setSubMenuOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  return (
    <RtlBox sx={{ background: "#6EACDA" }}>
      <Container sx={{ display: "flex" }}>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ marginLeft: "auto" }}
          className="menu-icon"
        >
          <Menu />
        </IconButton>
        <Drawer
          variant="temporary"
          anchor="right"
          open={open}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <List>
            <ListItem
              button
              onClick={() => handleSubMenuToggle("services")}
            >
              <ListItemText
                className="menu-title"
                primary="خدمات"
              />
              {subMenuOpen["services"] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
            <Collapse
              in={subMenuOpen["services"]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary="خدمات ما" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary="مشاوره" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary="پشتیبانی" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem
              button
              onClick={() => handleSubMenuToggle("products")}
            >
              <ListItemText primary="محصولات" />
              {subMenuOpen["products"] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
            <Collapse
              in={subMenuOpen["products"]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary="محصول 1" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary="محصول 2" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary="محصول 3" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button>
              <ListItemText primary="تماس با ما" />
            </ListItem>
          </List>
        </Drawer>

        <List className="menu-larg">
          <Button variant="text">Contained</Button>
          <Button variant="text">Contained</Button>
          <Button variant="text">Contained</Button>
          <Button variant="text">Contained</Button>
        </List>
      </Container>
    </RtlBox>
  )
}
