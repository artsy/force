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
    readonly moneyBackGuaranteeImage: {
        readonly " $fragmentRefs": FragmentRefs<"BuyerGuaranteeIndex_moneyBackGuaranteeImage">;
    } | null;
    readonly securePaymentImage: {
        readonly " $fragmentRefs": FragmentRefs<"BuyerGuaranteeIndex_securePaymentImage">;
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
  moneyBackGuaranteeImage: artwork(id: "5fce729a212bcf54e2551f21") {
    ...BuyerGuaranteeIndex_moneyBackGuaranteeImage
    id
  }
  securePaymentImage: artwork(id: "580fb7cd2a893a65c100086a") {
    ...BuyerGuaranteeIndex_securePaymentImage
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
}

fragment BuyerGuaranteeIndex_headerImage on Artwork {
  imageTitle
  imageUrl
  artist {
    name
    id
  }
}

fragment BuyerGuaranteeIndex_moneyBackGuaranteeImage on Artwork {
  imageTitle
  imageUrl
  artist {
    name
    id
  }
}

fragment BuyerGuaranteeIndex_securePaymentImage on Artwork {
  imageTitle
  imageUrl
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
v2 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "5fce729a212bcf54e2551f21"
  }
],
v3 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "580fb7cd2a893a65c100086a"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
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
      (v4/*: any*/)
    ],
    "storageKey": null
  },
  (v4/*: any*/)
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
        "storageKey": "artwork(id:\"5fce729a212bcf54e2551f21\")"
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
        "storageKey": "artwork(id:\"580fb7cd2a893a65c100086a\")"
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
        "selections": (v5/*: any*/),
        "storageKey": "artwork(id:\"5dd8084d257aaf000e4a0396\")"
      },
      {
        "alias": "authenticityImage",
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": "artwork(id:\"5fecdbfa19d5ae5bf95c1dd8\")"
      },
      {
        "alias": "moneyBackGuaranteeImage",
        "args": (v2/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": "artwork(id:\"5fce729a212bcf54e2551f21\")"
      },
      {
        "alias": "securePaymentImage",
        "args": (v3/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": "artwork(id:\"580fb7cd2a893a65c100086a\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "buyerGuaranteeRoutes_BuyerGuaranteeQuery",
    "operationKind": "query",
    "text": "query buyerGuaranteeRoutes_BuyerGuaranteeQuery {\n  headerImage: artwork(id: \"5dd8084d257aaf000e4a0396\") {\n    ...BuyerGuaranteeIndex_headerImage\n    id\n  }\n  authenticityImage: artwork(id: \"5fecdbfa19d5ae5bf95c1dd8\") {\n    ...BuyerGuaranteeIndex_authenticityImage\n    id\n  }\n  moneyBackGuaranteeImage: artwork(id: \"5fce729a212bcf54e2551f21\") {\n    ...BuyerGuaranteeIndex_moneyBackGuaranteeImage\n    id\n  }\n  securePaymentImage: artwork(id: \"580fb7cd2a893a65c100086a\") {\n    ...BuyerGuaranteeIndex_securePaymentImage\n    id\n  }\n}\n\nfragment BuyerGuaranteeIndex_authenticityImage on Artwork {\n  imageTitle\n  imageUrl\n  artist {\n    name\n    id\n  }\n}\n\nfragment BuyerGuaranteeIndex_headerImage on Artwork {\n  imageTitle\n  imageUrl\n  artist {\n    name\n    id\n  }\n}\n\nfragment BuyerGuaranteeIndex_moneyBackGuaranteeImage on Artwork {\n  imageTitle\n  imageUrl\n  artist {\n    name\n    id\n  }\n}\n\nfragment BuyerGuaranteeIndex_securePaymentImage on Artwork {\n  imageTitle\n  imageUrl\n  artist {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '75a4a2e0001cf58a99f503eb4f3f3f26';
export default node;
