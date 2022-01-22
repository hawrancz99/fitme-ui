import React from 'react';
import LandingPageServices from '../organisms/landingPage/landingPageServices';
import LandingPageMotto from '../organisms/landingPage/landingPageMotto';
import LandingPageSearch from '../organisms/landingPage/landingPageSearch';

const HomePageTemplate = ({ search, location }) => (
  <>
    <LandingPageSearch fetchSearch={search} location={location} />
    <LandingPageMotto />
    <LandingPageServices />
  </>
);

export default HomePageTemplate;
