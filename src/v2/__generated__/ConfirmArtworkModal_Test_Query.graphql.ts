/**
 * @generated SignedSource<<8ab2e554773ff9d1eb06989051f27b59>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConfirmArtworkModal_Test_Query$variables = {};
export type ConfirmArtworkModal_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ConfirmArtworkModal_artwork">;
  } | null;
};
export type ConfirmArtworkModal_Test_Query = {
  variables: ConfirmArtworkModal_Test_Query$variables;
  response: ConfirmArtworkModal_Test_Query$data;
};

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
],
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkInfoRow"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
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
    "type": "Query",
    "abstractKey": null
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
                    "type": "Money",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v6/*: any*/),
                    "type": "PriceRange",
                    "abstractKey": null
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
    "cacheID": "4eee81aeba0a29e602f93477efdbf4ea",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artistNames": (v7/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v8/*: any*/),
        "artwork.attributionClass.name": (v7/*: any*/),
        "artwork.category": (v7/*: any*/),
        "artwork.certificateOfAuthenticity": (v9/*: any*/),
        "artwork.certificateOfAuthenticity.details": (v7/*: any*/),
        "artwork.conditionDescription": (v9/*: any*/),
        "artwork.conditionDescription.details": (v7/*: any*/),
        "artwork.date": (v7/*: any*/),
        "artwork.dimensions": (v10/*: any*/),
        "artwork.dimensions.cm": (v7/*: any*/),
        "artwork.dimensions.in": (v7/*: any*/),
        "artwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "artwork.editionSets.dimensions": (v10/*: any*/),
        "artwork.editionSets.dimensions.cm": (v7/*: any*/),
        "artwork.editionSets.dimensions.in": (v7/*: any*/),
        "artwork.editionSets.editionOf": (v7/*: any*/),
        "artwork.editionSets.id": (v8/*: any*/),
        "artwork.editionSets.internalID": (v8/*: any*/),
        "artwork.editionSets.isOfferableFromInquiry": (v11/*: any*/),
        "artwork.editionSets.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "artwork.editionSets.listPrice.__typename": (v12/*: any*/),
        "artwork.editionSets.listPrice.display": (v7/*: any*/),
        "artwork.framed": (v9/*: any*/),
        "artwork.framed.details": (v7/*: any*/),
        "artwork.id": (v8/*: any*/),
        "artwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artwork.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artwork.image.resized.height": (v13/*: any*/),
        "artwork.image.resized.src": (v12/*: any*/),
        "artwork.image.resized.srcSet": (v12/*: any*/),
        "artwork.image.resized.width": (v13/*: any*/),
        "artwork.internalID": (v8/*: any*/),
        "artwork.isEdition": (v11/*: any*/),
        "artwork.manufacturer": (v7/*: any*/),
        "artwork.medium": (v7/*: any*/),
        "artwork.publisher": (v7/*: any*/),
        "artwork.saleMessage": (v7/*: any*/),
        "artwork.signatureInfo": (v9/*: any*/),
        "artwork.signatureInfo.details": (v7/*: any*/),
        "artwork.title": (v7/*: any*/)
      }
    },
    "name": "ConfirmArtworkModal_Test_Query",
    "operationKind": "query",
    "text": "query ConfirmArtworkModal_Test_Query {\n  artwork(id: \"xxx\") {\n    ...ConfirmArtworkModal_artwork\n    id\n  }\n}\n\nfragment CollapsibleArtworkDetails_artwork on Artwork {\n  image {\n    resized(width: 40, height: 40) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  internalID\n  title\n  date\n  saleMessage\n  attributionClass {\n    name\n    id\n  }\n  category\n  manufacturer\n  publisher\n  medium\n  conditionDescription {\n    details\n  }\n  certificateOfAuthenticity {\n    details\n  }\n  framed {\n    details\n  }\n  dimensions {\n    in\n    cm\n  }\n  signatureInfo {\n    details\n  }\n  artistNames\n}\n\nfragment ConfirmArtworkButton_artwork on Artwork {\n  internalID\n}\n\nfragment ConfirmArtworkModal_artwork on Artwork {\n  ...CollapsibleArtworkDetails_artwork\n  ...ConfirmArtworkButton_artwork\n  internalID\n  isEdition\n  editionSets {\n    internalID\n    ...EditionSelectBox_edition\n    id\n  }\n}\n\nfragment EditionSelectBox_edition on EditionSet {\n  internalID\n  editionOf\n  isOfferableFromInquiry\n  listPrice {\n    __typename\n    ... on Money {\n      display\n    }\n    ... on PriceRange {\n      display\n    }\n  }\n  dimensions {\n    cm\n    in\n  }\n}\n"
  }
};
})();

(node as any).hash = "0d6913a0659465188e153db0d07f871f";

export default node;
