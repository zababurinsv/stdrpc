import * as Jsonld from 'jsonld';
import ConceptNet from "concept-net";
var conceptNet = ConceptNet( 'https://api.conceptnet.io', '10053', '5.3' );
let  jsonld = Jsonld['default']['promises']

// import {} from 'jsonld';
// import {JsonLdProcessor} from 'jsonld';
// import rdfParser from "rdf-parse";
export default (data) => {
    return new Promise(async (resolve,reject) => {
        // let expanded = await jsonld.expand(data);
        // let flatten = await jsonld.flatten(data);
        // console.log('aaaaaaaaaaaaa', data)
        // const canonized = await jsonld.canonize({
        //     id: ""
        // }, {
        //     algorithm: 'URDNA2015',
        //     format: 'application/n-quads'
        // });
        // const framed = await jsonld.frame(data, frame);
        console.log('---------------_>>>',conceptNet)
        resolve(data)
    })
}
