export interface partnerType{
    name: string,
    logo: string
    type: string
}
export const partners:partnerType[] =[
    {
        name: 'Stockgro',
        logo: '/assets/partners/stockgro.svg',
        type: 'Title Sponsor'
    },
    {
        name: 'Rise In',
        logo: '/assets/partners/risein.svg',
        type: 'Education Partner'
    },
    {
        name: 'Postman',
        logo: '/assets/partners/postman.svg',
        type: 'Event Partner'
    },
    {
        name: 'NoobCode',
        logo: '/assets/partners/noobcode.svg',
        type: 'Community Partner'
    },

]