import { graphql, PageProps } from "gatsby"
import React, { useEffect, useRef, useState } from "react"

import { ArrowRight } from "react-feather"
import ScrollIntoView from "react-scroll-into-view"

import Layout from "../components/layout"
import { Button } from "../components/ui"

import { Description as ContactDescription, Form } from "../components/contact"
import ItemBlog from "../components/item-blog"
import ItemPortfolio from "../components/item-portfolio"
import { IndexPageQuery } from "./__generated__/IndexPageQuery"

export default ({ data, location }: PageProps<IndexPageQuery>) => {
    const siteData = data.site.siteMetadata

    const portfolioList = data.oferta.edges.map((item, _) => (
        <ItemPortfolio
            data={item.node}
            key={`p-item-index-${item.node.id}`}
            even={(_ + 1) % 2 === 0}
        />
    ))

    const blogList = data.blog.edges.map(item => (
        <ItemBlog data={item.node} key={`b-item-index-${item.node.id}`} />
    ))

    return (
        <Layout
            front={true}
            seo={{
                title:
                    "Fizjoterapeuta koni Mazowieckie | Rehabilitacja konia | Derka magnetyczna",
                description: siteData.description,
            }}
            navPlaceholder={false}
            location={location}
        >
            <Wall data={siteData} />
            {siteData.about !== "" && (
                <About data={siteData.about} dataMore={siteData.aboutMore} />
            )}
            <div className="px-4 lg:px-0" id="oferta">
                {portfolioList}
            </div>
            <Blog>{blogList}</Blog>
            <Contact data={siteData.contact} />
        </Layout>
    )
}

const Wall = ({ data }) => {
    const wall = useRef(null)

    const twoColumnWall = data.twoColumnWall

    const [state, changeState] = useState({
        loaded: false,
        supportsBlend: false,
    })

    useEffect(() => {
        if (window.CSS && !state.loaded) {
            if (CSS.supports("mix-blend-mode", "screen")) {
                wall.current.classList.add("supports-blend")
                changeState({
                    loaded: true,
                    supportsBlend: true,
                })
            }
        }
    }, [state.loaded])

    let spanAttrs: Partial<{ style: unknown }> = {}

    if (!twoColumnWall && data.titleImage) {
        spanAttrs.style = {
            backgroundImage: `url('${data.titleImage}')`,
        }
    }

    const innerComponents = (
        <React.Fragment>
            <div className="title bg-bg">
                <h1
                    className={`text-5xl relative lg:text-6 xl ${
                        data.capitalizeTitleOnHome ? "uppercase" : ""
                    }`}
                >
                    <span {...spanAttrs}></span>
                    {data.title}
                </h1>
            </div>
            <p className="text-lg lg:text-xl text-color-2 pt-4 lg:pt-0">
                {data.introTag}
            </p>
            <p className="text-base text-lg mt-4">{data.description}</p>
            <ScrollIntoView selector="#oferta">
                <Button
                    title="OFERTA"
                    type="button"
                    iconRight={<ArrowRight />}
                />
            </ScrollIntoView>
        </React.Fragment>
    )

    if (twoColumnWall) {
        return (
            <div
                className="wall h-screen flex relative justify-center items-center overflow-hidden"
                ref={wall}
            >
                <div className="flex-1 lg:block absolute lg:relative w-full h-full top-0 left-0">
                    <div
                        className="absolute left-0 top-0 w-full h-full lg:hidden"
                        style={{
                            background: "rgba(0,0,0,.75)",
                        }}
                    ></div>
                    <img
                        src={data.titleImage}
                        alt=""
                        className="h-full bg-cover w-auto max-w-none lg:h-auto lg:w-full sm:w-full sm:object-cover"
                    />
                </div>
                <div className="flex-1 text-center p-3 relative z-10 lg:text-left lg:pl-8 text-white lg:text-color-default">
                    {innerComponents}
                </div>
            </div>
        )
    }

    return (
        <div
            className="wall h-screen flex flex-col justify-center items-center text-center"
            ref={wall}
        >
            {innerComponents}
        </div>
    )
}

const About = ({ data, dataMore }) => {
    return (
        <div className="boxed">
            <div className="px-4 py-20 text-center lg:py-40 lg:px-0">
                <h2 className="text-color-1 font-black text-5xl lg:text-6xl">
                    O mnie
                </h2>
                <p className="mt-5 text-lg">{data}</p>
                <p className="mt-5 text-lg">{dataMore}</p>
            </div>
        </div>
    )
}

const Blog = ({ children }) => {
    return (
        <div className="container mx-auto px-0">
            <div className="pt-20 pb-10 text-center lg:pt-40 lg:pb-20">
                <h2 className="text-color-1 font-black text-5xl lg:text-6xl">
                    Blog
                </h2>
            </div>
            <div className="flex flex-wrap">{children}</div>
        </div>
    )
}

const Contact = ({ data }) => {
    const hasContactForm = data.api_url
    return (
        <div className="container mx-auto">
            <div className="pt-20 pb-10 lg:pt-40 lg:pb-20 text-center">
                <h2 className="text-color-1 font-black text-5xl lg:text-6xl">
                    Kontakt
                </h2>
            </div>
            <div className="flex flex-wrap pb-40">
                {hasContactForm && (
                    <div className="w-full lg:w-1/2 px-4 lg:pl-2 lg:pr-6">
                        <Form api={data.api_url} />
                    </div>
                )}
                <div
                    className={`w-full ${
                        hasContactForm ? "lg:w-1/2" : "lg:w-2/3 mx-auto"
                    } px-6 pt-8`}
                >
                    <ContactDescription data={data} />
                </div>
            </div>
        </div>
    )
}

export const query = graphql`
    query IndexPageQuery {
        site: site {
            siteMetadata {
                title
                description
                capitalizeTitleOnHome
                titleImage
                ogImage
                twoColumnWall
                introTag
                description
                about
                aboutMore
                contact {
                    api_url
                    description
                    mail
                    phone
                    address
                }
                social {
                    name
                    url
                    icon
                }
            }
        }
        oferta: allMdx(
            filter: { fields: { sourceName: { eq: "oferta" } } }
            limit: 6
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        image {
                            childImageSharp {
                                fluid(maxWidth: 1000) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        blog: allMdx(
            filter: { fields: { sourceName: { eq: "blog" } } }
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 6
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        date(formatString: "DD MMMM YYYY")
                        image {
                            childImageSharp {
                                fluid(maxWidth: 1000) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`
