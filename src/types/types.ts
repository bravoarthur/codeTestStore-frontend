
type PriceType = {
    price: string    
}

type ImageType = {

    height: number,
    src: string,
    width: number,
    alt: 'string',
}


export type CategorieType = {
    id: string,
    image: ImageType,
    title: string
}

export type CategorieListType = CategorieType[]


export type ProductType = {
    id: number,
    image: ImageType,
    body_html: string,
    title: string,
    vendor: string,
    variants: PriceType[],
    status: string,
    product_type: string,
    images: ImageType[]
}

export type ProductListType = ProductType[]
