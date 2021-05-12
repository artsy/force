/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuyerGuaranteeIndexNonAdmin_Test_QueryVariables = {};
export type BuyerGuaranteeIndexNonAdmin_Test_QueryResponse = {
    readonly headerImage: {
        readonly " $fragmentRefs": FragmentRefs<"BuyerGuaranteeIndex_headerImage">;
    } | null;
    readonly authenticityImage: {
        readonly " $fragmentRefs": FragmentRefs<"BuyerGuaranteeIndex_authenticityImage">;
    } | null;
    readonly moneyBackGuaranteeImage: {
        readonly " $fragmentRefs": FragmentRefs<"BuyerGuaranteeIndex_moneyBackGuaranteeImage">;
    } | null;
    readonly securePaymentImage: {
        readonly " $fragmentRefs": FragmentRefs<"BuyerGuaranteeIndex_securePaymentImage">;
    } | null;
};
export type BuyerGuaranteeIndexNonAdmin_Test_Query = {
    readonly response: BuyerGuaranteeIndexNonAdmin_Test_QueryResponse;
    readonly variables: BuyerGuaranteeIndexNonAdmin_Test_QueryVariables;
};



/*
query BuyerGuaranteeIndexNonAdmin_Test_Query {
  headerImage: artwork(id: "any-id1") {
    ...BuyerGuaranteeIndex_headerImage
    id
  }
  authenticityImage: artwork(id: "any-id2") {
    ...BuyerGuaranteeIndex_authenticityImage
    id
  }
  moneyBackGuaranteeImage: artwork(id: "any-id3") {
    ...BuyerGuaranteeIndex_moneyBackGuaranteeImage
    id
  }
  securePaymentImage: artwork(id: "any-id4") {
    ...BuyerGuaranteeIndex_securePaymentImage
    id
  }
}

fragment BuyerGuaranteeIndex_authenticityImage on Artwork {
  imageTitle
  imageUrl
  image {
    resized(version: "large_rectangle") {
      srcSet
    }
  }
  artist {
    name
    id
  }
}

fragment BuyerGuaranteeIndex_headerImage on Artwork {
  imageTitle
  imageUrl
  image {
    resized(version: "normalized") {
      srcSet
    }
  }
  artist {
    name
    id
  }
}

fragment BuyerGuaranteeIndex_moneyBackGuaranteeImage on Artwork {
  imageTitle
  imageUrl
  image {
    resized(version: "large_rectangle") {
      srcSet
    }
  }
  artist {
    name
    id
  }
}

fragment BuyerGuaranteeIndex_securePaymentImage on Artwork {
  imageTitle
  imageUrl
  image {
    resized(version: "large_rectangle") {
      srcSet
    }
  }
  artist {
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "any-id1"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "any-id2"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "any-id3"
  }
],
v3 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "any-id4"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageTitle",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrl",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
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
    (v7/*: any*/)
  ],
  "storageKey": null
},
v9 = [
  (v4/*: any*/),
  (v5/*: any*/),
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
            "value": "large_rectangle"
          }
        ],
        "concreteType": "ResizedImageUrl",
        "kind": "LinkedField",
        "name": "resized",
        "plural": false,
        "selections": (v6/*: any*/),
        "storageKey": "resized(version:\"large_rectangle\")"
      }
    ],
    "storageKey": null
  },
  (v8/*: any*/),
  (v7/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BuyerGuaranteeIndexNonAdmin_Test_Query",
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
        "storageKey": "artwork(id:\"any-id1\")"
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
        "storageKey": "artwork(id:\"any-id2\")"
      },
      {
        "alias": "moneyBackGuaranteeImage",
        "args": (v2/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuyerGuaranteeIndex_moneyBackGuaranteeImage"
          }
        ],
        "storageKey": "artwork(id:\"any-id3\")"
      },
      {
        "alias": "securePaymentImage",
        "args": (v3/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuyerGuaranteeIndex_securePaymentImage"
          }
        ],
        "storageKey": "artwork(id:\"any-id4\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BuyerGuaranteeIndexNonAdmin_Test_Query",
    "selections": [
      {
        "alias": "headerImage",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
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
                    "value": "normalized"
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v6/*: any*/),
                "storageKey": "resized(version:\"normalized\")"
              }
            ],
            "storageKey": null
          },
          (v8/*: any*/),
          (v7/*: any*/)
        ],
        "storageKey": "artwork(id:\"any-id1\")"
      },
      {
        "alias": "authenticityImage",
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": (v9/*: any*/),
        "storageKey": "artwork(id:\"any-id2\")"
      },
      {
        "alias": "moneyBackGuaranteeImage",
        "args": (v2/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": (v9/*: any*/),
        "storageKey": "artwork(id:\"any-id3\")"
      },
      {
        "alias": "securePaymentImage",
        "args": (v3/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": (v9/*: any*/),
        "storageKey": "artwork(id:\"any-id4\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "BuyerGuaranteeIndexNonAdmin_Test_Query",
    "operationKind": "query",
    "text": "query BuyerGuaranteeIndexNonAdmin_Test_Query {\n  headerImage: artwork(id: \"any-id1\") {\n    ...BuyerGuaranteeIndex_headerImage\n    id\n  }\n  authenticityImage: artwork(id: \"any-id2\") {\n    ...BuyerGuaranteeIndex_authenticityImage\n    id\n  }\n  moneyBackGuaranteeImage: artwork(id: \"any-id3\") {\n    ...BuyerGuaranteeIndex_moneyBackGuaranteeImage\n    id\n  }\n  securePaymentImage: artwork(id: \"any-id4\") {\n    ...BuyerGuaranteeIndex_securePaymentImage\n    id\n  }\n}\n\nfragment BuyerGuaranteeIndex_authenticityImage on Artwork {\n  imageTitle\n  imageUrl\n  image {\n    resized(version: \"large_rectangle\") {\n      srcSet\n    }\n  }\n  artist {\n    name\n    id\n  }\n}\n\nfragment BuyerGuaranteeIndex_headerImage on Artwork {\n  imageTitle\n  imageUrl\n  image {\n    resized(version: \"normalized\") {\n      srcSet\n    }\n  }\n  artist {\n    name\n    id\n  }\n}\n\nfragment BuyerGuaranteeIndex_moneyBackGuaranteeImage on Artwork {\n  imageTitle\n  imageUrl\n  image {\n    resized(version: \"large_rectangle\") {\n      srcSet\n    }\n  }\n  artist {\n    name\n    id\n  }\n}\n\nfragment BuyerGuaranteeIndex_securePaymentImage on Artwork {\n  imageTitle\n  imageUrl\n  image {\n    resized(version: \"large_rectangle\") {\n      srcSet\n    }\n  }\n  artist {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '80f24c207420fba466e42d68ce994072';
export default node;
