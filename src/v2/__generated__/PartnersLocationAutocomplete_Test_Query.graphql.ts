/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnersLocationAutocomplete_Test_QueryVariables = {};
export type PartnersLocationAutocomplete_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"PartnersLocationAutocomplete_viewer">;
    } | null;
};
export type PartnersLocationAutocomplete_Test_Query = {
    readonly response: PartnersLocationAutocomplete_Test_QueryResponse;
    readonly variables: PartnersLocationAutocomplete_Test_QueryVariables;
};



/*
query PartnersLocationAutocomplete_Test_Query {
  viewer {
    ...PartnersLocationAutocomplete_viewer
  }
}

fragment PartnersLocationAutocomplete_viewer on Viewer {
  featuredCities: cities(featured: true) {
    text: name
    value: slug
    coordinates {
      lat
      lng
    }
  }
  allCities: cities {
    text: name
    value: slug
    coordinates {
      lat
      lng
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": "text",
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  {
    "alias": "value",
    "args": null,
    "kind": "ScalarField",
    "name": "slug",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "LatLng",
    "kind": "LinkedField",
    "name": "coordinates",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lat",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lng",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "City"
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "LatLng"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnersLocationAutocomplete_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PartnersLocationAutocomplete_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PartnersLocationAutocomplete_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "featuredCities",
            "args": [
              {
                "kind": "Literal",
                "name": "featured",
                "value": true
              }
            ],
            "concreteType": "City",
            "kind": "LinkedField",
            "name": "cities",
            "plural": true,
            "selections": (v0/*: any*/),
            "storageKey": "cities(featured:true)"
          },
          {
            "alias": "allCities",
            "args": null,
            "concreteType": "City",
            "kind": "LinkedField",
            "name": "cities",
            "plural": true,
            "selections": (v0/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a9e0fc7220fdb48cc8459a1fa95c9201",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.allCities": (v1/*: any*/),
        "viewer.allCities.coordinates": (v2/*: any*/),
        "viewer.allCities.coordinates.lat": (v3/*: any*/),
        "viewer.allCities.coordinates.lng": (v3/*: any*/),
        "viewer.allCities.text": (v4/*: any*/),
        "viewer.allCities.value": (v4/*: any*/),
        "viewer.featuredCities": (v1/*: any*/),
        "viewer.featuredCities.coordinates": (v2/*: any*/),
        "viewer.featuredCities.coordinates.lat": (v3/*: any*/),
        "viewer.featuredCities.coordinates.lng": (v3/*: any*/),
        "viewer.featuredCities.text": (v4/*: any*/),
        "viewer.featuredCities.value": (v4/*: any*/)
      }
    },
    "name": "PartnersLocationAutocomplete_Test_Query",
    "operationKind": "query",
    "text": "query PartnersLocationAutocomplete_Test_Query {\n  viewer {\n    ...PartnersLocationAutocomplete_viewer\n  }\n}\n\nfragment PartnersLocationAutocomplete_viewer on Viewer {\n  featuredCities: cities(featured: true) {\n    text: name\n    value: slug\n    coordinates {\n      lat\n      lng\n    }\n  }\n  allCities: cities {\n    text: name\n    value: slug\n    coordinates {\n      lat\n      lng\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f2551224817da86f5f03c296130b63f3';
export default node;
