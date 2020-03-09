import React from 'react';

import { StaticQuery, graphql } from "gatsby";

import { Disqus } from 'gatsby-plugin-disqus'

function Comments({ data, title, location }) {
  const disqusConfig = {
    url: `${data.site.siteMetadata.siteUrl + location}`,
    identifier: title,
    title: title,
  }
  return (
    <Disqus config={disqusConfig} />
  )
}

export default ({ title, location }) => {
  return (
    <StaticQuery
      query={graphql`
            query {
                site {
                    siteMetadata {
                        siteUrl
                    }
                }
            }
        `}
      render={data => <Comments data={data} title={title} location={location} />}
    />
  )
}