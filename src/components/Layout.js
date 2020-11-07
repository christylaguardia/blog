import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from './Head';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

export const siteInfo = {
  siteTitle: 'Christy La Guardia',
  siteDescription:
    'Stories of survival, escape and recovery from the Jehovah Witness cult.',
};

export default function Layout(props) {
  const { pageTitle, showHeader = true, showNav = false, children } = props;
  const { siteTitle, siteDescription } = siteInfo;
  const title = pageTitle ? `${siteTitle} | ${pageTitle}` : siteTitle;

  return (
    <>
      <Head
        title={title}
        siteTitle={siteTitle}
        siteDescription={siteDescription}
      />
      {showHeader && <Header siteDescription={siteDescription} />}
      {showNav && <Navigation />}
      <main>{children}</main>
      <Footer siteTitle={siteTitle} />
    </>
  );
}

Layout.propTypes = {
  pageTitle: PropTypes.string,
  showHeader: PropTypes.bool,
  showNav: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};