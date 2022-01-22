import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { FooterColumn, FooterHeading, FooterLink, FooterRow, } from './footerStyles';

const Footer = () => (
  <Box
    style={{
      background: 'linear-gradient(90deg, rgba(136,96,208,1) 0%, rgba(90,185,234,1) 100%)',
      bottom: '0',
      width: '100%',
    }}
  >
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <FooterRow>
        <FooterColumn>
          <FooterHeading>O Fit.me</FooterHeading>
          <FooterLink href="#">Jak Fit.me funguje?</FooterLink>
          <FooterLink href="#">Často kladené dotazy</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterHeading>Další informace</FooterHeading>
          <FooterLink href="#">Obchodní podmínky</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterHeading>Kontakt</FooterHeading>
          <FooterLink href="mailto:jedv00@vse.cz">Václav Jedlička</FooterLink>
        </FooterColumn>
        <FooterColumn style={{ display: 'inline-block', textAlign: 'center', marginBottom: '60px' }}>
          <FooterHeading>Sociální sítě</FooterHeading>
          <FooterLink href="#" style={{ paddingLeft: '3px', paddingRight: '3px' }}>
            <FacebookIcon />
          </FooterLink>
          <FooterLink href="#" style={{ paddingLeft: '3px', paddingRight: '3px' }}>
            <InstagramIcon />
          </FooterLink>
          <FooterLink href="#" style={{ paddingLeft: '3px', paddingRight: '3px' }}>
            <TwitterIcon />
          </FooterLink>
          <FooterLink href="#" style={{ paddingLeft: '3px', paddingRight: '3px' }}>
            <YouTubeIcon />
          </FooterLink>
        </FooterColumn>
      </FooterRow>
    </Container>
  </Box>
);
export default Footer;
