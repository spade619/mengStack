// const itemsArray = [
//     {
//       "productName": "milo",
//       "quantity": 30,
//       "brandID": "1",
//       "id": "1"
//     },
//     {
//         "productName": "Lucky-me Pancit-Canton",
//         "quantity": 23,
//         "brandID": "3",
//         "id": "2"
//     },
//     {
//         "productName": "Piattos",
//         "quantity": 27,
//         "brandID": "2",
//         "id": "3"
//     },
//     {
//         "productName": "Nescafe",
//         "quantity": 14,
//         "brandID": "1",
//         "id": "4"
//     },
//     {
//         "productName": "Bear-Brand",
//         "quantity": 21,
//         "brandID": "1",
//         "id": "5"
//     },
//     {
//         "productName": "Chippy",
//         "quantity": 33,
//         "brandID": "2",
//         "id": "6"
//     },
//     {
//         "productName": "Lucky-me Noodles",
//         "quantity": 33,
//         "brandID": "3",
//         "id": "6"
//     },
//   ];


//   const brandArray = [
//     {
//       "brandName": "nestle",
//       "merchandiser": "ramon endrina",
//       "id": "1"
//     },
//     {
//         "brandName": "jack n jill",
//         "merchandiser": "sandro cayabyan",
//         "id": "2"
//     },
//     {
//         "brandName": "lucky me",
//         "merchandiser": "dodong balaquit",
//         "id": "3"
//     },
    
 
//   ];

// -----------------------------------------------------------------------------

// import mongoose models

const Items = require('../models/Items')
const Brands = require('../models/Brand')

  const {GraphQLObjectType, 
         GraphQLID, 
         GraphQLString, 
         GraphQLInt, 
         GraphQLSchema,
         GraphQLList} = require('graphql')

         //product items type
  const ProductType = new GraphQLObjectType({
    name:'Product',
    fields: () => ({
        id: {type: GraphQLID},
        productName: {type: GraphQLString},
        brandID: {
            type: BrandType,
            resolve(parent, args){
                // return brandArray.find((brand) => brand.id === parent.brandID)
                return Items.findById(parent.brandID)
            }
        },
        quantity: {type: GraphQLInt},
    }) 
 })

        //brand or vendor type
 const BrandType = new GraphQLObjectType({
    name:'Brand',
    fields: () => ({
        id: {type: GraphQLID},
        brandName: {type: GraphQLString},
        merchandiser: {type: GraphQLString},
    }) 
 })

//  ----------------query--------------------
 const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // product item query
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                // return itemsArray
                return Items.find()
            },
        },
        product: {
            type: ProductType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                // return itemsArray.find(product => product.id === args.id)
                return Items.findById(args.id)
            }
        },
        // brand vendor query

        brands: {
            type: new GraphQLList(BrandType),
            resolve(parent, args) {
                // return brandArray
                return Brands.find()
            },
        },
        brand: {
            type: BrandType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                // return brandArray.find(brand => brand.id === args.id)
                return Brands.findById(args.id)
            }
        }
    }
 })

 module.exports = new GraphQLSchema ({
    query: RootQuery
 })