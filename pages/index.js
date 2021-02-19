import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Markdown from 'react-markdown';
import Layout from '../src/components/Layout';

export default function About(props) {
  const {
    person: {
      fields: {
        shortBio,
        image: {
          fields: {
            title,
            file: {
              url,
              details: {
                image: { width, height },
              },
            },
          },
        },
      },
    },
  } = props;

  return (
    <Layout pageTitle="About Me">
      <section className="about">
        <figure>
          <Image
            src={`https:${url}`}
            alt={title}
            loading="lazy"
            height={height}
            width={width}
          />
        </figure>
        <Markdown source={shortBio} escapeHtml={true} />
      </section>
    </Layout>
  );
}

About.propTypes = {
  person: PropTypes.shape({
    fields: PropTypes.shape({
      shortBio: PropTypes.string,
      image: PropTypes.shape({
        fields: PropTypes.shape({
          title: PropTypes.string,
          file: PropTypes.shape({
            url: PropTypes.string,
            details: PropTypes.shape({
              image: PropTypes.shape({
                height: PropTypes.number,
                width: PropTypes.number,
              }),
            }),
          }),
        }),
      }),
    }),
  }),
};

export async function getStaticProps() {
  // Create an instance of the Contentful JavaScript SDK
  const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  // Fetch a single entry
  const person = await client.getEntry('2G14O8KXqIg2Nt3x7qe7Z5');

  // If nothing was found, return an empty object for props, or else there would
  // be an error when Next tries to serialize an `undefined` value to JSON.
  if (!person) {
    return { props: {} };
  }

  return {
    props: {
      person,
    },
  };
}
