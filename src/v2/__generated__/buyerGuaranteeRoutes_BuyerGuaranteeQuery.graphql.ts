/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type buyerGuaranteeRoutes_BuyerGuaranteeQueryVariables = {};
export type buyerGuaranteeRoutes_BuyerGuaranteeQueryResponse = {
    readonly headerImage: {
        readonly " $fragmentRefs": FragmentRefs<"BuyerGuaranteeIndex_headerImage">;
    } | null;
    readonly authenticityImage: {
        readonly " $fragmentRefs": FragmentRefs<"BuyerGuaranteeIndex_authenticityImage">;
    } | null;
};
export type buyerGuaranteeRoutes_BuyerGuaranteeQuery = {
    readonly response: buyerGuaranteeRoutes_BuyerGuaranteeQueryResponse;
    readonly variables: buyerGuaranteeRoutes_BuyerGuaranteeQueryVariables;
};



/*
query buyerGuaranteeRoutes_BuyerGuaranteeQuery {
  headerImage: artwork(id: "5dd8084d257aaf000e4a0396") {
    ...BuyerGuaranteeIndex_headerImage
    id
  }
  authenticityImage: artwork(id: "5fecdbfa19d5ae5bf95c1dd8") {
    ...BuyerGuaranteeIndex_authenticityImage
    id
  }
}

fragment BuyerGuaranteeIndex_authenticityImage on Artwork {
  imageTitle
  imageUrl
  artist {
    name
    id
  }
  image {
    resized(version: "larger") {
      url
    }
  }
}

fragment BuyerGuaranteeIndex_headerImage on Artwork {
  imageTitle
  imageUrl
  artist {
    name
    id
  }
  image {
    resized(version: "larger") {
      url
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "5dd8084d257aaf000e4a0396"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "5fecdbfa19d5ae5bf95c1dd8"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "imageTitle",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "imageUrl",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Artist",
    "kind": "LinkedField",
    "name": "artist",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      (v2/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Image",
    "kind": "LinkedField",
    "name": "image",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "version",
            "value": "larger"
          }
        ],
        "concreteType": "ResizedImageUrl",
        "kind": "LinkedField",
        "name": "resized",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "url",
            "storageKey": null
          }
        ],
        "storageKey": "resized(version:\"larger\")"
      }
    ],
    "storageKey": null
  },
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "buyerGuaranteeRoutes_BuyerGuaranteeQuery",
    "selections": [
      {
        "alias": "headerImage",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuyerGuaranteeIndex_headerImage"
          }
        ],
        "storageKey": "artwork(id:\"5dd8084d257aaf000e4a0396\")"
      },
      {
        "alias": "authenticityImage",
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuyerGuaranteeIndex_authenticityImage"
          }
        ],
        "storageKey": "artwork(id:\"5fecdbfa19d5ae5bf95c1dd8\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "buyerGuaranteeRoutes_BuyerGuaranteeQuery",
    "selections": [
      {
        "alias": "headerImage",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": "artwork(id:\"5dd8084d257aaf000e4a0396\")"
      },
      {
        "alias": "authenticityImage",
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": "artwork(id:\"5fecdbfa19d5ae5bf95c1dd8\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "buyerGuaranteeRoutes_BuyerGuaranteeQuery",
    "operationKind": "query",
    "text": "query buyerGuaranteeRoutes_BuyerGuaranteeQuery {\n  headerImage: artwork(id: \"5dd8084d257aaf000e4a0396\") {\n    ...BuyerGuaranteeIndex_headerImage\n    id\n  }\n  authenticityImage: artwork(id: \"5fecdbfa19d5ae5bf95c1dd8\") {\n    ...BuyerGuaranteeIndex_authenticityImage\n    id\n  }\n}\n\nfragment BuyerGuaranteeIndex_authenticityImage on Artwork {\n  imageTitle\n  imageUrl\n  artist {\n    name\n    id\n  }\n  image {\n    resized(version: \"larger\") {\n      url\n    }\n  }\n}\n\nfragment BuyerGuaranteeIndex_headerImage on Artwork {\n  imageTitle\n  imageUrl\n  artist {\n    name\n    id\n  }\n  image {\n    resized(version: \"larger\") {\n      url\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c5e4cbe9d10cf0bb089ae17752934887';
export default node;
