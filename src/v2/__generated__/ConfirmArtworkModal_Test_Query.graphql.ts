/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConfirmArtworkModal_Test_QueryVariables = {};
export type ConfirmArtworkModal_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ConfirmArtworkModal_artwork">;
    } | null;
};
export type ConfirmArtworkModal_Test_Query = {
    readonly response: ConfirmArtworkModal_Test_QueryResponse;
    readonly variables: ConfirmArtworkModal_Test_QueryVariables;
};



/*
query ConfirmArtworkModal_Test_Query {
  artwork(id: "xxx") {
    ...ConfirmArtworkModal_artwork
    id
  }
}

fragment CollapsibleArtworkDetails_artwork on Artwork {
  image {
    resized(width: 40, height: 40) {
      src
      srcSet
      width
      height
    }
  }
  internalID
  title
  date
  saleMessage
  attributionClass {
    name
    id
  }
  category
  manufacturer
  publisher
  medium
  conditionDescription {
    details
  }
  certificateOfAuthenticity {
    details
  }
  framed {
    details
  }
  dimensions {
    in
    cm
  }
  signatureInfo {
    details
  }
  artistNames
}

fragment ConfirmArtworkButton_artwork on Artwork {
  internalID
}

fragment ConfirmArtworkModal_artwork on Artwork {
  ...CollapsibleArtworkDetails_artwork
  ...ConfirmArtworkButton_artwork
  internalID
  isEdition
  editionSets {
    internalID
    ...EditionSelectBox_edition
    id
  }
}

fragment EditionSelectBox_edition on EditionSet {
  internalID
  editionOf
  isOfferableFromInquiry
  listPrice {
    __typename
    ... on Money {
      display
    }
    ... on PriceRange {
      display
    }
  }
  dimensions {
    cm
    in
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "xxx"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
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
    "name": "details",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "in",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cm",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConfirmArtworkModal_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ConfirmArtworkModal_artwork"
          }
        ],
        "storageKey": "artwork(id:\"xxx\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConfirmArtworkModal_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
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
                    "name": "height",
                    "value": 40
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 40
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
                    "name": "src",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "srcSet",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "width",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "height",
                    "storageKey": null
                  }
                ],
                "storageKey": "resized(height:40,width:40)"
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "saleMessage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
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
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "manufacturer",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "publisher",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "medium",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "conditionDescription",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "certificateOfAuthenticity",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "framed",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "dimensions",
            "kind": "LinkedField",
            "name": "dimensions",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "signatureInfo",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artistNames",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isEdition",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EditionSet",
            "kind": "LinkedField",
            "name": "editionSets",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "editionOf",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isOfferableFromInquiry",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "listPrice",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v6/*: any*/),
                    "type": "Money"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v6/*: any*/),
                    "type": "PriceRange"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "dimensions",
                "kind": "LinkedField",
                "name": "dimensions",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"xxx\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ConfirmArtworkModal_Test_Query",
    "operationKind": "query",
    "text": "query ConfirmArtworkModal_Test_Query {\n  artwork(id: \"xxx\") {\n    ...ConfirmArtworkModal_artwork\n    id\n  }\n}\n\nfragment CollapsibleArtworkDetails_artwork on Artwork {\n  image {\n    resized(width: 40, height: 40) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  internalID\n  title\n  date\n  saleMessage\n  attributionClass {\n    name\n    id\n  }\n  category\n  manufacturer\n  publisher\n  medium\n  conditionDescription {\n    details\n  }\n  certificateOfAuthenticity {\n    details\n  }\n  framed {\n    details\n  }\n  dimensions {\n    in\n    cm\n  }\n  signatureInfo {\n    details\n  }\n  artistNames\n}\n\nfragment ConfirmArtworkButton_artwork on Artwork {\n  internalID\n}\n\nfragment ConfirmArtworkModal_artwork on Artwork {\n  ...CollapsibleArtworkDetails_artwork\n  ...ConfirmArtworkButton_artwork\n  internalID\n  isEdition\n  editionSets {\n    internalID\n    ...EditionSelectBox_edition\n    id\n  }\n}\n\nfragment EditionSelectBox_edition on EditionSet {\n  internalID\n  editionOf\n  isOfferableFromInquiry\n  listPrice {\n    __typename\n    ... on Money {\n      display\n    }\n    ... on PriceRange {\n      display\n    }\n  }\n  dimensions {\n    cm\n    in\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bc1851f6248cb757b142dc97ac93fdc9';
export default node;
