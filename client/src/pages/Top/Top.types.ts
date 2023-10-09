type TopProps = {
    userData: userData | undefined;
    children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);

}

type userData = {
    country: string,
    display_name: string,
    email: string,
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: {
        spotify: string
    },
    followers: {
        href: string,
        total: number
    },
    href: string,
    id: string,
    images: [
        {
            url: string,
            height: number,
            width: number
        }
    ],
    product: string,
    type: string,
    uri: string
}

export default TopProps;