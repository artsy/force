/**
 * @generated SignedSource<<2a67cc48aba04b98fa8376c02f07fc9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsAdditionalInfo_Test_Query$variables = Record<PropertyKey, never>;
export type ArtworkDetailsAdditionalInfo_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsAdditionalInfo_artwork">;
  } | null | undefined;
};
export type ArtworkDetailsAdditionalInfo_Test_Query = {
  response: ArtworkDetailsAdditionalInfo_Test_Query$data;
  variables: ArtworkDetailsAdditionalInfo_Test_Query$variables;
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
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "label",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "details",
    "storageKey": null
  }
],
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "in",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "cm",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "framedDimensions",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "dimensions",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
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
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkInfoRow"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkDetailsAdditionalInfo_Test_Query",
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
            "name": "ArtworkDetailsAdditionalInfo_artwork"
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
    "name": "ArtworkDetailsAdditionalInfo_Test_Query",
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
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "series",
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
            "name": "manufacturer",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "imageRights",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "canRequestLotConditionsReport",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isUnlisted",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "framed",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EditionSet",
            "kind": "LinkedField",
            "name": "editionSets",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v5/*: any*/),
              (v4/*: any*/),
              (v6/*: any*/)
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
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "conditionDescription",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "certificateOfAuthenticity",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkMedium",
            "kind": "LinkedField",
            "name": "mediumType",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "longDescription",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "medium",
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": "artwork(id:\"xxx\")"
      }
    ]
  },
  "params": {
    "cacheID": "1db66650f4e2997b46e14e0f75f0a702",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v8/*: any*/),
        "artwork.attributionClass.name": (v9/*: any*/),
        "artwork.canRequestLotConditionsReport": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.category": (v9/*: any*/),
        "artwork.certificateOfAuthenticity": (v10/*: any*/),
        "artwork.certificateOfAuthenticity.details": (v9/*: any*/),
        "artwork.certificateOfAuthenticity.label": (v9/*: any*/),
        "artwork.conditionDescription": (v10/*: any*/),
        "artwork.conditionDescription.details": (v9/*: any*/),
        "artwork.conditionDescription.label": (v9/*: any*/),
        "artwork.dimensions": (v11/*: any*/),
        "artwork.dimensions.cm": (v9/*: any*/),
        "artwork.dimensions.in": (v9/*: any*/),
        "artwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "artwork.editionSets.dimensions": (v11/*: any*/),
        "artwork.editionSets.dimensions.cm": (v9/*: any*/),
        "artwork.editionSets.dimensions.in": (v9/*: any*/),
        "artwork.editionSets.framedDimensions": (v11/*: any*/),
        "artwork.editionSets.framedDimensions.cm": (v9/*: any*/),
        "artwork.editionSets.framedDimensions.in": (v9/*: any*/),
        "artwork.editionSets.id": (v8/*: any*/),
        "artwork.editionSets.internalID": (v8/*: any*/),
        "artwork.framed": (v10/*: any*/),
        "artwork.framed.details": (v9/*: any*/),
        "artwork.framed.label": (v9/*: any*/),
        "artwork.framedDimensions": (v11/*: any*/),
        "artwork.framedDimensions.cm": (v9/*: any*/),
        "artwork.framedDimensions.in": (v9/*: any*/),
        "artwork.id": (v8/*: any*/),
        "artwork.imageRights": (v9/*: any*/),
        "artwork.internalID": (v8/*: any*/),
        "artwork.isUnlisted": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.manufacturer": (v9/*: any*/),
        "artwork.medium": (v9/*: any*/),
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.__typename": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "artwork.mediumType.longDescription": (v9/*: any*/),
        "artwork.mediumType.name": (v9/*: any*/),
        "artwork.publisher": (v9/*: any*/),
        "artwork.series": (v9/*: any*/),
        "artwork.signatureInfo": (v10/*: any*/),
        "artwork.signatureInfo.details": (v9/*: any*/),
        "artwork.signatureInfo.label": (v9/*: any*/)
      }
    },
    "name": "ArtworkDetailsAdditionalInfo_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkDetailsAdditionalInfo_Test_Query {\n  artwork(id: \"xxx\") {\n    ...ArtworkDetailsAdditionalInfo_artwork\n    id\n  }\n}\n\nfragment ArtworkDetailsAdditionalInfo_artwork on Artwork {\n  category\n  series\n  publisher\n  manufacturer\n  imageRights\n  canRequestLotConditionsReport\n  internalID\n  isUnlisted\n  framed {\n    label\n    details\n  }\n  framedDimensions {\n    in\n    cm\n  }\n  editionSets {\n    internalID\n    dimensions {\n      in\n      cm\n    }\n    framedDimensions {\n      in\n      cm\n    }\n    id\n  }\n  signatureInfo {\n    label\n    details\n  }\n  conditionDescription {\n    label\n    details\n  }\n  certificateOfAuthenticity {\n    label\n    details\n  }\n  mediumType {\n    __typename\n  }\n  dimensions {\n    in\n    cm\n  }\n  attributionClass {\n    name\n    id\n  }\n  medium\n  ...ArtworkDetailsMediumModal_artwork\n}\n\nfragment ArtworkDetailsMediumModal_artwork on Artwork {\n  mediumType {\n    name\n    longDescription\n  }\n}\n"
  }
};
})();

(node as any).hash = "e0f7252c95c40eaddf28cc6d72e341aa";

export default node;
