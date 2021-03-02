const siteMetadata = {
    title: `Fizjoterapia Koni`,
    siteUrl: `https://www.horsephysio.pl`,
    capitalizeTitleOnHome: false,
    logo: `/images/logo.png`,
    icon: `/images/icon.png`,
    titleImage: `/images/main1.jpeg`,
    ogImage: `/images/main1.jpeg`,
    twoColumnWall: true,
    cookiePolicy: true,
    introTag: `Dorota Chojecka | Certyfikowany Fizjoterapeuta Koni`,
    description: `Oferuję usługi z zakresu terapii manualnej, masażu, kinezyterapii, stretchingu, fizykoterapii i kinesiotapingu`,
    about:
        "Jestem certyfikowanym zoofizjoterapeutą koni. Moim zadaniem jest maksymalne usprawnienie zwierzęcia począwszy od wykonywania manualnych technik masażu i zabiegów fizykalnych poprzez dobór ćwiczeń fizjoterapeutycznych i rehabilitacyjnych dopasowanych do danego przypadku. Każde działanie poprzedzone jest badaniem pacjenta dla potrzeb terapii.",
    aboutMore:
        "Ukończyłam kierunkowy kurs w Studium Fizjoterapii Zwierząt - placówce zapewniającej wysoką jakość kształcenia pod okiem profesjonalistów takich jak: Justyna Kalbarczyk (Ori-Chveal),  dr n.wet. Paulina Zielińska (PokWet), dr n. wet Radomira Henklewskiego. Odbyłam również praktykę pod okiem Marty Kulikowskiej (Equi-Physiq). W najbliższej przyszłości planuję rozszerzać swoją wiedzę biorąc udział w organizowanych kursach.",
    author: `pianoDog studio`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    navLinks: [
        {
            name: "START",
            url: "/",
        },
        {
            name: "O HORSE PHYSIO",
            url: "/about",
        },
        {
            name: "BLOG",
            url: "/blog",
        },
        {
            name: "USŁUGI I CENNIK",
            url: "/oferta/uslugi-fizjoterapii-marzec/",
        },
        {
            name: "KONTAKT",
            url: "/contact",
        },
    ],
    footerLinks: [
        {
            name: "",
            url: "/",
        },
        // {
        //     name: "PRIVACY POLICY",
        //     url: "/privacy-policy",
        // },
        // {
        //     name: "GitHub",
        //     url: "https://github.com/akzhy/gatsby-starter-elemental",
        // },
    ],
    social: [
        {
            name: "Facebook",
            icon: "/images/Facebook.svg",
            url: "https://www.facebook.com/DorotaHorsePhysio/",
        },
        {
            name: "Instagram",
            icon: "/images/Instagram.svg",
            url: "https://www.instagram.com/horsephysio_/",
        },
    ],
    contact: {
        // leave empty ('') or false to hide form
        api_url: "",
        description: `Jeżeli szukają Państwo fizjoterapuety koni, serdecznie zapraszam do kontaktu bezpośrednio poprzez telefon lub adres email.`,
        mail: "dorota.horsephysio@gmail.com",
        phone: "695 492 704",
        address: "1234 \nLocation \nLocation",
    },
    disqus: "elemental-netlify-com",
}

const beforeContactFormSubmit = data => {
    // Code 0 - success
    // Code 1 - Name
    // Code 2 - Email
    // Code 3 - Message
    // Code 4 - Other
    const errors = []

    if (data.name.trim().length < 2) {
        errors.push({
            code: 1,
            message: "Imię",
        })
    }

    if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        errors.push({
            code: 2,
            message: "Adres Email",
        })
    }

    if (data.message.trim().length < 15) {
        errors.push({
            code: 3,
            message: "Wiadomość...",
        })
    }

    if (errors.length > 0)
        return {
            result: false,
            errors: errors,
        }

    return {
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
        result: true,
    }
}

const contactFormSubmit = async (api, data) => {
    let res: any = await fetch(api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    res = await res.json()

    if (res.success) {
        return {
            result: true,
        }
    }
    return {
        result: false,
        ...res,
    }
}

const defaults = {
    disqus: null,
    twoColumnWall: true,
    darkmode: false,
    switchTheme: true,
    capitalizeTitleOnHome: true,
    cookiePolicy: false,
}

Object.keys(defaults).forEach(item => {
    if (siteMetadata[item] === undefined) {
        siteMetadata[item] = defaults[item]
    }
})

export { siteMetadata, beforeContactFormSubmit, contactFormSubmit }
